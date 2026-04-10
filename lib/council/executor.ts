import {
  addCouncilTurn,
  logAgentActivity,
  listCouncilAgents,
  groupByDebateRole,
  listCouncilSessions,
  listAgents,
  getWorkflowRoster,
} from '@/lib/supabase/atlas'
import { listFeedbackByAgent } from '@/lib/supabase/atlas'
import { searchSimilarReasoning } from '@/lib/supabase/atlas'
import { listPillars, getQueuedProposals } from '@/lib/supabase/atlas'
import { callAgent } from './claude'
import { embed } from './openai'
import {
  buildStrategistPrompt,
  buildAidenPrompt,
  buildDevilsAdvocatePrompt,
  buildEditorPrompt,
} from './prompts'
import type { AgentRow, CouncilTurnRow, WorkflowStepRow } from '@/lib/supabase/types'
import fs from 'node:fs'
import path from 'node:path'

// --- Shared Context ---

export interface SessionContext {
  brandDoc: string
  pastTopics: string[]
  pillarDistribution: Array<{ pillar: string; count: number }>
  queuedProposals: Array<{ topic: string; pillar: string | null }>
  agentWeights: Array<{ name: string; weight: number }>
  seededTopics?: string[]
}

export async function loadSessionContext(options: { seededTopics?: string[] }): Promise<SessionContext> {
  const brandDoc = fs.readFileSync(path.resolve(process.cwd(), 'docs', 'brand.md'), 'utf-8')

  const [pastSessions, pillars, allAgents, queued] = await Promise.all([
    listCouncilSessions({ status: 'complete', session_type: 'topic_selection', limit: 20 }),
    listPillars(),
    listAgents({ active: true }),
    getQueuedProposals(),
  ])

  const pastTopics = pastSessions.filter((s) => s.topic).map((s) => s.topic!)
  const pillarMap = new Map(pillars.map((p) => [p.id, p.name]))
  const pillarDistribution = pillars.map((p) => ({
    pillar: p.name,
    count: pastSessions.filter((s) => s.pillar_id === p.id).length,
  }))
  const queuedProposals = queued.map((p) => ({
    topic: p.topic,
    pillar: p.pillar_id ? pillarMap.get(p.pillar_id) ?? null : null,
  }))
  const agentWeights = allAgents
    .filter((a) => a.debate_role != null)
    .map((a) => ({ name: a.name, weight: a.influence_weight }))

  return {
    brandDoc,
    pastTopics,
    pillarDistribution,
    queuedProposals,
    agentWeights,
    seededTopics: options.seededTopics,
  }
}

// --- Agent Helpers ---

async function getRecentFeedback(agentId: string) {
  try {
    const fb = await listFeedbackByAgent(agentId, 5)
    return fb.map((f) => ({ rating: f.rating, notes: f.notes }))
  } catch { return [] }
}

async function getVectorContext(agent: AgentRow, queryText: string) {
  try {
    const queryEmbedding = await embed(queryText)
    return await searchSimilarReasoning(agent.id, queryEmbedding, 5)
  } catch { return [] }
}

function buildPromptForStep(
  agent: AgentRow,
  step: WorkflowStepRow,
  ctx: SessionContext,
  feedback: Array<{ rating: number; notes: string | null }>,
  vectorCtx: Array<{ content: string; topic: string | null; similarity: number }>,
): string {
  switch (agent.debate_role) {
    case 'framer':
      return buildStrategistPrompt(
        agent, ctx.pastTopics, step.include_brand ? ctx.brandDoc : '',
        feedback,
        step.include_pillars ? ctx.pillarDistribution : undefined,
        step.include_pillars ? ctx.queuedProposals : undefined,
      )
    case 'proposer':
      return buildAidenPrompt(agent, step.include_vector ? vectorCtx : [], feedback)
    case 'challenger':
      return buildDevilsAdvocatePrompt(agent, feedback)
    case 'decider':
      return buildEditorPrompt(
        agent, step.include_brand ? ctx.brandDoc : '',
        step.include_weights ? ctx.agentWeights : undefined,
        feedback,
      )
    default:
      return agent.system_prompt
  }
}

// --- Message Templates by Action Type ---

