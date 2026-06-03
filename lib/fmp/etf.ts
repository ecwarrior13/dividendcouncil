import { createServiceClient } from '@/lib/supabase/client'
import {
  upsertCompanyProfile,
  upsertDividends,
} from '@/lib/supabase/atlas/financial-data'

const FMP_BASE = 'https://financialmodelingprep.com/stable'

export interface FetchDiagnostic {
  source: string
  status: string
  detail?: string
}

export interface FetchEtfResult {
  success: boolean
  symbol: string
  message?: string
  diagnostics?: FetchDiagnostic[]
}

async function callFMP(endpoint: string, params: Record<string, string> = {}): Promise<unknown> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY
  if (!apiKey) throw new Error('FINANCIAL_MODELING_PREP_API_KEY not set')

  const url = new URL(`${FMP_BASE}/${endpoint}`)
  url.searchParams.set('apikey', apiKey)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`FMP error ${res.status} on /${endpoint}`)
  return res.json()
}

function firstRow(data: unknown): Record<string, unknown> | null {
  if (Array.isArray(data)) return (data[0] as Record<string, unknown>) ?? null
  if (data && typeof data === 'object') return data as Record<string, unknown>
  return null
}

function asArray(data: unknown): Array<Record<string, unknown>> {
  return Array.isArray(data) ? data as Array<Record<string, unknown>> : []
}

function num(...values: unknown[]): number | null {
  for (const value of values) {
    if (value === null || value === undefined || value === '') continue
    const n = typeof value === 'number' ? value : Number(String(value).replace(/[%,$]/g, ''))
    if (Number.isFinite(n)) return n
  }
  return null
}

function text(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return null
}

function priceFromHistoricalRow(row: Record<string, unknown>): number | null {
  return num(row.adjustedClose, row.adjClose, row.close, row.price)
}

function pctValue(...values: unknown[]): number | null {
  const n = num(...values)
  if (n == null) return null
  return Math.abs(n) <= 1 ? Number((n * 100).toFixed(4)) : Number(n.toFixed(4))
}

function pctDecimal(...values: unknown[]): number | null {
  const pct = pctValue(...values)
  return pct == null ? null : Number((pct / 100).toFixed(6))
}

function inferAssetClass(profile: Record<string, unknown>, info?: Record<string, unknown> | null): string {
  const combined = [
    profile.sector,
    profile.industry,
    info?.assetClass,
    info?.asset_class,
    info?.assetType,
    info?.category,
  ].map((v) => String(v ?? '').toLowerCase()).join(' ')

  if (combined.includes('bond') || combined.includes('fixed')) return 'fixed_income'
  if (combined.includes('commodit')) return 'commodity'
  if (combined.includes('currency')) return 'currency'
  if (combined.includes('digital') || combined.includes('crypto') || combined.includes('bitcoin')) return 'digital_assets'
  if (combined.includes('multi')) return 'multi_asset'
  return 'equity'
}

function activePassive(value: string | null): 'active' | 'passive' | null {
  const normalized = value?.toLowerCase()
  if (normalized === 'active' || normalized === 'passive') return normalized
  return null
}

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function addYears(date: Date, years: number): Date {
  const next = new Date(date)
  next.setFullYear(next.getFullYear() + years)
  return next
}

