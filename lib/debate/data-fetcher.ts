import {
  getCompanyProfile,
  getIncomeStatements,
  getBalanceSheets,
  getCashFlows,
  getDividendHistory,
  getEtfContext,
  isDataStale,
  upsertCompanyProfile,
  upsertFinancialStatements,
  upsertDividends,
} from '@/lib/supabase/atlas'
import { fetchAndStoreEtf } from '@/lib/fmp/etf'

const FMP_BASE = 'https://financialmodelingprep.com/stable'
let lastCallTime = 0
const MIN_INTERVAL_MS = 500 // FMP has generous rate limits
const ANNUAL_STATEMENT_LIMIT = '11'
const QUARTERLY_STATEMENT_LIMIT = '4'

async function callFMP(endpoint: string, params: Record<string, string> = {}): Promise<unknown> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY
  if (!apiKey) throw new Error('FINANCIAL_MODELING_PREP_API_KEY not set')

  const elapsed = Date.now() - lastCallTime
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - elapsed))
  }
  lastCallTime = Date.now()

  const url = new URL(`${FMP_BASE}/${endpoint}`)
  url.searchParams.set('apikey', apiKey)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`FMP API error: ${res.status} ${res.statusText}`)
  return res.json()
}

function toSnake(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toLowerCase()
}

function mapToSnakeCase(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(obj)) {
    result[toSnake(key)] = val === 'None' || val === '' ? null : val
  }
  return result
}

function mapProfile(
  data: Record<string, unknown>,
  ratios?: Record<string, unknown> | null,
  latestDividend?: Record<string, unknown> | null,
): Record<string, unknown> {
  const employeesRaw = data.fullTimeEmployees
  const employees =
    typeof employeesRaw === 'string' ? parseInt(employeesRaw, 10) || null : employeesRaw

  return {
    company_name: data.companyName,
    description: data.description,
    cik: data.cik,
    exchange: data.exchangeShortName ?? data.exchange,
    currency: data.currency,
    country: data.country,
    sector: data.sector,
    industry: data.industry,
    website: data.website,
    ceo: data.ceo,
    full_time_employees: employees,
    ipo_date: data.ipoDate || null,
    price: data.price,
    market_cap: data.mktCap ?? data.marketCap,
    beta: data.beta,
    vol_avg: data.volAvg ?? data.averageVolume,
    last_div: data.lastDiv ?? data.lastDividend,
    week_52_high: data.range ? parseFloat((data.range as string).split('-')[1]) : null,
    week_52_low: data.range ? parseFloat((data.range as string).split('-')[0]) : null,
    pe: data.pe ?? ratios?.priceToEarningsRatioTTM ?? null,
    eps: data.eps ?? ratios?.netIncomePerShareTTM ?? null,
    dividend_yield: data.dividendYield ?? ratios?.dividendYieldTTM ?? null,
    ex_dividend_date: data.exDividendDate || latestDividend?.date || null,
    is_etf: data.isEtf ?? false,
    is_actively_trading: data.isActivelyTrading ?? true,
  }
}

function mapIncomeStatement(r: any): Record<string, unknown> {
  return {
    date: r.date,
    period: r.period,
    reported_currency: r.reportedCurrency,
    revenue: r.revenue,
    cost_of_revenue: r.costOfRevenue,
    gross_profit: r.grossProfit,
    gross_profit_ratio: r.grossProfitRatio,
    operating_expenses: r.operatingExpenses,
    selling_general_and_administrative: r.sellingGeneralAndAdministrativeExpenses,
    research_and_development: r.researchAndDevelopmentExpenses,
    depreciation_and_amortization: r.depreciationAndAmortization,
    operating_income: r.operatingIncome,
    operating_income_ratio: r.operatingIncomeRatio,
    interest_income: r.interestIncome,
    interest_expense: r.interestExpense,
    total_other_income_expenses_net: r.totalOtherIncomeExpensesNet,
    income_before_tax: r.incomeBeforeTax,
    income_before_tax_ratio: r.incomeBeforeTaxRatio,
    income_tax_expense: r.incomeTaxExpense,
    net_income: r.netIncome,
    net_income_ratio: r.netIncomeRatio,
    eps: r.eps,
    eps_diluted: r.epsDiluted,
    weighted_average_shares: r.weightedAverageShsOut,
    weighted_average_shares_diluted: r.weightedAverageShsOutDil,
    ebitda: r.ebitda,
    ebitda_ratio: r.ebitdaRatio,
    calendar_year: r.fiscalYear,
    filling_date: r.filingDate || null,
    accepted_date: r.acceptedDate,
  }
}

