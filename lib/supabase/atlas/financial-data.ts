import { createServiceClient } from '../client'

// FMP tables (replacing Alpha Vantage)
const PROFILE = 'fmp_company_profile'
const INCOME = 'fmp_income_statement'
const BALANCE = 'fmp_balance_sheet'
const CASHFLOW = 'fmp_cash_flow'
const DIVIDENDS = 'fmp_dividends'

export async function getCompanyProfile(ticker: string) {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(PROFILE)
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .maybeSingle()
  if (error) throw error
  return data
}

export async function getIncomeStatements(
  ticker: string,
  period?: string,
  limit = 5,
) {
  const sb = createServiceClient()
  let query = sb
    .from(INCOME)
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('date', { ascending: false })
    .limit(limit)
  if (period) query = query.eq('period', period)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getBalanceSheets(
  ticker: string,
  period?: string,
  limit = 5,
) {
  const sb = createServiceClient()
  let query = sb
    .from(BALANCE)
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('date', { ascending: false })
    .limit(limit)
  if (period) query = query.eq('period', period)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getCashFlows(
  ticker: string,
  period?: string,
  limit = 5,
) {
  const sb = createServiceClient()
  let query = sb
    .from(CASHFLOW)
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('date', { ascending: false })
    .limit(limit)
  if (period) query = query.eq('period', period)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getDividendHistory(ticker: string, limit = 20) {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(DIVIDENDS)
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('date', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}

export async function isDataStale(ticker: string, maxAgeDays = 7): Promise<boolean> {
  const profile = await getCompanyProfile(ticker)
  if (!profile) return true
  const updatedAt = new Date(profile.updated_at)
  const ageDays = (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24)
  return ageDays > maxAgeDays
}

export async function upsertCompanyProfile(ticker: string, data: Record<string, unknown>) {
  const sb = createServiceClient()
  const { error } = await sb
    .from(PROFILE)
    .upsert({ symbol: ticker.toUpperCase(), ...data, updated_at: new Date().toISOString() }, { onConflict: 'symbol' })
  if (error) throw error
}

// Filter rows to only include columns that exist in the target table
async function filterToKnownColumns(
  sb: ReturnType<typeof createServiceClient>,
  table: string,
  rows: Array<Record<string, unknown>>,
): Promise<Array<Record<string, unknown>>> {
  const { data: sample } = await sb.from(table).select('*').limit(1)
  if (!sample || sample.length === 0) return rows // first insert, can't filter
  const validColumns = new Set(Object.keys(sample[0]))
  return rows.map((row) => {
    const filtered: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(row)) {
      if (validColumns.has(k)) filtered[k] = v
    }
    return filtered
  })
}

export async function upsertFinancialStatements(
  ticker: string,
  table: 'fmp_income_statement' | 'fmp_balance_sheet' | 'fmp_cash_flow',
  rows: Array<Record<string, unknown>>,
) {
  if (rows.length === 0) return
  const sb = createServiceClient()
  const tagged = rows.map((r) => ({ ...r, symbol: ticker.toUpperCase() }))
  const filtered = await filterToKnownColumns(sb, table, tagged)
  const { error } = await sb
    .from(table)
    .upsert(filtered, { onConflict: 'symbol,date,period' })
  if (error) throw error
}

export async function upsertDividends(
  ticker: string,
  rows: Array<Record<string, unknown>>,
) {
  if (rows.length === 0) return
  const sb = createServiceClient()
  const tagged = rows.map((r) => ({ ...r, symbol: ticker.toUpperCase() }))
  const filtered = await filterToKnownColumns(sb, DIVIDENDS, tagged)
  const { error } = await sb
    .from(DIVIDENDS)
    .upsert(filtered, { onConflict: 'symbol,date' })
  if (error) throw error
}