function computeReturnsFromHistoricalPrices(rows: Array<Record<string, unknown>>) {
  const points = rows
    .map((row) => ({
      date: text(row.date),
      price: priceFromHistoricalRow(row),
    }))
    .filter((point): point is { date: string; price: number } => (
      Boolean(point.date) && point.price != null && point.price > 0
    ))
    .sort((a, b) => a.date.localeCompare(b.date))

  if (points.length === 0) return { r1y: null, r3y: null, r5y: null, rIncep: null }

  const latest = points[points.length - 1]

  const priceYearsAgo = (years: number): number | null => {
    const target = toISODate(addYears(new Date(`${latest.date}T00:00:00.000Z`), -years))
    let chosen: { date: string; price: number } | null = null
    for (const point of points) {
      if (point.date <= target) chosen = point
      else break
    }
    return chosen?.price ?? null
  }

  const p1 = priceYearsAgo(1)
  const p3 = priceYearsAgo(3)
  const p5 = priceYearsAgo(5)
  const pIncep = points[0].price

  const r1y = p1 ? ((latest.price - p1) / p1) * 100 : null
  const r3y = p3 ? (Math.pow(latest.price / p3, 1 / 3) - 1) * 100 : null
  const r5y = p5 ? (Math.pow(latest.price / p5, 1 / 5) - 1) * 100 : null
  const rIncep = pIncep > 0 ? ((latest.price - pIncep) / pIncep) * 100 : null

  return {
    r1y: r1y != null ? Number(r1y.toFixed(4)) : null,
    r3y: r3y != null ? Number(r3y.toFixed(4)) : null,
    r5y: r5y != null ? Number(r5y.toFixed(4)) : null,
    rIncep: rIncep != null ? Number(rIncep.toFixed(4)) : null,
  }
}

