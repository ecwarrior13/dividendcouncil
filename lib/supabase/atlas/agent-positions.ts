import { createServiceClient } from '../client'
import type { AgentPositionRow, AgentPositionInsert, AgentPositionUpdate } from '../types'

const TABLE = 'dn_agent_positions'

export async function recordAgentPosition(input: AgentPositionInsert): Promise<AgentPositionRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as AgentPositionRow
}

export async function listPositionsByAgent(agentId: string): Promise<AgentPositionRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as AgentPositionRow[]
}

export async function listPositionsByTicker(ticker: string): Promise<AgentPositionRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('ticker', ticker)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as AgentPositionRow[]
}
