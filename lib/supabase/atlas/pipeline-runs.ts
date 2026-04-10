import { createServiceClient } from '../client'
import type {
  PipelineRunRow,
  PipelineRunInsert,
  PipelineRunUpdate,
  PipelineRunStatus,
  VALID_STATUS_TRANSITIONS,
} from '../types'
import { VALID_STATUS_TRANSITIONS as transitions } from '../types'

const TABLE = 'dn_pipeline_runs'

export async function listPipelineRuns(filters?: {
  status?: PipelineRunStatus
  limit?: number
}): Promise<PipelineRunRow[]> {
  const sb = createServiceClient()
  let query = sb.from(TABLE).select('*').order('created_at', { ascending: false })
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.limit) query = query.limit(filters.limit)
  const { data, error } = await query
  if (error) throw error
  return data as PipelineRunRow[]
}

export async function getPipelineRun(id: string): Promise<PipelineRunRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as PipelineRunRow
}

export async function createPipelineRun(input: PipelineRunInsert): Promise<PipelineRunRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as PipelineRunRow
}

export async function updatePipelineRun(
  id: string,
  updates: PipelineRunUpdate,
): Promise<PipelineRunRow> {
  if (updates.status) {
    const current = await getPipelineRun(id)
    const allowed = transitions[current.status]
    if (!allowed.includes(updates.status)) {
      throw new Error(
        `Invalid status transition: ${current.status} → ${updates.status}. Allowed: ${allowed.join(', ')}`,
      )
    }
    if (updates.status === 'posted' || updates.status === 'cancelled') {
      updates.completed_at = new Date().toISOString()
    }
  }

  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as PipelineRunRow
}

export async function getNextPendingResearch(): Promise<PipelineRunRow | null> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('status', 'topic_approved')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data as PipelineRunRow | null
}

export async function getNextPendingDraft(): Promise<PipelineRunRow | null> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('status', 'report_approved')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data as PipelineRunRow | null
}
