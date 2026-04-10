import { createServiceClient } from '../client'
import type { ResearchReportRow, ResearchReportInsert, ResearchReportUpdate } from '../types'

const TABLE = 'dn_research_reports'

export async function writeResearchReport(input: ResearchReportInsert): Promise<ResearchReportRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as ResearchReportRow
}

export async function getResearchReport(id: string): Promise<ResearchReportRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as ResearchReportRow
}

export async function updateResearchReport(
  id: string,
  updates: ResearchReportUpdate,
): Promise<ResearchReportRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as ResearchReportRow
}

export async function getReportsForPipeline(pipelineRunId: string): Promise<ResearchReportRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*, dn_research_runs!inner(pipeline_run_id)')
    .eq('dn_research_runs.pipeline_run_id', pipelineRunId)
    .order('rank', { ascending: true })
  if (error) throw error
  return (data as any[]).map(({ dn_research_runs, ...report }) => report) as ResearchReportRow[]
}

export async function listReportsByRun(researchRunId: string): Promise<ResearchReportRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('research_run_id', researchRunId)
    .order('rank', { ascending: true })
  if (error) throw error
  return data as ResearchReportRow[]
}
