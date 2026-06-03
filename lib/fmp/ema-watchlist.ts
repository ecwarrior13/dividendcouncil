import { fetchAndStoreEtf } from '@/lib/fmp/etf'
import { upsertCompanyProfile } from '@/lib/supabase/atlas/financial-data'
import {
  EmaWatchlistItemRow,
  EmaWatchlistLatestRow,
  EmaWatchlistSnapshotInsert,
  EmaWatchlistStatus,
  persistEmaWatchlistSnapshot,
} from '@/lib/supabase/atlas/ema-watchlist'
import {
  HistoricalPricePoint,
  MovingAverageLevel,
  calculateLatestEma,
  calculateLatestSma,
  nearestMovingAverageLevel,
  percentDistance,
  roundNumber,
} from '@/lib/technical/moving-averages'

const FMP_BASE = 'https://financialmodelingprep.com/stable'

export interface RefreshEmaWatchlistResult {
  success: boolean
  symbol: string
  message?: string
}

async function callFMP(endpoint: string, params: Record<string, string> = {}): Promise<unknown> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY
  if (!apiKey) throw new Error('FINANCIAL_MODELING_PREP_API_KEY not set')

  const url = new URL(`${FMP_BASE}/${endpoint}`)
  url.searchParams.set('apikey', apiKey)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)

  const res = await fetch(url.toString(), { cache: 'no-store' })
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

function parseHistorical(rows: Array<Record<string, unknown>>): HistoricalPricePoint[] {
  return rows
    .map((row) => ({
      date: text(row.date),
      close: num(row.adjustedClose, row.adjClose, row.close, row.price),
    }))
    .filter((row): row is HistoricalPricePoint => Boolean(row.date) && row.close != null && row.close > 0)
    .sort((a, b) => a.date.localeCompare(b.date))
}

function targetLevels(item: EmaWatchlistItemRow, levels: MovingAverageLevel[]): MovingAverageLevel[] {
  if (item.buy_mode === 'any') return levels
  return levels.filter((level) => level.key === item.buy_mode)
}

function statusForItem(item: EmaWatchlistItemRow, levels: MovingAverageLevel[]): EmaWatchlistStatus {
  const targets = targetLevels(item, levels).filter((level) => level.distancePct != null)
  if (targets.length === 0) return 'Needs refresh'

  const alert = Number(item.alert_threshold_pct ?? 3)
  const approaching = Math.max(Number(item.approaching_threshold_pct ?? 8), alert)

  const insideFromAbove = targets.find(
    (level) => level.distancePct != null && level.distancePct >= 0 && level.distancePct <= alert,
  )
  if (insideFromAbove) return 'Inside buy zone'

  const insideEitherSide = targets.find(
    (level) => level.distancePct != null && Math.abs(level.distancePct) <= alert,
  )
  if (insideEitherSide) return 'Inside buy zone'

  const approachingLevel = targets.find(
    (level) => level.distancePct != null && level.distancePct > alert && level.distancePct <= approaching,
  )
  if (approachingLevel?.key === '62_ema') return 'Approaching 62 EMA'
  if (approachingLevel?.key === '79_ema') return 'Approaching 79 EMA'
  if (approachingLevel?.key === '200_sma') return 'Approaching 200 SMA'

  if (targets.every((level) => level.distancePct != null && level.distancePct < -alert)) {
    return 'Below selected level'
  }

  return 'Extended'
}

function latestIndicatorValue(
  rows: Array<Record<string, unknown>>,
  latestDate: string,
  keys: string[],
): number | null {
  const sortedRows = rows
    .filter((row) => text(row.date))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))

  const sameDateRow = sortedRows.find((row) => text(row.date) === latestDate)
  const row = sameDateRow ?? sortedRows[0]
  if (!row) return null

  if (text(row.date) && text(row.date) !== latestDate) return null
  return num(...keys.map((key) => row[key]))
}

async function fetchIndicatorValue(
  endpoint: 'technical-indicators/ema' | 'technical-indicators/sma',
  symbol: string,
  periodLength: number,
  latestDate: string,
): Promise<number | null> {
  try {
    const rows = asArray(await callFMP(endpoint, {
      symbol,
      periodLength: String(periodLength),
      timeframe: '1day',
    }))
    const key = endpoint.endsWith('/ema') ? 'ema' : 'sma'
    return roundNumber(latestIndicatorValue(rows, latestDate, [key, key.toUpperCase(), 'value']), 6)
  } catch {
    return null
  }
}

