import { createServiceClient } from '../client'
import type { PodcastScriptRow, PodcastScriptInsert, PodcastScriptUpdate } from '../types'

const TABLE = 'dn_podcast_scripts'

export async function createPodcastScript(input: PodcastScriptInsert): Promise<PodcastScriptRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as PodcastScriptRow
}

export async function getPodcastScript(id: string): Promise<PodcastScriptRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as PodcastScriptRow
}

export async function updatePodcastScript(
  id: string,
  updates: PodcastScriptUpdate,
): Promise<PodcastScriptRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as PodcastScriptRow
}
