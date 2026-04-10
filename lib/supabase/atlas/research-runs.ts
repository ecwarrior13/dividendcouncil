import { createServiceClient } from '../client'
import type {
  ResearchRunRow,
  ResearchRunInsert,
  ResearchRunUpdate,
  ResearchSourceRow,
  ResearchReportRow,
} from '../types'

const TABLE = 'dn_research_runs'

export async function createResearchRun(input: ResearchRunInsert): Promise<ResearchRunRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as ResearchRunRow
}

export async function getResearchRun(id: string): Promise<ResearchRunRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as ResearchRunRow
}

export async function updateResearchRun(
  id: string,
  updates: ResearchRunUpdate,
): Promise<ResearchRunRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as ResearchRunRow
}

export async function getResearchRunByPipeline(pipelineRunId: string): Promise<ResearchRunRow | null> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('pipeline_run_id', pipelineRunId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data as ResearchRunRow | null
}

export async function getRunWithSources(
  runId: string,
): Promise<ResearchRunRow & { sources: ResearchSourceRow[] }> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*, dn_research_sources(*)')
    .eq('id', runId)
    .single()
  if (error) throw error
  const { dn_research_sources, ...run } = data as any
  return { ...run, sources: dn_research_sources ?? [] }
}

export async function getRunWithReports(
  runId: string,
): Promise<ResearchRunRow & { reports: ResearchReportRow[] }> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*, dn_research_reports(*)')
    .eq('id', runId)
    .order('rank', { referencedTable: 'dn_research_reports', ascending: true })
    .single()
  if (error) throw error
  const { dn_research_reports, ...run } = data as any
  return { ...run, reports: dn_research_reports ?? [] }
}
