import fs from 'node:fs'
import path from 'node:path'
import { getAgentByName, listAgents } from '@/lib/supabase/atlas'
import { listCouncilSessions } from '@/lib/supabase/atlas'
import { searchSimilarReasoning } from '@/lib/supabase/atlas'
import { listFeedbackByAgent } from '@/lib/supabase/atlas'
import { embed } from './openai'
import {
  buildStrategistPrompt,
  buildAidenPrompt,
  buildLexaPrompt,
  buildDevilsAdvocatePrompt,
  buildEditorPrompt,
} from './prompts'
import type { AgentRow, AgentFeedbackRow, CouncilTurnRow } from '@/lib/supabase/types'

export interface AgentContext {
  agentName: string
  agentId: string
  systemPrompt: string
  userMessage: string
}

function loadBrandDoc(): string {
  const brandPath = path.resolve(process.cwd(), 'docs', 'brand.md')
  return fs.readFileSync(brandPath, 'utf-8')
}

function formatTranscript(turns: CouncilTurnRow[]): string {
  return turns
    .map((t) => `**${t.agent_name}** (Turn ${t.turn_order}):\n${t.content}`)
    .join('\n\n---\n\n')
}

async function getVectorContext(
  agent: AgentRow,
  queryText: string,
): Promise<Array<{ content: string; topic: string | null; similarity: number }>> {
  try {
    const queryEmbedding = await embed(queryText)
    return await searchSimilarReasoning(agent.id, queryEmbedding, 5)
  } catch {
    // Cold start — no embeddings yet, or embedding API issue
    return []
  }
}

async function getRecentFeedback(
  agentId: string,
): Promise<Array<{ rating: number; notes: string | null }>> {
  try {
    const feedback = await listFeedbackByAgent(agentId, 5)
    return feedback.map((f) => ({ rating: f.rating, notes: f.notes }))
  } catch {
    return []
  }
}

export async function assembleRound1Context(options: {
  seededTopics?: string[]
}): Promise<{
  strategist: AgentContext
  aiden: AgentContext
  lexa: AgentContext
}> {
  const [strategistAgent, aidenAgent, lexaAgent] = await Promise.all([
    getAgentByName('Strategist'),
    getAgentByName('Aiden'),
    getAgentByName('Lexa'),
  ])

  if (!strategistAgent || !aidenAgent || !lexaAgent) {
    throw new Error('Missing council agents. Run the seed script first.')
  }

  // Strategist context: past topics + brand doc
  const pastSessions = await listCouncilSessions({
    status: 'complete',
    session_type: 'topic_selection',
    limit: 20,
  })
  const pastTopics = pastSessions
    .filter((s) => s.topic)
    .map((s) => s.topic!)
  const brandDoc = loadBrandDoc()

  // Aiden/Lexa context: vector search for past reasoning + feedback
  const [aidenVector, lexaVector, strategistFb, aidenFb, lexaFb] = await Promise.all([
    getVectorContext(aidenAgent, 'dividend investing topic proposal safety income'),
    getVectorContext(lexaAgent, 'dividend investing topic proposal growth accumulation'),
    getRecentFeedback(strategistAgent.id),
    getRecentFeedback(aidenAgent.id),
    getRecentFeedback(lexaAgent.id),
  ])

  const seededSection = options.seededTopics?.length
    ? `\n\nThe human has seeded these candidate topics for consideration:\n${options.seededTopics.map((t) => `- ${t}`).join('\n')}`
    : ''

  return {
    strategist: {
      agentName: 'Strategist',
      agentId: strategistAgent.id,
      systemPrompt: buildStrategistPrompt(strategistAgent, pastTopics, brandDoc, strategistFb),
      userMessage: `It's time for a new topic selection session. Analyze our content landscape and suggest directions for the team.${seededSection}`,
    },
    aiden: {
      agentName: 'Aiden',
      agentId: aidenAgent.id,
      systemPrompt: buildAidenPrompt(aidenAgent, aidenVector, aidenFb),
      userMessage: '', // filled after Strategist responds
    },
    lexa: {
      agentName: 'Lexa',
      agentId: lexaAgent.id,
      systemPrompt: buildLexaPrompt(lexaAgent, lexaVector, lexaFb),
      userMessage: '', // filled after Strategist responds
    },
  }
}

export async function assembleRound2Context(
  round1Turns: CouncilTurnRow[],
): Promise<{
  devilsAdvocate: AgentContext
  aiden: AgentContext
  lexa: AgentContext
  strategist: AgentContext
}> {
  const [daAgent, aidenAgent, lexaAgent, strategistAgent] = await Promise.all([
    getAgentByName('Devils Advocate'),
    getAgentByName('Aiden'),
    getAgentByName('Lexa'),
    getAgentByName('Strategist'),
  ])

  if (!daAgent || !aidenAgent || !lexaAgent || !strategistAgent) {
    throw new Error('Missing council agents.')
  }

  const transcript = formatTranscript(round1Turns)
  const [aidenVector, lexaVector, daFb, aidenFb, lexaFb, stratFb] = await Promise.all([
    getVectorContext(aidenAgent, round1Turns.find((t) => t.agent_name === 'Aiden')?.content ?? ''),
    getVectorContext(lexaAgent, round1Turns.find((t) => t.agent_name === 'Lexa')?.content ?? ''),
    getRecentFeedback(daAgent.id),
    getRecentFeedback(aidenAgent.id),
    getRecentFeedback(lexaAgent.id),
    getRecentFeedback(strategistAgent.id),
  ])

  return {
    devilsAdvocate: {
      agentName: 'Devils Advocate',
      agentId: daAgent.id,
      systemPrompt: buildDevilsAdvocatePrompt(daAgent, daFb),
      userMessage: `Here is Round 1 of the topic selection debate. Challenge these proposals:\n\n${transcript}`,
    },
    aiden: {
      agentName: 'Aiden',
      agentId: aidenAgent.id,
      systemPrompt: buildAidenPrompt(aidenAgent, aidenVector, aidenFb),
      userMessage: '', // filled after DA responds
    },
    lexa: {
      agentName: 'Lexa',
      agentId: lexaAgent.id,
      systemPrompt: buildLexaPrompt(lexaAgent, lexaVector, lexaFb),
      userMessage: '', // filled after DA responds
    },
    strategist: {
      agentName: 'Strategist',
      agentId: strategistAgent.id,
      systemPrompt: buildStrategistPrompt(strategistAgent, [], loadBrandDoc(), stratFb),
      userMessage: '', // filled after responses
    },
  }
}

export async function assembleRound3Context(
  allTurns: CouncilTurnRow[],
): Promise<{ editor: AgentContext }> {
  const editorAgent = await getAgentByName('Editor')
  if (!editorAgent) throw new Error('Editor agent not found.')

  const brandDoc = loadBrandDoc()
  const transcript = formatTranscript(allTurns)

  // Load all council agent weights for Editor awareness
  const allAgents = await listAgents({ active: true })
  const agentWeights = allAgents
    .filter((a) => a.debate_role != null)
    .map((a) => ({ name: a.name, weight: a.influence_weight }))

  const editorFb = await getRecentFeedback(editorAgent.id)

  return {
    editor: {
      agentName: 'Editor',
      agentId: editorAgent.id,
      systemPrompt: buildEditorPrompt(editorAgent, brandDoc, agentWeights, editorFb),
      userMessage: `Here is the full debate transcript from the topic selection session. Make your final decision.\n\n${transcript}`,
    },
  }
}
