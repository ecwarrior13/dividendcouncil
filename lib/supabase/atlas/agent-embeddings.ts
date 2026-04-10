import { createServiceClient } from '../client'
import type { AgentEmbeddingRow, AgentEmbeddingInsert } from '../types'

const TABLE = 'dn_agent_embeddings'

export async function storeEmbedding(input: AgentEmbeddingInsert): Promise<AgentEmbeddingRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as AgentEmbeddingRow
}

export async function searchSimilarReasoning(
  agentId: string,
  queryEmbedding: number[],
  limit = 5,
): Promise<Array<{ content: string; summary: string | null; topic: string | null; similarity: number }>> {
  const sb = createServiceClient()
  const { data, error } = await sb.rpc('match_agent_embeddings', {
    query_embedding: queryEmbedding,
    match_agent_id: agentId,
    match_count: limit,
  })
  if (error) throw error
  return data ?? []
}
