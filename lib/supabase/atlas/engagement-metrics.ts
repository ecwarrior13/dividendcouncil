import { createServiceClient } from '../client'
import type { EngagementMetricsRow, EngagementMetricsInsert, EngagementMetricsUpdate } from '../types'

const TABLE = 'dn_engagement_metrics'

export async function createEngagementMetrics(input: EngagementMetricsInsert): Promise<EngagementMetricsRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as EngagementMetricsRow
}

export async function listMetricsByThread(postedThreadId: string): Promise<EngagementMetricsRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('posted_thread_id', postedThreadId)
    .order('measured_at', { ascending: false })
  if (error) throw error
  return data as EngagementMetricsRow[]
}

export async function updateEngagementMetrics(
  id: string,
  updates: EngagementMetricsUpdate,
): Promise<EngagementMetricsRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as EngagementMetricsRow
}
