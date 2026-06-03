export interface HistoricalPricePoint {
  date: string
  close: number
}

export interface MovingAverageLevel {
  key: '62_ema' | '79_ema' | '200_sma'
  label: '62 EMA' | '79 EMA' | '200 SMA'
  price: number | null
  distancePct: number | null
}

export function roundNumber(value: number | null, decimals: number): number | null {
  if (value == null || !Number.isFinite(value)) return null
  return Number(value.toFixed(decimals))
}

export function calculateLatestEma(points: HistoricalPricePoint[], period: number): number | null {
  if (points.length < period) return null

  const closes = points.map((point) => point.close)
  let ema = closes.slice(0, period).reduce((sum, close) => sum + close, 0) / period
  const multiplier = 2 / (period + 1)

  for (let i = period; i < closes.length; i += 1) {
    ema = ((closes[i] - ema) * multiplier) + ema
  }

  return roundNumber(ema, 6)
}

export function calculateLatestSma(points: HistoricalPricePoint[], period: number): number | null {
  if (points.length < period) return null

  const slice = points.slice(-period)
  return roundNumber(slice.reduce((sum, point) => sum + point.close, 0) / period, 6)
}

export function percentDistance(price: number | null, level: number | null): number | null {
  if (price == null || level == null || level <= 0) return null
  return roundNumber(((price - level) / level) * 100, 4)
}

export function nearestMovingAverageLevel(levels: MovingAverageLevel[]): MovingAverageLevel | null {
  return levels
    .filter((level): level is MovingAverageLevel & { distancePct: number; price: number } =>
      level.distancePct != null && level.price != null,
    )
    .sort((a, b) => Math.abs(a.distancePct) - Math.abs(b.distancePct))[0] ?? null
}
