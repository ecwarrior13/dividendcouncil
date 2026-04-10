import { createServiceClient } from '../client'
import type { CouncilTurnRow, CouncilTurnInsert } from '../types'

const TABLE = 'dn_council_turns'

export async function addCouncilTurn(input: CouncilTurnInsert): Promise<CouncilTurnRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as CouncilTurnRow
}

export async function listTurnsBySession(sessionId: string): Promise<CouncilTurnRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('session_id', sessionId)
    .order('turn_order', { ascending: true })
  if (error) throw error
  return data as CouncilTurnRow[]
}
