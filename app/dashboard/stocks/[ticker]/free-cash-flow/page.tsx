import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getCashFlows, getMergedCompanyProfile } from '@/lib/supabase/atlas'
import { ensureFreeCashFlowData } from '@/lib/debate/data-fetcher'
import { FreeCashFlowChart, type FreeCashFlowPoint } from './free-cash-flow-chart'

const TICKER_RE = /^[A-Z][A-Z0-9.-]{0,9}$/

interface CashFlowRow {
  date?: string | null
  period?: string | null
  calendar_year?: string | null
  operating_cash_flow?: number | string | null
  capital_expenditure?: number | string | null
  free_cash_flow?: number | string | null
}

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : null
}

function computeFreeCashFlow(row: CashFlowRow): number | null {
  const stored = toNumber(row.free_cash_flow)
  if (stored !== null) return stored

  const operatingCashFlow = toNumber(row.operating_cash_flow)
  const capitalExpenditure = toNumber(row.capital_expenditure)
  if (operatingCashFlow === null || capitalExpenditure === null) return null

  return capitalExpenditure < 0
    ? operatingCashFlow + capitalExpenditure
    : operatingCashFlow - capitalExpenditure
}

function fiscalYear(row: CashFlowRow): number | null {
  const fromCalendar = toNumber(row.calendar_year)
  if (fromCalendar !== null) return fromCalendar
  if (!row.date) return null
  const year = new Date(row.date).getUTCFullYear()
  return Number.isFinite(year) ? year : null
}

