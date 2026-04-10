import { createServiceClient } from '../client'
import type { PostedThreadRow, PostedThreadInsert, PostedThreadUpdate } from '../types'

const TABLE = 'dn_posted_threads'

export async function createPostedThread(input: PostedThreadInsert): Promise<PostedThreadRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as PostedThreadRow
}

export async function getPostedThread(id: string): Promise<PostedThreadRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as PostedThreadRow
}

export async function getPostedThreadByPipeline(pipelineRunId: string): Promise<PostedThreadRow | null> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('pipeline_run_id', pipelineRunId)
    .maybeSingle()
  if (error) throw error
  return data as PostedThreadRow | null
}

export async function updatePostedThread(
  id: string,
  updates: PostedThreadUpdate,
): Promise<PostedThreadRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as PostedThreadRow
}
