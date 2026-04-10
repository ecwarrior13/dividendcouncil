import { createServiceClient } from '../client'

// These tables use the Alpha Vantage schema (not dn_ prefix)
const METADATA = 'alph_stock_metadata'
const BALANCE_SHEET = 'alpha_balance_sheet'
const CASH_FLOW = 'alpha_cash_flow'
const INCOME_STATEMENT = 'alpha_income_statement'

export async function getStockMetadata(ticker: string) {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(METADATA)
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .maybeSingle()
  if (error) throw error
  return data
}

export async function getBalanceSheet(
  ticker: string,
  reportType?: 'annual' | 'quarterly',
  limit = 5,
) {
  const sb = createServiceClient()
  let query = sb
    .from(BALANCE_SHEET)
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('fiscal_date_ending', { ascending: false })
    .limit(limit)
  if (reportType) query = query.eq('report_type', reportType)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getCashFlow(
  ticker: string,
  reportType?: 'annual' | 'quarterly',
  limit = 5,
) {
  const sb = createServiceClient()
  let query = sb
    .from(CASH_FLOW)
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('fiscal_date_ending', { ascending: false })
    .limit(limit)
  if (reportType) query = query.eq('report_type', reportType)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getIncomeStatement(
  ticker: string,
  reportType?: 'annual' | 'quarterly',
  limit = 5,
) {
  const sb = createServiceClient()
  let query = sb
    .from(INCOME_STATEMENT)
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('fiscal_date_ending', { ascending: false })
    .limit(limit)
  if (reportType) query = query.eq('report_type', reportType)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function isDataStale(ticker: string, maxAgeDays = 7): Promise<boolean> {
  const metadata = await getStockMetadata(ticker)
  if (!metadata) return true
  const updatedAt = new Date(metadata.updated_at)
  const ageMs = Date.now() - updatedAt.getTime()
  const ageDays = ageMs / (1000 * 60 * 60 * 24)
  return ageDays > maxAgeDays
}

export async function upsertStockMetadata(ticker: string, data: Record<string, unknown>) {
  const sb = createServiceClient()
  const { error } = await sb
    .from(METADATA)
    .upsert({ symbol: ticker.toUpperCase(), ...data, updated_at: new Date().toISOString() }, { onConflict: 'symbol' })
  if (error) throw error
}

export async function upsertFinancialStatements(
  ticker: string,
  table: 'alpha_balance_sheet' | 'alpha_cash_flow' | 'alpha_income_statement',
  rows: Array<Record<string, unknown>>,
) {
  if (rows.length === 0) return
  const sb = createServiceClient()

  // Discover valid columns by querying one row (or empty set)
  const { data: sample, error: sampleErr } = await sb.from(table).select('*').limit(1)
  let validColumns: Set<string> | null = null
  if (!sampleErr && sample && sample.length > 0) {
    validColumns = new Set(Object.keys(sample[0]))
  }

  const tagged = rows.map((r) => {
    const row: Record<string, unknown> = { ...r, symbol: ticker.toUpperCase() }
    // Filter to only known columns if we have a schema sample
    if (validColumns) {
      for (const key of Object.keys(row)) {
        if (!validColumns.has(key)) delete row[key]
      }
    }
    return row
  })

  const { error } = await sb
    .from(table)
    .upsert(tagged, { onConflict: 'symbol,fiscal_date_ending,report_type' })
  if (error) throw error
}