function mapBalanceSheet(r: any): Record<string, unknown> {
  return {
    date: r.date,
    period: r.period,
    reported_currency: r.reportedCurrency,
    cash_and_cash_equivalents: r.cashAndCashEquivalents,
    short_term_investments: r.shortTermInvestments,
    cash_and_short_term_investments: r.cashAndShortTermInvestments,
    net_receivables: r.netReceivables,
    inventory: r.inventory,
    other_current_assets: r.otherCurrentAssets,
    total_current_assets: r.totalCurrentAssets,
    property_plant_equipment_net: r.propertyPlantEquipmentNet,
    goodwill: r.goodwill,
    intangible_assets: r.intangibleAssets,
    long_term_investments: r.longTermInvestments,
    other_non_current_assets: r.otherNonCurrentAssets,
    total_non_current_assets: r.totalNonCurrentAssets,
    total_assets: r.totalAssets,
    account_payables: r.accountPayables,
    short_term_debt: r.shortTermDebt,
    deferred_revenue: r.deferredRevenue,
    other_current_liabilities: r.otherCurrentLiabilities,
    total_current_liabilities: r.totalCurrentLiabilities,
    long_term_debt: r.longTermDebt,
    other_non_current_liabilities: r.otherNonCurrentLiabilities,
    total_non_current_liabilities: r.totalNonCurrentLiabilities,
    total_liabilities: r.totalLiabilities,
    common_stock: r.commonStock,
    retained_earnings: r.retainedEarnings,
    total_stockholders_equity: r.totalStockholdersEquity,
    total_equity: r.totalEquity,
    total_liabilities_and_equity: r.totalLiabilitiesAndStockholdersEquity ?? r.totalLiabilitiesAndTotalEquity,
    calendar_year: r.fiscalYear,
    filling_date: r.filingDate || null,
    accepted_date: r.acceptedDate,
  }
}

function mapCashFlow(r: any): Record<string, unknown> {
  return {
    date: r.date,
    period: r.period,
    reported_currency: r.reportedCurrency,
    net_income: r.netIncome,
    depreciation_and_amortization: r.depreciationAndAmortization,
    stock_based_compensation: r.stockBasedCompensation,
    change_in_working_capital: r.changeInWorkingCapital,
    accounts_receivables: r.accountsReceivables,
    inventory: r.inventory,
    accounts_payables: r.accountsPayables,
    other_working_capital: r.otherWorkingCapital,
    other_non_cash_items: r.otherNonCashItems,
    operating_cash_flow: r.operatingCashFlow ?? r.netCashProvidedByOperatingActivities,
    investments_in_property: r.investmentsInPropertyPlantAndEquipment,
    acquisitions_net: r.acquisitionsNet,
    purchases_of_investments: r.purchasesOfInvestments,
    sales_maturities_of_investments: r.salesMaturitiesOfInvestments,
    other_investing_activities: r.otherInvestingActivities,
    net_cash_used_for_investing: r.netCashProvidedByInvestingActivities,
    debt_repayment: r.netDebtIssuance,
    common_stock_issued: r.commonStockIssuance,
    common_stock_repurchased: r.commonStockRepurchased,
    dividends_paid: r.commonDividendsPaid ?? r.netDividendsPaid,
    other_financing_activities: r.otherFinancingActivities,
    net_cash_used_for_financing: r.netCashProvidedByFinancingActivities,
    net_change_in_cash: r.netChangeInCash,
    cash_at_end_of_period: r.cashAtEndOfPeriod,
    cash_at_beginning_of_period: r.cashAtBeginningOfPeriod,
    capital_expenditure: r.capitalExpenditure,
    free_cash_flow: r.freeCashFlow,
    calendar_year: r.fiscalYear,
    filling_date: r.filingDate || null,
    accepted_date: r.acceptedDate,
  }
}

