import { createServiceClient } from '../client'
import type { ResearchSourceRow, ResearchSourceInsert, ResearchSourceUpdate } from '../types'

const TABLE = 'dn_research_sources'

export async function addResearchSource(input: ResearchSourceInsert): Promise<ResearchSourceRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as ResearchSourceRow
}

export async function listSourcesByRun(researchRunId: string): Promise<ResearchSourceRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('research_run_id', researchRunId)
    .order('credibility', { ascending: false })
  if (error) throw error
  return data as ResearchSourceRow[]
}

export async function updateResearchSource(
  id: string,
  updates: ResearchSourceUpdate,
): Promise<ResearchSourceRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as ResearchSourceRow
}
