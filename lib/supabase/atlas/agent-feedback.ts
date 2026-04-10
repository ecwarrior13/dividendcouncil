import { createServiceClient } from '../client'
import type { AgentFeedbackRow, AgentFeedbackInsert } from '../types'

const TABLE = 'dn_agent_feedback'

export async function submitFeedback(input: AgentFeedbackInsert): Promise<AgentFeedbackRow> {
  const sb = createServiceClient()
  // Upsert: one rating per agent per session
  const { data, error } = await sb
    .from(TABLE)
    .upsert(input, { onConflict: 'session_id,agent_id' })
    .select()
    .single()
  if (error) throw error
  return data as AgentFeedbackRow
}

export async function listFeedbackByAgent(
  agentId: string,
  limit = 10,
): Promise<AgentFeedbackRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data as AgentFeedbackRow[]
}

export async function getAverageRating(agentId: string): Promise<number | null> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('rating')
    .eq('agent_id', agentId)
  if (error) throw error
  if (!data || data.length === 0) return null
  const sum = data.reduce((s, r) => s + r.rating, 0)
  return sum / data.length
}

export async function listFeedbackBySession(sessionId: string): Promise<AgentFeedbackRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('session_id', sessionId)
  if (error) throw error
  return data as AgentFeedbackRow[]
}