export async function fetchAndStoreEtf(symbolInput: string): Promise<FetchEtfResult> {
  const symbol = symbolInput.trim().toUpperCase()
  const today = new Date().toISOString().slice(0, 10)
  const diagnostics: FetchDiagnostic[] = []

  try {
    const profileArr = await callFMP('profile', { symbol })
    const profile = firstRow(profileArr)
    if (!profile) return { success: false, symbol, message: `No profile found for ${symbol}`, diagnostics }
    if (profile.isEtf === false) return { success: false, symbol, message: `${symbol} is not an ETF (per FMP)`, diagnostics }
    diagnostics.push({ source: 'FMP /profile', status: 'ok' })

    let etfInfo: Record<string, unknown> | null = null
    try {
      etfInfo = firstRow(await callFMP('etf/info', { symbol }))
      diagnostics.push({ source: 'FMP /etf/info', status: etfInfo ? 'ok' : 'empty' })
    } catch (err) {
      diagnostics.push({ source: 'FMP /etf/info', status: 'error', detail: (err as Error).message })
    }

    let quote: Record<string, unknown> | null = null
    try {
      const quoteArr = await callFMP('batch-etf-quotes', { symbols: symbol })
      quote = asArray(quoteArr).find((q) => q.symbol === symbol) ?? firstRow(quoteArr)
      diagnostics.push({ source: 'FMP /batch-etf-quotes', status: quote ? 'ok' : 'empty' })
    } catch (err) {
      diagnostics.push({ source: 'FMP /batch-etf-quotes', status: 'error', detail: (err as Error).message })
      try {
        quote = firstRow(await callFMP('quote', { symbol }))
        diagnostics.push({ source: 'FMP /quote', status: quote ? 'ok' : 'empty' })
      } catch (quoteErr) {
        diagnostics.push({ source: 'FMP /quote', status: 'error', detail: (quoteErr as Error).message })
      }
    }

    let sectorAllocations: Array<Record<string, unknown>> = []
    try {
      sectorAllocations = asArray(await callFMP('etf/sector-weightings', { symbol }))
      diagnostics.push({
        source: 'FMP /etf/sector-weightings',
        status: sectorAllocations.length ? 'ok' : 'empty',
        detail: sectorAllocations.length ? `${sectorAllocations.length} rows` : undefined,
      })
    } catch (err) {
      diagnostics.push({ source: 'FMP /etf/sector-weightings', status: 'error', detail: (err as Error).message })
    }

    try {
      const countryAllocations = asArray(await callFMP('etf/country-weightings', { symbol }))
      diagnostics.push({
        source: 'FMP /etf/country-weightings',
        status: countryAllocations.length ? 'ok' : 'empty',
        detail: countryAllocations.length ? `${countryAllocations.length} rows` : undefined,
      })
    } catch (err) {
      diagnostics.push({ source: 'FMP /etf/country-weightings', status: 'error', detail: (err as Error).message })
    }

    let holdings: Array<Record<string, unknown>> = []
    try {
      holdings = asArray(await callFMP('etf/holdings', { symbol }))
      diagnostics.push({
        source: 'FMP /etf/holdings',
        status: holdings.length ? 'ok' : 'empty',
        detail: holdings.length ? `${holdings.length} rows` : undefined,
      })
    } catch (err) {
      diagnostics.push({ source: 'FMP /etf/holdings', status: 'error', detail: (err as Error).message })
    }

    let historicalPrices: Array<Record<string, unknown>> = []
    try {
      historicalPrices = asArray(await callFMP('historical-price-eod/full', { symbol }))
      diagnostics.push({
        source: 'FMP /historical-price-eod/full',
        status: historicalPrices.length ? 'ok' : 'empty',
        detail: historicalPrices.length ? `${historicalPrices.length} rows` : undefined,
      })
    } catch (err) {
      diagnostics.push({ source: 'FMP /historical-price-eod/full', status: 'error', detail: (err as Error).message })
    }
    const returns = computeReturnsFromHistoricalPrices(historicalPrices)

    const sb = createServiceClient()

    const marketPrice = num(quote?.price, profile.price)
    const nav = num(etfInfo?.nav, etfInfo?.netAssetValue, etfInfo?.netAssetsValue)
    const premiumDiscount =
      nav != null && marketPrice != null && nav > 0
        ? Number((((marketPrice - nav) / nav) * 100).toFixed(4))
        : null
    const expenseRatioPct = pctValue(etfInfo?.expenseRatio, etfInfo?.netExpenseRatio, etfInfo?.expense_ratio)
    const dividendYieldPct = pctValue(
      etfInfo?.dividendYield,
      etfInfo?.distributionYield,
      profile.dividendYield,
    )
    const aum = num(etfInfo?.aum, etfInfo?.assetsUnderManagement, etfInfo?.assetUnderManagement, profile.mktCap)
    const avgVolume = num(quote?.avgVolume, quote?.volume, profile.volAvg)
    const sharesOutstanding = num(etfInfo?.sharesOutstanding, profile.sharesOutstanding)

    const etfPayload = {
      symbol,
      fund_name: text(etfInfo?.name, etfInfo?.fundName, profile.companyName, profile.name) ?? symbol,
      issuer: text(etfInfo?.issuer, etfInfo?.company, profile.companyName)?.split(' ')[0] ?? 'Unknown',
      cusip: text(etfInfo?.cusip, profile.cusip),
      isin: text(etfInfo?.isin, profile.isin),
      asset_class: inferAssetClass(profile, etfInfo),
      category: text(etfInfo?.category, etfInfo?.fundFamily, profile.industry),
      active_passive: activePassive(text(etfInfo?.activePassive, etfInfo?.active_passive)),
      benchmark_index: text(etfInfo?.benchmarkIndex, etfInfo?.benchmark),
      primary_exchange: text(profile.exchangeShortName, profile.exchange, etfInfo?.exchange),
      currency: (text(profile.currency, etfInfo?.currency) ?? 'USD').toUpperCase(),
      domicile: text(profile.country, etfInfo?.domicile),
      inception_date: text(etfInfo?.inceptionDate, profile.ipoDate),
      website_url: text(profile.website, etfInfo?.website),
      data_source: 'fmp',
      updated_at: new Date().toISOString(),
    }

    const { data: upsertedEtf, error: etfErr } = await sb
      .from('fmp_etfs')
      .upsert(etfPayload, { onConflict: 'symbol' })
      .select()
      .single()
    if (etfErr) throw new Error(`fmp_etfs upsert: ${etfErr.message}`)

    await upsertCompanyProfile(symbol, {
      company_name: etfPayload.fund_name,
      description: profile.description ?? null,
      cik: profile.cik ?? null,
      exchange: etfPayload.primary_exchange,
      currency: etfPayload.currency,
      country: etfPayload.domicile,
      sector: 'ETF',
      industry: etfPayload.category,
      website: etfPayload.website_url,
      ipo_date: etfPayload.inception_date,
      price: marketPrice,
      market_cap: aum,
      beta: profile.beta ?? null,
      vol_avg: avgVolume,
      last_div: num(profile.lastDiv, profile.lastDividend),
      week_52_high: num(quote?.yearHigh, quote?.year_high),
      week_52_low: num(quote?.yearLow, quote?.year_low),
      pe: null,
      eps: null,
      dividend_yield: pctDecimal(etfInfo?.dividendYield, etfInfo?.distributionYield, profile.dividendYield),
      ex_dividend_date: text(profile.exDividendDate),
      is_etf: true,
      is_actively_trading: profile.isActivelyTrading ?? true,
    })

    await sb
      .from('fmp_etf_market_stats')
      .upsert({
        etf_id: upsertedEtf.id,
        as_of_date: today,
        market_price: marketPrice,
        nav,
        premium_discount_pct: premiumDiscount,
        aum,
        expense_ratio_pct: expenseRatioPct,
        avg_daily_volume_30d: avgVolume,
        shares_outstanding: sharesOutstanding,
        total_return_1y_pct: returns.r1y,
        total_return_3y_ann_pct: returns.r3y,
        total_return_5y_ann_pct: returns.r5y,
        nav_return_since_inception_pct: returns.rIncep,
        sector_allocations: sectorAllocations.length ? sectorAllocations : null,
      }, { onConflict: 'etf_id,as_of_date' })

    if (dividendYieldPct != null || profile.lastDiv != null) {
      await sb
        .from('fmp_etf_income_stats')
        .upsert({
          etf_id: upsertedEtf.id,
          as_of_date: today,
          dividend_yield_ttm_pct: dividendYieldPct,
          distribution_yield_ttm_pct: pctValue(etfInfo?.distributionYield),
          sec_yield_30d_pct: pctValue(etfInfo?.secYield, etfInfo?.yield30Day),
          annual_distribution_rate: num(etfInfo?.annualDistributionRate),
          ttm_distributions_per_share: num(profile.lastDiv, profile.lastDividend),
        }, { onConflict: 'etf_id,as_of_date' })
    }

    if (holdings.length > 0) {
      const rows = holdings.slice(0, 100).map((h) => ({
        etf_id: upsertedEtf.id,
        as_of_date: text(h.date) ?? today,
        symbol: text(h.asset, h.holdingSymbol, h.symbol) ?? 'UNKNOWN',
        asset_name: text(h.name, h.holdingName, h.assetName),
        weight_pct: pctValue(h.weightPercentage, h.weight),
        shares_held: num(h.sharesNumber, h.quantity, h.shares),
        market_value: num(h.marketValue),
      }))
      await sb
        .from('fmp_etf_holdings')
        .upsert(rows, { onConflict: 'etf_id,as_of_date,symbol' })
    }

    try {
      const divData = asArray(await callFMP('dividends', { symbol }))
      if (divData.length > 0) {
        await upsertDividends(symbol, divData.map((r) => ({
          date: r.date,
          adj_dividend: r.adjDividend ?? r.adj_dividend ?? r.dividend,
          dividend: r.dividend,
          record_date: r.recordDate ?? r.record_date ?? null,
          payment_date: r.paymentDate ?? r.payment_date ?? null,
          declaration_date: r.declarationDate ?? r.declaration_date ?? null,
        })))
      }
      diagnostics.push({ source: 'FMP /dividends', status: divData.length ? 'ok' : 'empty' })
    } catch (err) {
      diagnostics.push({ source: 'FMP /dividends', status: 'error', detail: (err as Error).message })
    }

    return { success: true, symbol, diagnostics }
  } catch (err) {
    return { success: false, symbol, message: (err as Error).message, diagnostics }
  }
}
