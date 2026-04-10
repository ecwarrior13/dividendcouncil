import {
  createCouncilSession,
  updateCouncilSession,
  logAgentActivity,
  recordAgentPosition,
  listCouncilAgents,
  groupByDebateRole,
} from '@/lib/supabase/atlas'
import { storeEmbedding } from '@/lib/supabase/atlas'
import { getDefaultWorkflow, getWorkflowWithSteps } from '@/lib/supabase/atlas'
import { embed } from './openai'
import { loadSessionContext, executeWorkflow } from './executor'

interface CouncilResult {
  sessionId: string
  topic: string
  decision: string
}

function parseTopic(editorResponse: string): { topic: string; decision: string } {
  const topicMatch = editorResponse.match(/^TOPIC:\s*(.+)/m)
  const topic = topicMatch?.[1]?.trim() ?? editorResponse.split('\n')[0].trim()
  return { topic, decision: editorResponse }
}

export async function runTopicSelection(options: {
  seededTopics?: string[]
  workflowId?: string
} = {}): Promise<CouncilResult> {
  // Load workflow (specific or default)
  const { workflow, steps } = options.workflowId
    ? await getWorkflowWithSteps(options.workflowId)
    : await getDefaultWorkflow('topic_selection')

  console.log(`\nUsing workflow: "${workflow.name}" (${steps.length} steps)`)

  // Validate agents exist for required roles
  const agents = await listCouncilAgents()
  const grouped = groupByDebateRole(agents)
  const requiredRoles = new Set(steps.map((s) => s.debate_role))
  for (const role of requiredRoles) {
    if (!grouped[role]?.length) {
      throw new Error(`Workflow requires role '${role}' but no active agents have it`)
    }
  }

  // Create session
  const session = await createCouncilSession({
    session_type: 'topic_selection',
    workflow_id: workflow.id,
    status: 'active',
  })

  await logAgentActivity({
    agent_name: 'Council',
    activity_type: 'started',
    message: `Council topic selection — workflow "${workflow.name}", ${agents.length} agents`,
    metadata: { council_session_id: session.id, workflow_id: workflow.id },
  })

  // Load shared context
  const ctx = await loadSessionContext(options)

  try {
    // Execute the workflow
    const result = await executeWorkflow(session.id, workflow.id, steps, ctx)

    // Parse final topic from the last turn
    const { topic, decision } = parseTopic(result.finalTurnContent)

    // Update session
    await updateCouncilSession(session.id, {
      status: 'complete',
      topic,
      decision,
      completed_at: new Date().toISOString(),
    })

    await logAgentActivity({
      agent_name: 'Council',
      activity_type: 'completed',
      message: `Council selected topic: ${topic}`,
      metadata: { council_session_id: session.id, topic },
    })

    // Post-session: embed all proposer reasoning
    console.log('\n── Embedding proposer reasoning ──')
    const proposers = grouped['proposer'] ?? []
    for (const proposer of proposers) {
      const proposerTurns = result.turns.filter((t) => t.agent_id === proposer.id)
      for (const turn of proposerTurns) {
        try {
          const vector = await embed(turn.content)
          await storeEmbedding({
            agent_id: turn.agent_id!,
            session_id: session.id,
            content: turn.content,
            topic,
            embedding: vector,
          })
        } catch (err) {
          console.error(`Failed to embed ${proposer.name} turn:`, err)
        }
      }
      const finalTurn = proposerTurns[proposerTurns.length - 1]
      if (finalTurn) {
        await recordAgentPosition({
          agent_id: finalTurn.agent_id!,
          topic,
          stance: 'proposed',
          reasoning: finalTurn.content.slice(0, 500),
          confidence: 7,
          source_session_id: session.id,
        })
      }
    }

    console.log('\nSession complete.')
    return { sessionId: session.id, topic, decision }
  } catch (err) {
    await updateCouncilSession(session.id, { status: 'cancelled' })
    await logAgentActivity({
      agent_name: 'Council',
      activity_type: 'error',
      message: `Council session failed: ${(err as Error).message}`,
      metadata: { council_session_id: session.id },
    })
    throw err
  }
}
