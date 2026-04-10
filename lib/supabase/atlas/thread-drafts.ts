import { createServiceClient } from '../client'
import type { ThreadDraftRow, ThreadDraftInsert, ThreadDraftUpdate } from '../types'

const TABLE = 'dn_thread_drafts'

export async function createThreadDraft(input: ThreadDraftInsert): Promise<ThreadDraftRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as ThreadDraftRow
}

export async function getThreadDraft(id: string): Promise<ThreadDraftRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as ThreadDraftRow
}

export async function updateThreadDraft(
  id: string,
  updates: ThreadDraftUpdate,
): Promise<ThreadDraftRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as ThreadDraftRow
}

export async function getLatestDraft(pipelineRunId: string): Promise<ThreadDraftRow | null> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('pipeline_run_id', pipelineRunId)
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data as ThreadDraftRow | null
}

export async function getDraftWithRevisions(draftId: string): Promise<
  ThreadDraftRow & { revisions: import('../types').ThreadRevisionRow[] }
> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*, dn_thread_revisions(*)')
    .eq('id', draftId)
    .single()
  if (error) throw error
  const { dn_thread_revisions, ...draft } = data as any
  return { ...draft, revisions: dn_thread_revisions ?? [] }
}

export async function listDraftsByPipeline(pipelineRunId: string): Promise<ThreadDraftRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('pipeline_run_id', pipelineRunId)
    .order('version', { ascending: true })
  if (error) throw error
  return data as ThreadDraftRow[]
}