function formatMoney(value: unknown): string {
  const n = toNumber(value)
  if (n === null) return '-'
  const sign = n < 0 ? '-' : ''
  const abs = Math.abs(n)
  if (abs >= 1e12) return `${sign}$${(abs / 1e12).toFixed(2)}T`
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`
  return `${sign}$${abs.toLocaleString()}`
}

function formatPercent(value: number | null): string {
  if (value === null) return 'N/A'
  return `${value.toFixed(2)}%`
}

interface CagrCalculation {
  label: string
  requestedYears: number
  startYear: string | null
  endYear: string | null
  startValue: number | null
  endValue: number | null
  periods: number | null
  cagr: number | null
  note: string
}

interface ForecastRow {
  year: string
  yearsForward: number
  fiveYearProjection: number | null
  tenYearProjection: number | null
}

function calculateCagr(points: FreeCashFlowPoint[], years: number): CagrCalculation {
  const label = `${years}Y FCF CAGR`
  if (points.length < 2) {
    return {
      label,
      requestedYears: years,
      startYear: null,
      endYear: null,
      startValue: null,
      endValue: null,
      periods: null,
      cagr: null,
      note: `Needs at least ${years + 1} annual records.`,
    }
  }

  const latest = points[points.length - 1]
  const latestYear = Number(latest.year)
  if (!Number.isFinite(latestYear)) {
    return {
      label,
      requestedYears: years,
      startYear: null,
      endYear: latest.year,
      startValue: null,
      endValue: latest.freeCashFlow,
      periods: null,
      cagr: null,
      note: 'Latest fiscal year is unavailable.',
    }
  }

  const targetYear = latestYear - years
  const start =
    points.find((point) => Number(point.year) === targetYear)
    ?? [...points].reverse().find((point) => Number(point.year) <= targetYear)

  if (!start) {
    return {
      label,
      requestedYears: years,
      startYear: null,
      endYear: latest.year,
      startValue: null,
      endValue: latest.freeCashFlow,
      periods: null,
      cagr: null,
      note: `Needs a fiscal year at least ${years} years before ${latest.year}.`,
    }
  }

  const startYear = Number(start.year)
  const periods = latestYear - startYear
  if (periods <= 0) {
    return {
      label,
      requestedYears: years,
      startYear: start.year,
      endYear: latest.year,
      startValue: start.freeCashFlow,
      endValue: latest.freeCashFlow,
      periods,
      cagr: null,
      note: 'Start and end year do not form a valid range.',
    }
  }

  if (start.freeCashFlow <= 0 || latest.freeCashFlow <= 0) {
    return {
      label,
      requestedYears: years,
      startYear: start.year,
      endYear: latest.year,
      startValue: start.freeCashFlow,
      endValue: latest.freeCashFlow,
      periods,
      cagr: null,
      note: 'CAGR requires positive start and end free cash flow.',
    }
  }

  const cagr = (Math.pow(latest.freeCashFlow / start.freeCashFlow, 1 / periods) - 1) * 100

  return {
    label,
    requestedYears: years,
    startYear: start.year,
    endYear: latest.year,
    startValue: start.freeCashFlow,
    endValue: latest.freeCashFlow,
    periods,
    cagr,
    note:
      periods === years
        ? 'Exact period.'
        : `Used ${periods} years because ${start.year} is the oldest qualifying record.`,
  }
}

function buildForecastRows(
  latestPoint: FreeCashFlowPoint | null,
  fiveYearCagr: number | null,
  tenYearCagr: number | null,
  horizonYears = 10,
): ForecastRow[] {
  if (!latestPoint) return []

  const latestYear = Number(latestPoint.year)
  const canUseCalendarYear = Number.isFinite(latestYear)

  return Array.from({ length: horizonYears }, (_, index) => {
    const yearsForward = index + 1
    const year = canUseCalendarYear ? String(latestYear + yearsForward) : `Year ${yearsForward}`

    return {
      year,
      yearsForward,
      fiveYearProjection:
        fiveYearCagr === null
          ? null
          : latestPoint.freeCashFlow * Math.pow(1 + fiveYearCagr / 100, yearsForward),
      tenYearProjection:
        tenYearCagr === null
          ? null
          : latestPoint.freeCashFlow * Math.pow(1 + tenYearCagr / 100, yearsForward),
    }
  })
}

export default async function FreeCashFlowPage({
  params,
}: {
  params: Promise<{ ticker: string }>
}) {
  const { ticker: rawTicker } = await params
  const ticker = rawTicker.toUpperCase()
  if (!TICKER_RE.test(ticker)) notFound()

  let fetchError: string | null = null
  try {
    await ensureFreeCashFlowData(ticker, 11)
  } catch (err) {
    fetchError = (err as Error).message
  }

  const [profile, cashFlows] = await Promise.all([
    getMergedCompanyProfile(ticker),
    getCashFlows(ticker, 'FY', 11),
  ])

  if (!profile && cashFlows.length === 0) notFound()

  const points = (cashFlows as CashFlowRow[])
    .map((row) => {
      const year = fiscalYear(row)
      const freeCashFlow = computeFreeCashFlow(row)
      if (year === null || freeCashFlow === null) return null
      return {
        year: String(year),
        freeCashFlow,
        freeCashFlowDisplay: formatMoney(freeCashFlow),
      }
    })
    .filter((point): point is FreeCashFlowPoint => point !== null)
    .sort((a, b) => Number(a.year) - Number(b.year))

  const latestPoint = points[points.length - 1] ?? null
  const cagrCalculations = [calculateCagr(points, 5), calculateCagr(points, 10)]
  const fiveYearCagr = cagrCalculations[0].cagr
  const tenYearCagr = cagrCalculations[1].cagr
  const forecastRows = buildForecastRows(latestPoint, fiveYearCagr, tenYearCagr, 10)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {ticker}
            {profile?.company_name ? (
              <span className="ml-2 text-base font-normal text-muted-foreground">
                {String(profile.company_name)}
              </span>
            ) : null}
          </h2>
          <p className="text-sm text-muted-foreground">
            Annual free cash flow history and long-term growth rates.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href={`/dashboard/stocks/${ticker}`} className="text-muted-foreground underline">
            Stock page
          </Link>
          <Link href="/dashboard/analyses" className="text-muted-foreground underline">
            Back to analyses
          </Link>
        </div>
      </div>

      {fetchError && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <strong>Data fetch error:</strong> {fetchError}
          <p className="mt-1 text-xs">Showing cached free cash flow data if available.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Price</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {formatMoney(profile?.price)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latest FCF</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {latestPoint ? latestPoint.freeCashFlowDisplay : 'N/A'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">5Y FCF CAGR</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {formatPercent(fiveYearCagr)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">10Y FCF CAGR</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {formatPercent(tenYearCagr)}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Free Cash Flow</CardTitle>
        </CardHeader>
        <CardContent>
          {points.length > 0 ? (
            <FreeCashFlowChart data={points} />
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No annual free cash flow records available.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">FCF CAGR Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Start Year</TableHead>
                <TableHead className="text-right">Start FCF</TableHead>
                <TableHead>End Year</TableHead>
                <TableHead className="text-right">End FCF</TableHead>
                <TableHead className="text-right">Periods</TableHead>
                <TableHead className="text-right">CAGR</TableHead>
                <TableHead>Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cagrCalculations.map((calc) => (
                <TableRow key={calc.label}>
                  <TableCell className="font-medium">{calc.label}</TableCell>
                  <TableCell>{calc.startYear ?? '-'}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatMoney(calc.startValue)}
                  </TableCell>
                  <TableCell>{calc.endYear ?? '-'}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatMoney(calc.endValue)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {calc.periods ?? '-'}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {formatPercent(calc.cagr)}
                  </TableCell>
                  <TableCell className="max-w-xs text-sm text-muted-foreground">
                    {calc.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-3 text-xs text-muted-foreground">
            Formula: CAGR = (ending FCF / starting FCF)^(1 / number of years) - 1.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">FCF Forecast From Historical CAGR</CardTitle>
        </CardHeader>
        <CardContent>
          {forecastRows.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Forecast Year</TableHead>
                    <TableHead className="text-right">Years Forward</TableHead>
                    <TableHead className="text-right">Using 5Y CAGR</TableHead>
                    <TableHead className="text-right">Using 10Y CAGR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forecastRows.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell className="font-medium">{row.year}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.yearsForward}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.fiveYearProjection)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.tenYearProjection)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-3 text-xs text-muted-foreground">
                Forecast uses the latest reported FCF as the base and compounds it annually by the historical CAGR shown above. It is a simple projection, not analyst guidance.
              </p>
            </>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No forecast available because latest free cash flow is missing.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Annual Cash Flow Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Operating Cash Flow</TableHead>
                <TableHead className="text-right">Capital Expenditure</TableHead>
                <TableHead className="text-right">Free Cash Flow</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...(cashFlows as CashFlowRow[])]
                .sort((a, b) => (String(a.date) < String(b.date) ? 1 : -1))
                .map((row) => {
                  const year = fiscalYear(row)
                  const fcf = computeFreeCashFlow(row)
                  return (
                    <TableRow key={`${row.date}-${row.period}`}>
                      <TableCell className="font-medium">{year ?? '-'}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.operating_cash_flow)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.capital_expenditure)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(fcf)}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