function mapProfile(data: Record<string, unknown>): Record<string, unknown> {
  const weekRange = text(data.range)
  const [rangeLow, rangeHigh] = weekRange?.split('-').map((part) => num(part)) ?? []

  return {
    company_name: text(data.companyName, data.name),
    description: data.description ?? null,
    cik: data.cik ?? null,
    exchange: text(data.exchangeShortName, data.exchange),
    currency: text(data.currency),
    country: text(data.country),
    sector: text(data.sector),
    industry: text(data.industry),
    website: text(data.website),
    ceo: text(data.ceo),
    full_time_employees: num(data.fullTimeEmployees),
    ipo_date: text(data.ipoDate),
    price: num(data.price),
    market_cap: num(data.mktCap, data.marketCap),
    beta: num(data.beta),
    vol_avg: num(data.volAvg, data.averageVolume),
    last_div: num(data.lastDiv, data.lastDividend),
    week_52_high: rangeHigh ?? num(data.yearHigh, data.week52High),
    week_52_low: rangeLow ?? num(data.yearLow, data.week52Low),
    pe: num(data.pe),
    eps: num(data.eps),
    dividend_yield: num(data.dividendYield),
    ex_dividend_date: text(data.exDividendDate),
    is_etf: data.isEtf ?? false,
    is_actively_trading: data.isActivelyTrading ?? true,
  }
}

export async function refreshEmaWatchlistItem(
  item: EmaWatchlistItemRow,
): Promise<RefreshEmaWatchlistResult> {
  const symbol = item.symbol.toUpperCase()

  try {
    const [profileRows, historyRows] = await Promise.all([
      callFMP('profile', { symbol }).catch(() => []),
      callFMP('historical-price-eod/full', { symbol }),
    ])

    const profile = firstRow(profileRows)
    if (profile) {
      await upsertCompanyProfile(symbol, mapProfile(profile))
      if (profile.isEtf === true) {
        await fetchAndStoreEtf(symbol)
      }
    }

    const points = parseHistorical(asArray(historyRows))
    if (points.length === 0) {
      return {
        success: false,
        symbol,
        message: 'FMP returned no daily price history.',
      }
    }

    const latestPoint = points[points.length - 1]
    const price = roundNumber(latestPoint.close, 6)

    const [fmpEma62, fmpEma79, fmpSma200] = await Promise.all([
      fetchIndicatorValue('technical-indicators/ema', symbol, 62, latestPoint.date),
      fetchIndicatorValue('technical-indicators/ema', symbol, 79, latestPoint.date),
      fetchIndicatorValue('technical-indicators/sma', symbol, 200, latestPoint.date),
    ])

    const ema62 = fmpEma62 ?? calculateLatestEma(points, 62)
    const ema79 = fmpEma79 ?? calculateLatestEma(points, 79)
    const sma200 = fmpSma200 ?? calculateLatestSma(points, 200)

    const levels: MovingAverageLevel[] = [
      { key: '62_ema', label: '62 EMA', price: ema62, distancePct: percentDistance(price, ema62) },
      { key: '79_ema', label: '79 EMA', price: ema79, distancePct: percentDistance(price, ema79) },
      { key: '200_sma', label: '200 SMA', price: sma200, distancePct: percentDistance(price, sma200) },
    ]
    const nearest = nearestMovingAverageLevel(levels)
    const status = statusForItem(item, levels)
    const computedAt = new Date().toISOString()
    const companyName = profile
      ? text(profile.companyName, profile.name)
      : null

    const latest: EmaWatchlistLatestRow = {
      watchlist_item_id: item.id,
      symbol,
      company_name: companyName,
      latest_price: price,
      latest_date: latestPoint.date,
      ema_62: ema62,
      ema_79: ema79,
      sma_200: sma200,
      pct_to_62_ema: levels[0].distancePct,
      pct_to_79_ema: levels[1].distancePct,
      pct_to_200_sma: levels[2].distancePct,
      nearest_level: nearest?.label ?? null,
      nearest_level_price: nearest?.price ?? null,
      nearest_distance_pct: nearest?.distancePct ?? null,
      status,
      raw_source: 'fmp',
      computed_at: computedAt,
    }

    const snapshot: EmaWatchlistSnapshotInsert = {
      watchlist_item_id: item.id,
      symbol,
      as_of_date: latestPoint.date,
      latest_price: price,
      ema_62: ema62,
      ema_79: ema79,
      sma_200: sma200,
      pct_to_62_ema: levels[0].distancePct,
      pct_to_79_ema: levels[1].distancePct,
      pct_to_200_sma: levels[2].distancePct,
      nearest_level: nearest?.label ?? null,
      nearest_level_price: nearest?.price ?? null,
      nearest_distance_pct: nearest?.distancePct ?? null,
      buy_mode: item.buy_mode,
      alert_threshold_pct: Number(item.alert_threshold_pct),
      approaching_threshold_pct: Number(item.approaching_threshold_pct),
      status,
      raw_source: 'fmp',
      computed_at: computedAt,
    }

    await persistEmaWatchlistSnapshot(latest, snapshot)
    return { success: true, symbol }
  } catch (err) {
    return { success: false, symbol, message: (err as Error).message }
  }
}
