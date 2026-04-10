import { createServiceClient } from '../client'
import type { AgentActivityRow, AgentActivityInsert } from '../types'

const TABLE = 'dn_agent_activity'

export async function logAgentActivity(input: AgentActivityInsert): Promise<AgentActivityRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as AgentActivityRow
}

export async function listActivityByPipeline(
  pipelineRunId: string,
  limit = 50,
): Promise<AgentActivityRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('pipeline_run_id', pipelineRunId)
    .order('created_at', { ascending: true })
    .limit(limit)
  if (error) throw error
  return data as AgentActivityRow[]
}

export async function listRecentActivity(limit = 30): Promise<AgentActivityRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data as AgentActivityRow[]
}