function mapDividend(r: any): Record<string, unknown> {
  return {
    date: r.date,
    adj_dividend: r.adjDividend,
    dividend: r.dividend,
    record_date: r.recordDate || null,
    payment_date: r.paymentDate || null,
    declaration_date: r.declarationDate || null,
  }
}

export interface FinancialDataBundle {
  profile: Record<string, unknown>
  incomeStatements: Record<string, unknown>[]
  balanceSheets: Record<string, unknown>[]
  cashFlows: Record<string, unknown>[]
  dividends: Record<string, unknown>[]
}

export async function ensureFinancialData(
  ticker: string,
  maxAgeDays = 7,
  options: { throwIfMissingProfile?: boolean } = {},
): Promise<FinancialDataBundle> {
  const { throwIfMissingProfile = true } = options
  const symbol = ticker.toUpperCase()
  const stale = await isDataStale(symbol, maxAgeDays)
  const cachedEtfContext = await getEtfContext(symbol)

  if (stale) {
    console.log(`  Fetching fresh data for ${symbol} from FMP...`)

    let profileData: any[] | null = null
    let ratiosData: any[] | null = null
    try {
      profileData = await callFMP('profile', { symbol }) as any[]
    } catch (err) {
      console.error(`    Profile fetch FAILED for ${symbol}:`, (err as Error).message)
    }
    try {
      ratiosData = await callFMP('ratios-ttm', { symbol }) as any[]
    } catch (err) {
      console.error(`    Ratios-TTM fetch FAILED for ${symbol}:`, (err as Error).message)
    }

    if (Array.isArray(profileData) && profileData[0]) {
      try {
        const ratios = Array.isArray(ratiosData) && ratiosData[0] ? ratiosData[0] : null
        await upsertCompanyProfile(symbol, mapProfile(profileData[0], ratios))
        console.log(`    Profile updated (ratios: ${ratios ? 'yes' : 'no'})`)
      } catch (err) {
        console.error(`    Profile upsert FAILED for ${symbol}:`, (err as Error).message)
      }
    } else {
      console.error(`    Profile fetch returned no rows for ${symbol}. Response:`, JSON.stringify(profileData).slice(0, 300))
    }

    const fetchedProfile = Array.isArray(profileData) && profileData[0] ? profileData[0] : null
    const isEtf = fetchedProfile?.isEtf === true || Boolean(cachedEtfContext)

    if (isEtf) {
      const result = await fetchAndStoreEtf(symbol)
      if (result.success) {
        console.log(`    ETF data updated (${result.diagnostics?.filter((d) => d.status === 'ok').length ?? 0} sources ok)`)
      } else {
        console.error(`    ETF fetch/upsert FAILED for ${symbol}:`, result.message)
      }
    } else {
      try {
        const annualIncome = await callFMP('income-statement', { symbol, period: 'annual', limit: ANNUAL_STATEMENT_LIMIT }) as any[]
        const quarterlyIncome = await callFMP('income-statement', { symbol, period: 'quarter', limit: QUARTERLY_STATEMENT_LIMIT }) as any[]
        await upsertFinancialStatements(symbol, 'fmp_income_statement', [...annualIncome, ...quarterlyIncome].map(mapIncomeStatement))
        console.log(`    Income statements updated (${annualIncome.length} annual, ${quarterlyIncome.length} quarterly)`)
      } catch (err) {
        console.error(`    Income statement fetch/upsert FAILED for ${symbol}:`, (err as Error).message)
      }

      try {
        const annualBalance = await callFMP('balance-sheet-statement', { symbol, period: 'annual', limit: ANNUAL_STATEMENT_LIMIT }) as any[]
        const quarterlyBalance = await callFMP('balance-sheet-statement', { symbol, period: 'quarter', limit: QUARTERLY_STATEMENT_LIMIT }) as any[]
        await upsertFinancialStatements(symbol, 'fmp_balance_sheet', [...annualBalance, ...quarterlyBalance].map(mapBalanceSheet))
        console.log(`    Balance sheets updated`)
      } catch (err) {
        console.error(`    Balance sheet fetch/upsert FAILED for ${symbol}:`, (err as Error).message)
      }

      try {
        const annualCF = await callFMP('cash-flow-statement', { symbol, period: 'annual', limit: ANNUAL_STATEMENT_LIMIT }) as any[]
        const quarterlyCF = await callFMP('cash-flow-statement', { symbol, period: 'quarter', limit: QUARTERLY_STATEMENT_LIMIT }) as any[]
        await upsertFinancialStatements(symbol, 'fmp_cash_flow', [...annualCF, ...quarterlyCF].map(mapCashFlow))
        console.log(`    Cash flows updated`)
      } catch (err) {
        console.error(`    Cash flow fetch/upsert FAILED for ${symbol}:`, (err as Error).message)
      }
    }

    try {
      const divData = await callFMP('dividends', { symbol }) as any[]
      if (divData?.length) {
        await upsertDividends(symbol, divData.map(mapDividend))
        console.log(`    Dividends updated (${divData.length} records)`)
      }
    } catch (err) {
      console.error(`    Dividend fetch/upsert FAILED for ${symbol}:`, (err as Error).message)
    }
  } else {
    console.log(`  Using cached data for ${symbol}`)
  }

  const [profile, incomeStatements, balanceSheets, cashFlows, dividends, etfContext] = await Promise.all([
    getCompanyProfile(symbol),
    getIncomeStatements(symbol),
    getBalanceSheets(symbol),
    getCashFlows(symbol),
    getDividendHistory(symbol),
    getEtfContext(symbol),
  ])

  if (!profile && throwIfMissingProfile) {
    throw new Error(`No profile found for ${symbol}`)
  }

  const mergedProfile = { ...(profile ?? {}) }
  if (etfContext) {
    mergedProfile.is_etf = true
    mergedProfile.etf = etfContext
  }

  return { profile: mergedProfile, incomeStatements, balanceSheets, cashFlows, dividends }
}

