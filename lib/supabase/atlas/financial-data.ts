import { createServiceClient } from '../client'

// FMP tables (replacing Alpha Vantage)
const PROFILE = 'fmp_company_profile'
const INCOME = 'fmp_income_statement'
const BALANCE = 'fmp_balance_sheet'
const CASHFLOW = 'fmp_cash_flow'
const DIVIDENDS = 'fmp_dividends'

function firstDefined(...values: unknown[]): unknown {
  return values.find((v) => v !== null && v !== undefined && v !== '')
}

function pctToDecimal(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return null
  return Math.abs(n) > 1 ? n / 100 : n
}

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

// Merged profile read: FMP takes precedence, falls back to legacy alph_stock_metadata.
// Normalizes alpha's `name`/`pe_ratio` to fmp's `company_name`/`pe`.
export async function getMergedCompanyProfile(ticker: string) {
  const symbol = ticker.toUpperCase()
  const sb = createServiceClient()

  const [{ data: fmp }, { data: alpha }, etfContext] = await Promise.all([
    sb.from(PROFILE).select('*').eq('symbol', symbol).maybeSingle(),
    sb.from('alph_stock_metadata').select('*').eq('symbol', symbol).maybeSingle(),
    getEtfContext(symbol),
  ])

  if (!fmp && !alpha && !etfContext) return null

  const alphaNormalized = alpha
    ? {
        company_name: alpha.name,
        description: alpha.description,
        cik: alpha.cik,
        exchange: alpha.exchange,
        currency: alpha.currency,
        country: alpha.country,
        sector: alpha.sector,
        industry: alpha.industry,
        website: alpha.official_site,
        market_cap: alpha.market_capitalization,
        beta: alpha.beta,
        pe: alpha.pe_ratio,
        eps: alpha.eps,
        dividend_yield: alpha.dividend_yield,
        ex_dividend_date: alpha.ex_dividend_date,
        week_52_high: alpha.week_52_high,
        week_52_low: alpha.week_52_low,
        updated_at: alpha.updated_at,
      }
    : {}

  const etfNormalized = etfContext
    ? {
        company_name: etfContext.etf.fund_name,
        exchange: etfContext.etf.primary_exchange,
        currency: etfContext.etf.currency,
        country: etfContext.etf.domicile,
        sector: 'ETF',
        industry: etfContext.etf.category,
        website: etfContext.etf.website_url,
        ipo_date: etfContext.etf.inception_date,
        price: etfContext.market_stats?.market_price,
        market_cap: etfContext.market_stats?.aum,
        vol_avg: etfContext.market_stats?.avg_daily_volume_30d,
        dividend_yield: pctToDecimal(etfContext.income_stats?.dividend_yield_ttm_pct),
        is_etf: true,
        etf: etfContext,
      }
    : {}

  // Merge: FMP wins, but only for non-null/undefined values; alpha fills the rest.
  const merged: Record<string, unknown> = { ...alphaNormalized, ...etfNormalized }
  if (fmp) {
    for (const [k, v] of Object.entries(fmp)) {
      if (v !== null && v !== undefined && v !== '') merged[k] = v
    }
  }
  if (etfContext) {
    merged.is_etf = true
    merged.etf = etfContext
    merged.company_name = firstDefined(merged.company_name, etfContext.etf.fund_name)
    merged.price = firstDefined(merged.price, etfContext.market_stats?.market_price)
    merged.market_cap = firstDefined(merged.market_cap, etfContext.market_stats?.aum)
    merged.vol_avg = firstDefined(merged.vol_avg, etfContext.market_stats?.avg_daily_volume_30d)
    merged.dividend_yield = firstDefined(
      merged.dividend_yield,
      pctToDecimal(etfContext.income_stats?.dividend_yield_ttm_pct),
    )
  }
  merged.symbol = symbol
  return merged
}

export async function getEtfBySymbol(ticker: string) {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('fmp_etfs')
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .maybeSingle()
  if (error) return null
  return data
}

export async function getLatestEtfMarketStats(etfId: string) {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('fmp_etf_market_stats')
    .select('*')
    .eq('etf_id', etfId)
    .order('as_of_date', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) return null
  return data
}

