import { createServiceClient } from '../client'
import type { AgentRow, AgentInsert, AgentUpdate, DebateRole } from '../types'

const TABLE = 'dn_agents'

export async function getAgent(id: string): Promise<AgentRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as AgentRow
}

export async function getAgentByName(name: string): Promise<AgentRow | null> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('name', name).maybeSingle()
  if (error) throw error
  return data as AgentRow | null
}

export async function listAgents(filters?: { role?: string; active?: boolean }): Promise<AgentRow[]> {
  const sb = createServiceClient()
  let query = sb.from(TABLE).select('*').order('name')
  if (filters?.role) query = query.eq('role', filters.role)
  if (filters?.active !== undefined) query = query.eq('is_active', filters.active)
  const { data, error } = await query
  if (error) throw error
  return data as AgentRow[]
}

export async function createAgent(input: AgentInsert): Promise<AgentRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as AgentRow
}

export async function updateAgent(id: string, updates: AgentUpdate): Promise<AgentRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as AgentRow
}

export async function listCouncilAgents(): Promise<AgentRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .not('debate_role', 'is', null)
    .order('name')
  if (error) throw error
  return data as AgentRow[]
}

export function groupByDebateRole(agents: AgentRow[]): Record<string, AgentRow[]> {
  return agents.reduce((acc, a) => {
    const role = a.debate_role!
    if (!acc[role]) acc[role] = []
    acc[role].push(a)
    return acc
  }, {} as Record<string, AgentRow[]>)
}
