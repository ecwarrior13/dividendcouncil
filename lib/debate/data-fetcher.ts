import {
  getStockMetadata,
  getBalanceSheet,
  getCashFlow,
  getIncomeStatement,
  isDataStale,
  upsertStockMetadata,
  upsertFinancialStatements,
} from '@/lib/supabase/atlas'

const AV_BASE = 'https://www.alphavantage.co/query'
let lastCallTime = 0
const MIN_INTERVAL_MS = 12_000 // 5 calls/min

async function callAV(params: Record<string, string>): Promise<Record<string, unknown>> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  if (!apiKey) throw new Error('ALPHA_VANTAGE_API_KEY not set')

  const elapsed = Date.now() - lastCallTime
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - elapsed))
  }
  lastCallTime = Date.now()

  const url = new URL(AV_BASE)
  url.searchParams.set('apikey', apiKey)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Alpha Vantage error: ${res.status}`)
  const data = await res.json() as Record<string, unknown>

  if (data['Note'] || data['Information']) {
    throw new Error(`AV rate limit: ${data['Note'] ?? data['Information']}`)
  }
  return data
}

function mapOverviewToMetadata(data: Record<string, unknown>): Record<string, unknown> {
  return {
    asset_type: data['AssetType'],
    name: data['Name'],
    description: data['Description'],
    cik: data['CIK'],
    exchange: data['Exchange'],
    currency: data['Currency'],
    country: data['Country'],
    sector: data['Sector'],
    industry: data['Industry'],
    address: data['Address'],
    official_site: data['OfficialSite'],
    fiscal_year_end: data['FiscalYearEnd'],
    latest_quarter: data['LatestQuarter'] || null,
    market_capitalization: parseNum(data['MarketCapitalization']),
    ebitda: parseNum(data['EBITDA']),
    pe_ratio: parseNum(data['PERatio']),
    peg_ratio: parseNum(data['PEGRatio']),
    book_value: parseNum(data['BookValue']),
    dividend_per_share: parseNum(data['DividendPerShare']),
    dividend_yield: parseNum(data['DividendYield']),
    eps: parseNum(data['EPS']),
    revenue_per_share_ttm: parseNum(data['RevenuePerShareTTM']),
    profit_margin: parseNum(data['ProfitMargin']),
    operating_margin_ttm: parseNum(data['OperatingMarginTTM']),
    return_on_assets_ttm: parseNum(data['ReturnOnAssetsTTM']),
    return_on_equity_ttm: parseNum(data['ReturnOnEquityTTM']),
    revenue_ttm: parseNum(data['RevenueTTM']),
    gross_profit_ttm: parseNum(data['GrossProfitTTM']),
    diluted_eps_ttm: parseNum(data['DilutedEPSTTM']),
    quarterly_earnings_growth_yoy: parseNum(data['QuarterlyEarningsGrowthYOY']),
    quarterly_revenue_growth_yoy: parseNum(data['QuarterlyRevenueGrowthYOY']),
    analyst_target_price: parseNum(data['AnalystTargetPrice']),
    analyst_rating_strong_buy: parseInt(data['AnalystRatingStrongBuy'] as string) || null,
    analyst_rating_buy: parseInt(data['AnalystRatingBuy'] as string) || null,
    analyst_rating_hold: parseInt(data['AnalystRatingHold'] as string) || null,
    analyst_rating_sell: parseInt(data['AnalystRatingSell'] as string) || null,
    analyst_rating_strong_sell: parseInt(data['AnalystRatingStrongSell'] as string) || null,
    trailing_pe: parseNum(data['TrailingPE']),
    forward_pe: parseNum(data['ForwardPE']),
    price_to_sales_ratio_ttm: parseNum(data['PriceToSalesRatioTTM']),
    price_to_book_ratio: parseNum(data['PriceToBookRatio']),
    ev_to_revenue: parseNum(data['EVToRevenue']),
    ev_to_ebitda: parseNum(data['EVToEBITDA']),
    beta: parseNum(data['Beta']),
    week_52_high: parseNum(data['52WeekHigh']),
    week_52_low: parseNum(data['52WeekLow']),
    day_50_moving_average: parseNum(data['50DayMovingAverage']),
    day_200_moving_average: parseNum(data['200DayMovingAverage']),
    shares_outstanding: parseNum(data['SharesOutstanding']),
    shares_float: parseNum(data['SharesFloat']),
    percent_insiders: parseNum(data['PercentInsiders']),
    percent_institutions: parseNum(data['PercentInstitutions']),
    dividend_date: data['DividendDate'] || null,
    ex_dividend_date: data['ExDividendDate'] || null,
  }
}

function parseNum(val: unknown): number | null {
  if (val === null || val === undefined || val === 'None' || val === '-') return null
  const n = parseFloat(val as string)
  return isNaN(n) ? null : n
}

// Proper camelCase to snake_case that handles consecutive capitals correctly
function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toLowerCase()
}

function mapStatementRows(reports: any[], reportType: string): Array<Record<string, unknown>> {
  return reports.map((r: Record<string, string>) => {
    const mapped: Record<string, unknown> = { report_type: reportType }
    for (const [key, val] of Object.entries(r)) {
      const snakeKey = toSnakeCase(key)
      mapped[snakeKey] = val === 'None' ? null : val
    }
    return mapped
  })
}

export interface FinancialDataBundle {
  metadata: Record<string, unknown>
  incomeStatements: Record<string, unknown>[]
  balanceSheets: Record<string, unknown>[]
  cashFlows: Record<string, unknown>[]
}

export async function ensureFinancialData(
  ticker: string,
  maxAgeDays = 7,
): Promise<FinancialDataBundle> {
  const symbol = ticker.toUpperCase()
  const stale = await isDataStale(symbol, maxAgeDays)

  if (stale) {
    console.log(`  Fetching fresh data for ${symbol} from Alpha Vantage...`)

    // Fetch overview
    const overview = await callAV({ function: 'OVERVIEW', symbol })
    await upsertStockMetadata(symbol, mapOverviewToMetadata(overview))
    console.log(`    Overview updated`)

    // Fetch income statement
    const income = await callAV({ function: 'INCOME_STATEMENT', symbol })
    const annualIncome = mapStatementRows(
      (income['annualReports'] as any[]) ?? [], 'annual',
    )
    const quarterlyIncome = mapStatementRows(
      (income['quarterlyReports'] as any[])?.slice(0, 4) ?? [], 'quarterly',
    )
    await upsertFinancialStatements(symbol, 'alpha_income_statement', [...annualIncome, ...quarterlyIncome])
    console.log(`    Income statements updated`)

    // Fetch balance sheet
    const balance = await callAV({ function: 'BALANCE_SHEET', symbol })
    const annualBalance = mapStatementRows(
      (balance['annualReports'] as any[]) ?? [], 'annual',
    )
    const quarterlyBalance = mapStatementRows(
      (balance['quarterlyReports'] as any[])?.slice(0, 4) ?? [], 'quarterly',
    )
    await upsertFinancialStatements(symbol, 'alpha_balance_sheet', [...annualBalance, ...quarterlyBalance])
    console.log(`    Balance sheets updated`)

    // Fetch cash flow
    const cashFlow = await callAV({ function: 'CASH_FLOW', symbol })
    const annualCF = mapStatementRows(
      (cashFlow['annualReports'] as any[]) ?? [], 'annual',
    )
    const quarterlyCF = mapStatementRows(
      (cashFlow['quarterlyReports'] as any[])?.slice(0, 4) ?? [], 'quarterly',
    )
    await upsertFinancialStatements(symbol, 'alpha_cash_flow', [...annualCF, ...quarterlyCF])
    console.log(`    Cash flows updated`)
  } else {
    console.log(`  Using cached data for ${symbol}`)
  }

  // Load all data from DB
  const [metadata, incomeStatements, balanceSheets, cashFlows] = await Promise.all([
    getStockMetadata(symbol),
    getIncomeStatement(symbol),
    getBalanceSheet(symbol),
    getCashFlow(symbol),
  ])

  if (!metadata) throw new Error(`No metadata found for ${symbol}`)

  return {
    metadata,
    incomeStatements,
    balanceSheets,
    cashFlows,
  }
}