export async function getLatestEtfIncomeStats(etfId: string) {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('fmp_etf_income_stats')
    .select('*')
    .eq('etf_id', etfId)
    .order('as_of_date', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) return null
  return data
}

export async function getEtfHoldings(etfId: string, limit = 25) {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('fmp_etf_holdings')
    .select('*')
    .eq('etf_id', etfId)
    .order('as_of_date', { ascending: false })
    .order('weight_pct', { ascending: false })
    .limit(limit)
  if (error) return []
  return data ?? []
}

export async function getEtfContext(ticker: string) {
  const etf = await getEtfBySymbol(ticker)
  if (!etf) return null

  const [marketStats, incomeStats, holdings] = await Promise.all([
    getLatestEtfMarketStats(etf.id),
    getLatestEtfIncomeStats(etf.id),
    getEtfHoldings(etf.id, 25),
  ])

  return {
    etf,
    market_stats: marketStats,
    income_stats: incomeStats,
    holdings,
    holdings_count: holdings.length,
  }
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

// Legacy alpha_* fallback readers — return rows in fmp-shaped form.
// Used when fmp_* tables have no rows for the ticker.

const ALPHA_PERIOD: Record<string, string> = {
  annual: 'FY',
  quarterly: 'Q',
}

export async function getIncomeStatementsWithFallback(
  ticker: string,
  period?: string,
  limit = 5,
) {
  const fmpRows = await getIncomeStatements(ticker, period, limit)
  if (fmpRows.length > 0) return fmpRows

  const sb = createServiceClient()
  let query = sb
    .from('alpha_income_statement')
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('fiscal_date_ending', { ascending: false })
    .limit(limit)
  if (period === 'FY') query = query.eq('report_type', 'annual')
  else if (period && period.startsWith('Q')) query = query.eq('report_type', 'quarterly')
  const { data, error } = await query
  if (error) return []
  return (data ?? []).map((r: Record<string, unknown>) => ({
    symbol: r.symbol,
    date: r.fiscal_date_ending,
    period: r.report_type === 'annual' ? 'FY' : 'Q',
    reported_currency: r.reported_currency,
    revenue: r.total_revenue,
    cost_of_revenue: r.cost_of_revenue,
    gross_profit: r.gross_profit,
    operating_expenses: r.operating_expenses,
    operating_income: r.operating_income,
    interest_income: r.interest_income,
    interest_expense: r.interest_expense,
    income_before_tax: r.income_before_tax,
    income_tax_expense: r.income_tax_expense,
    net_income: r.net_income,
    ebitda: r.ebitda,
    depreciation_and_amortization: r.depreciation_and_amortization,
  }))
}

export async function getBalanceSheetsWithFallback(
  ticker: string,
  period?: string,
  limit = 5,
) {
  const fmpRows = await getBalanceSheets(ticker, period, limit)
  if (fmpRows.length > 0) return fmpRows

  const sb = createServiceClient()
  let query = sb
    .from('alpha_balance_sheet')
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('fiscal_date_ending', { ascending: false })
    .limit(limit)
  if (period === 'FY') query = query.eq('report_type', 'annual')
  else if (period && period.startsWith('Q')) query = query.eq('report_type', 'quarterly')
  const { data, error } = await query
  if (error) return []
  return (data ?? []).map((r: Record<string, unknown>) => ({
    symbol: r.symbol,
    date: r.fiscal_date_ending,
    period: r.report_type === 'annual' ? 'FY' : 'Q',
    cash_and_cash_equivalents: r.cash_and_cash_equivalents_at_carrying_value ?? r.cash_and_cash_equivalents,
    total_current_assets: r.total_current_assets,
    total_assets: r.total_assets,
    short_term_debt: r.short_term_debt,
    long_term_debt: r.long_term_debt,
    total_current_liabilities: r.total_current_liabilities,
    total_liabilities: r.total_liabilities,
    retained_earnings: r.retained_earnings,
    total_stockholders_equity: r.total_shareholder_equity ?? r.total_stockholders_equity,
  }))
}

export async function getCashFlowsWithFallback(
  ticker: string,
  period?: string,
  limit = 5,
) {
  const fmpRows = await getCashFlows(ticker, period, limit)
  if (fmpRows.length > 0) return fmpRows

  const sb = createServiceClient()
  let query = sb
    .from('alpha_cash_flow')
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('fiscal_date_ending', { ascending: false })
    .limit(limit)
  if (period === 'FY') query = query.eq('report_type', 'annual')
  else if (period && period.startsWith('Q')) query = query.eq('report_type', 'quarterly')
  const { data, error } = await query
  if (error) return []
  return (data ?? []).map((r: Record<string, unknown>) => ({
    symbol: r.symbol,
    date: r.fiscal_date_ending,
    period: r.report_type === 'annual' ? 'FY' : 'Q',
    operating_cash_flow: r.operating_cashflow ?? r.operating_cash_flow,
    capital_expenditure: r.capital_expenditures ?? r.capital_expenditure,
    free_cash_flow: null, // not directly stored; debate computes if needed
    dividends_paid: r.dividend_payout ?? r.dividends_paid,
    common_stock_repurchased: r.payments_for_repurchase_of_common_stock,
    net_cash_used_for_investing: r.cashflow_from_investment,
    net_cash_used_for_financing: r.cashflow_from_financing,
    net_change_in_cash: r.change_in_cash_and_cash_equivalents,
  }))
}

export async function getDividendHistoryWithFallback(ticker: string, limit = 20) {
  const fmpRows = await getDividendHistory(ticker, limit)
  if (fmpRows.length > 0) return fmpRows

  const sb = createServiceClient()
  const { data, error } = await sb
    .from('alpha_dividends')
    .select('*')
    .eq('symbol', ticker.toUpperCase())
    .order('ex_dividend_date', { ascending: false })
    .limit(limit)
  if (error) return []
  return (data ?? []).map((r: Record<string, unknown>) => ({
    symbol: r.symbol,
    date: r.ex_dividend_date,
    dividend: r.amount,
    adj_dividend: r.amount,
    record_date: r.record_date,
    payment_date: r.payment_date,
    declaration_date: r.declaration_date,
  }))
}

void ALPHA_PERIOD // reserved for future use

export async function isDataStale(ticker: string, maxAgeDays = 7): Promise<boolean> {
  const profile = await getCompanyProfile(ticker)
  if (!profile) return true
  const updatedAt = new Date(profile.updated_at)
  const ageDays = (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24)
  return ageDays > maxAgeDays
}

export async function upsertCompanyProfile(ticker: string, data: Record<string, unknown>) {
  const sb = createServiceClient()
  const row = { symbol: ticker.toUpperCase(), ...data, updated_at: new Date().toISOString() }
  const [filtered] = await filterToKnownColumns(sb, PROFILE, [row])
  const { error } = await sb
    .from(PROFILE)
    .upsert(filtered, { onConflict: 'symbol' })
  if (error) throw error
}

// Filter rows to only include columns that exist in the target table.
// Tries information_schema first (works when table is empty); falls back to a sample row.
async function filterToKnownColumns(
  sb: ReturnType<typeof createServiceClient>,
  table: string,
  rows: Array<Record<string, unknown>>,
): Promise<Array<Record<string, unknown>>> {
  let validColumns: Set<string> | null = null

  const { data: schemaCols } = await sb
    .schema('information_schema' as never)
    .from('columns' as never)
    .select('column_name')
    .eq('table_schema', 'public')
    .eq('table_name', table)
  if (schemaCols && Array.isArray(schemaCols) && schemaCols.length > 0) {
    validColumns = new Set(
      (schemaCols as Array<{ column_name: string }>).map((r) => r.column_name),
    )
  }

  if (!validColumns) {
    const { data: sample } = await sb.from(table).select('*').limit(1)
    if (sample && sample.length > 0) {
      validColumns = new Set(Object.keys(sample[0]))
    }
  }

  if (!validColumns) return rows // can't determine; pass through

  return rows.map((row) => {
    const filtered: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(row)) {
      if (validColumns!.has(k)) filtered[k] = v
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