function buildUserMessage(
  step: WorkflowStepRow,
  allTurns: CouncilTurnRow[],
  currentRoundTurns: CouncilTurnRow[],
  agent: AgentRow,
  ctx: SessionContext,
): string {
  const fullTranscript = formatTranscript(allTurns)
  const roundTranscript = formatTranscript(currentRoundTurns)
  const seededSection = ctx.seededTopics?.length
    ? `\n\nHuman-seeded candidates:\n${ctx.seededTopics.map((t) => `- ${t}`).join('\n')}`
    : ''
  const hint = step.prompt_hint ? `\n\n${step.prompt_hint}` : ''

  switch (step.action_type) {
    case 'frame':
      return `It's time for a new topic selection session. Analyze our content landscape and suggest directions.${seededSection}${hint}`

    case 'propose': {
      // Show framer turns + any prior proposer turns
      const framerTurns = allTurns.filter((t) => {
        const a = agents.get(t.agent_id ?? '')
        return a?.debate_role === 'framer'
      })
      const priorProposals = allTurns.filter((t) => {
        const a = agents.get(t.agent_id ?? '')
        return a?.debate_role === 'proposer' && t.agent_id !== agent.id
      })
      const framerText = formatTranscript(framerTurns)
      const priorText = priorProposals.length > 0
        ? `\n\nOther proposals so far:\n\n${formatTranscript(priorProposals)}`
        : ''
      return `The framers have set the landscape:\n\n${framerText}${priorText}${seededSection}${hint}\n\nNow propose your topic.`
    }

    case 'challenge':
      return `Challenge these proposals:\n\n${fullTranscript}${hint}`

    case 'defend': {
      const challengerTurns = allTurns.filter((t) => {
        const a = agents.get(t.agent_id ?? '')
        return a?.debate_role === 'challenger'
      })
      const challengeText = formatTranscript(challengerTurns)
      return `The challengers raised these concerns:\n\n${challengeText}${hint}\n\nDefend or adjust your position.`
    }

    case 'synthesize':
      return `The debate so far:\n\n${roundTranscript.length > 0 ? roundTranscript : fullTranscript}${hint}\n\nAs ${agent.name}, weigh in on which direction best serves our brand and audience.`

    case 'decide':
      return `Here is the full debate transcript from the topic selection session. Make your final decision.\n\n${fullTranscript}${hint}`

    default:
      return `${fullTranscript}${hint}`
  }
}

function formatTranscript(turns: CouncilTurnRow[]): string {
  return turns
    .map((t) => `**${t.agent_name}** (Turn ${t.turn_order}):\n${t.content}`)
    .join('\n\n---\n\n')
}

// Module-level agent map for message building (populated during execution)
let agents = new Map<string, AgentRow>()

// --- Main Executor ---

export interface ExecuteWorkflowResult {
  turns: CouncilTurnRow[]
  finalTurnContent: string
}

export async function executeWorkflow(
  sessionId: string,
  workflowId: string,
  steps: WorkflowStepRow[],
  ctx: SessionContext,
): Promise<ExecuteWorkflowResult> {
  // Load council agents, filtered by roster if one exists
  let councilAgents = await listCouncilAgents()
  const roster = await getWorkflowRoster(workflowId)
  if (roster.length > 0) {
    councilAgents = councilAgents.filter((a) => roster.includes(a.id))
    console.log(`  Roster: ${councilAgents.map((a) => a.name).join(', ')} (${councilAgents.length} of ${roster.length})`)
  }
  const grouped = groupByDebateRole(councilAgents)
  agents = new Map(councilAgents.map((a) => [a.id, a]))

  let turnOrder = 0
  const allTurns: CouncilTurnRow[] = []

  // Group steps by round
  const rounds = new Map<number, WorkflowStepRow[]>()
  for (const step of steps) {
    if (!rounds.has(step.round_number)) rounds.set(step.round_number, [])
    rounds.get(step.round_number)!.push(step)
  }

  const sortedRounds = [...rounds.entries()].sort(([a], [b]) => a - b)

  for (const [roundNum, roundSteps] of sortedRounds) {
    const roundLabel = roundSteps[0].round_label
    console.log(`\n── Round ${roundNum}: ${roundLabel} ──`)

    const roundStartTurnIndex = allTurns.length

    for (const step of roundSteps) {
      const roleAgents = grouped[step.debate_role] ?? []
      if (roleAgents.length === 0) {
        console.log(`  Skipping step (no agents with role '${step.debate_role}')`)
        continue
      }

      for (const agent of roleAgents) {
        // Load context for this agent
        const [feedback, vectorCtx] = await Promise.all([
          getRecentFeedback(agent.id),
          step.include_vector
            ? getVectorContext(agent, allTurns.length > 0 ? allTurns[allTurns.length - 1].content : 'dividend investing')
            : Promise.resolve([]),
        ])

        const systemPrompt = buildPromptForStep(agent, step, ctx, feedback, vectorCtx)
        const currentRoundTurns = allTurns.slice(roundStartTurnIndex)
        const userMessage = buildUserMessage(step, allTurns, currentRoundTurns, agent, ctx)

        // Log + execute + save turn
        await logAgentActivity({
          agent_name: agent.name,
          activity_type: 'info',
          message: `${agent.name} is deliberating (${step.action_type})...`,
          metadata: { council_session_id: sessionId },
        })

        const response = await callAgent(systemPrompt, userMessage)

        const turn = await addCouncilTurn({
          session_id: sessionId,
          agent_id: agent.id,
          agent_name: agent.name,
          content: response,
          turn_order: ++turnOrder,
        })

        const preview = response.slice(0, 120).replace(/\n/g, ' ')
        await logAgentActivity({
          agent_name: agent.name,
          activity_type: 'writing',
          message: `${agent.name}: ${preview}...`,
          metadata: { council_session_id: sessionId, turn_order: turnOrder },
        })

        allTurns.push({ ...turn, content: response })
        console.log(`  ${agent.name} done (turn ${turnOrder}, ${step.action_type})`)
      }
    }
  }

  return {
    turns: allTurns,
    finalTurnContent: allTurns.length > 0 ? allTurns[allTurns.length - 1].content : '',
  }
}
