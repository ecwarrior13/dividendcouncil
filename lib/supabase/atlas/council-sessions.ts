import { createServiceClient } from '../client'
import type {
  CouncilSessionRow,
  CouncilSessionInsert,
  CouncilSessionUpdate,
  CouncilSessionStatus,
  CouncilSessionType,
} from '../types'

const TABLE = 'dn_council_sessions'

export async function listCouncilSessions(filters?: {
  status?: CouncilSessionStatus
  session_type?: CouncilSessionType
  limit?: number
}): Promise<CouncilSessionRow[]> {
  const sb = createServiceClient()
  let query = sb.from(TABLE).select('*').order('created_at', { ascending: false })
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.session_type) query = query.eq('session_type', filters.session_type)
  if (filters?.limit) query = query.limit(filters.limit)
  const { data, error } = await query
  if (error) throw error
  return data as CouncilSessionRow[]
}

export async function createCouncilSession(input: CouncilSessionInsert): Promise<CouncilSessionRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as CouncilSessionRow
}

export async function getCouncilSession(id: string): Promise<CouncilSessionRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as CouncilSessionRow
}

export async function updateCouncilSession(
  id: string,
  updates: CouncilSessionUpdate,
): Promise<CouncilSessionRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as CouncilSessionRow
}
