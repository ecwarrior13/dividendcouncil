import { createServiceClient } from '../client'
import type { TopicProposalRow, TopicProposalInsert, TopicProposalStatus } from '../types'

const TABLE = 'dn_topic_proposals'

export async function createProposal(input: TopicProposalInsert): Promise<TopicProposalRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as TopicProposalRow
}

export async function listProposals(filters?: {
  status?: TopicProposalStatus
  pillar_id?: string
}): Promise<TopicProposalRow[]> {
  const sb = createServiceClient()
  let query = sb.from(TABLE).select('*').order('created_at', { ascending: false })
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.pillar_id) query = query.eq('pillar_id', filters.pillar_id)
  const { data, error } = await query
  if (error) throw error
  return data as TopicProposalRow[]
}

export async function updateProposalStatus(
  id: string,
  status: TopicProposalStatus,
): Promise<TopicProposalRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update({ status }).eq('id', id).select().single()
  if (error) throw error
  return data as TopicProposalRow
}

export async function getQueuedProposals(): Promise<TopicProposalRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('status', 'queued')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data as TopicProposalRow[]
}