export async function ensureFreeCashFlowData(ticker: string, annualLimit = 11): Promise<void> {
  const symbol = ticker.toUpperCase()
  const [stale, annualCashFlows] = await Promise.all([
    isDataStale(symbol),
    getCashFlows(symbol, 'FY', annualLimit),
  ])

  if (!stale && annualCashFlows.length >= annualLimit) return

  let profileData: unknown = null
  let ratiosData: unknown = null
  try {
    profileData = await callFMP('profile', { symbol })
  } catch (err) {
    console.error(`    Profile fetch FAILED for ${symbol}:`, (err as Error).message)
  }
  try {
    ratiosData = await callFMP('ratios-ttm', { symbol })
  } catch (err) {
    console.error(`    Ratios-TTM fetch FAILED for ${symbol}:`, (err as Error).message)
  }

  const profileRows = Array.isArray(profileData) ? profileData as Array<Record<string, unknown>> : []
  const ratiosRows = Array.isArray(ratiosData) ? ratiosData as Array<Record<string, unknown>> : []
  if (profileRows[0]) {
    await upsertCompanyProfile(symbol, mapProfile(profileRows[0], ratiosRows[0] ?? null))
  }

  const cashFlowData = await callFMP('cash-flow-statement', {
    symbol,
    period: 'annual',
    limit: String(annualLimit),
  })
  const cashFlowRows = Array.isArray(cashFlowData) ? cashFlowData : []
  await upsertFinancialStatements(
    symbol,
    'fmp_cash_flow',
    (cashFlowRows as unknown[]).map((row) => mapCashFlow(row)),
  )
}
