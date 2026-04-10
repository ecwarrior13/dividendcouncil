import { createServiceClient } from '../client'
import type { ContentPillarRow } from '../types'

const TABLE = 'dn_content_pillars'

export async function listPillars(): Promise<ContentPillarRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .order('name')
  if (error) throw error
  return data as ContentPillarRow[]
}

export async function getPillar(id: string): Promise<ContentPillarRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as ContentPillarRow
}
