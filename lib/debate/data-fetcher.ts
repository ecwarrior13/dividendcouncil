import {
  getCompanyProfile,
  getIncomeStatements,
  getBalanceSheets,
  getCashFlows,
  getDividendHistory,
  isDataStale,
  upsertCompanyProfile,
  upsertFinancialStatements,
  upsertDividends,
} from '@/lib/supabase/atlas'

const FMP_BASE = 'https://financialmodelingprep.com/stable'
let lastCallTime = 0
const MIN_INTERVAL_MS = 500 // FMP has generous rate limits

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

function mapProfile(data: Record<string, unknown>): Record<string, unknown> {
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
    full_time_employees: data.fullTimeEmployees,
    ipo_date: data.ipoDate || null,
    price: data.price,
    market_cap: data.mktCap ?? data.marketCap,
    beta: data.beta,
    vol_avg: data.volAvg,
    last_div: data.lastDiv,
    week_52_high: data.range ? parseFloat((data.range as string).split('-')[1]) : null,
    week_52_low: data.range ? parseFloat((data.range as string).split('-')[0]) : null,
    pe: data.pe,
    eps: data.eps,
    dividend_yield: data.dividendYield,
    ex_dividend_date: data.exDividendDate || null,
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
): Promise<FinancialDataBundle> {
  const symbol = ticker.toUpperCase()
  const stale = await isDataStale(symbol, maxAgeDays)

  if (stale) {
    console.log(`  Fetching fresh data for ${symbol} from FMP...`)

    // Fetch profile
    const profileData = await callFMP('profile', { symbol }) as any[]
    if (profileData?.[0]) {
      await upsertCompanyProfile(symbol, mapProfile(profileData[0]))
      console.log(`    Profile updated`)
    }

    // Fetch income statements
    const annualIncome = await callFMP('income-statement', { symbol, period: 'annual', limit: '5' }) as any[]
    const quarterlyIncome = await callFMP('income-statement', { symbol, period: 'quarter', limit: '4' }) as any[]
    await upsertFinancialStatements(symbol, 'fmp_income_statement', [...annualIncome, ...quarterlyIncome].map(mapIncomeStatement))
    console.log(`    Income statements updated (${annualIncome.length} annual, ${quarterlyIncome.length} quarterly)`)

    // Fetch balance sheets
    const annualBalance = await callFMP('balance-sheet-statement', { symbol, period: 'annual', limit: '5' }) as any[]
    const quarterlyBalance = await callFMP('balance-sheet-statement', { symbol, period: 'quarter', limit: '4' }) as any[]
    await upsertFinancialStatements(symbol, 'fmp_balance_sheet', [...annualBalance, ...quarterlyBalance].map(mapBalanceSheet))
    console.log(`    Balance sheets updated`)

    // Fetch cash flow statements
    const annualCF = await callFMP('cash-flow-statement', { symbol, period: 'annual', limit: '5' }) as any[]
    const quarterlyCF = await callFMP('cash-flow-statement', { symbol, period: 'quarter', limit: '4' }) as any[]
    await upsertFinancialStatements(symbol, 'fmp_cash_flow', [...annualCF, ...quarterlyCF].map(mapCashFlow))
    console.log(`    Cash flows updated`)

    // Fetch dividend history
    const divData = await callFMP('dividends', { symbol }) as any[]
    if (divData?.length) {
      await upsertDividends(symbol, divData.map(mapDividend))
      console.log(`    Dividends updated (${divData.length} records)`)
    }
  } else {
    console.log(`  Using cached data for ${symbol}`)
  }

  // Load all data from DB
  const [profile, incomeStatements, balanceSheets, cashFlows, dividends] = await Promise.all([
    getCompanyProfile(symbol),
    getIncomeStatements(symbol),
    getBalanceSheets(symbol),
    getCashFlows(symbol),
    getDividendHistory(symbol),
  ])

  if (!profile) throw new Error(`No profile found for ${symbol}`)

  return { profile, incomeStatements, balanceSheets, cashFlows, dividends }
}
