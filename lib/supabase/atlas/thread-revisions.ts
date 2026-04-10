import { createServiceClient } from '../client'
import type { ThreadRevisionRow, ThreadRevisionInsert } from '../types'

const TABLE = 'dn_thread_revisions'

export async function createThreadRevision(input: ThreadRevisionInsert): Promise<ThreadRevisionRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as ThreadRevisionRow
}

export async function listRevisionsByDraft(draftId: string): Promise<ThreadRevisionRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('draft_id', draftId)
    .order('new_version', { ascending: true })
  if (error) throw error
  return data as ThreadRevisionRow[]
}
