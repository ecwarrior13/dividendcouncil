import { createServiceClient } from '../client'
import type { StockAnalysisRow, StockAnalysisInsert, StockAnalysisUpdate } from '../types'

const TABLE = 'dn_stock_analyses'

export async function createStockAnalysis(input: StockAnalysisInsert): Promise<StockAnalysisRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).insert(input).select().single()
  if (error) throw error
  return data as StockAnalysisRow
}

export async function updateStockAnalysis(
  id: string,
  updates: StockAnalysisUpdate,
): Promise<StockAnalysisRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as StockAnalysisRow
}

export async function getStockAnalysis(id: string): Promise<StockAnalysisRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as StockAnalysisRow
}

export async function listStockAnalyses(filters?: {
  ticker?: string
  status?: string
  limit?: number
}): Promise<StockAnalysisRow[]> {
  const sb = createServiceClient()
  let query = sb.from(TABLE).select('*').order('created_at', { ascending: false })
  if (filters?.ticker) query = query.eq('ticker', filters.ticker)
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.limit) query = query.limit(filters.limit)
  const { data, error } = await query
  if (error) throw error
  return data as StockAnalysisRow[]
}

export async function getLatestAnalysis(ticker: string): Promise<StockAnalysisRow | null> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(TABLE)
    .select('*')
    .eq('ticker', ticker.toUpperCase())
    .eq('status', 'complete')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data as StockAnalysisRow | null
}
