import { createServiceClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EtfFetcher } from './etf-fetcher'

function fmtNum(n: number | null | undefined, decimals = 2): string {
  if (n == null) return '—'
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function fmtPct(n: number | null | undefined): string {
  if (n == null) return '—'
  return `${Number(n).toFixed(2)}%`
}

function fmtBig(n: number | null | undefined): string {
  if (n == null) return '—'
  const v = Number(n)
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`
  return `$${v.toFixed(0)}`
}

export default async function EtfsPage() {
  const sb = createServiceClient()

  const { data: etfs } = await sb
    .from('fmp_etfs')
    .select(`
      *,
      fmp_etf_market_stats(as_of_date, market_price, aum, nav, expense_ratio_pct, avg_daily_volume_30d),
      fmp_etf_income_stats(as_of_date, dividend_yield_ttm_pct, ttm_distributions_per_share)
    `)
    .order('updated_at', { ascending: false })

  // Pull full market stats for the diagnostic table below.
  // Latest snapshot per ETF, joined to symbol for readability.
  const { data: marketStats } = await sb
    .from('fmp_etf_market_stats')
    .select('*, fmp_etfs(symbol, fund_name)')
    .order('as_of_date', { ascending: false })

  // Reduce to one row per etf_id (most recent)
  type MarketStatRow = Record<string, unknown> & { etf_id: string; fmp_etfs?: { symbol: string; fund_name: string } }
  type EtfStatSummary = {
    as_of_date: string
    market_price?: number | null
    aum?: number | null
    expense_ratio_pct?: number | null
  }
  type EtfIncomeSummary = {
    as_of_date: string
    dividend_yield_ttm_pct?: number | null
  }
  type EtfListRow = {
    id: string
    symbol: string
    fund_name: string
    asset_class: string
    updated_at: string
    fmp_etf_market_stats?: EtfStatSummary[]
    fmp_etf_income_stats?: EtfIncomeSummary[]
  }
  const latestByEtf = new Map<string, MarketStatRow>()
  for (const row of (marketStats ?? []) as MarketStatRow[]) {
    if (!latestByEtf.has(row.etf_id)) latestByEtf.set(row.etf_id, row)
  }
  const latestMarketStats = Array.from(latestByEtf.values())

  const marketColumns: Array<{ key: string; label: string; fmt: 'price' | 'big' | 'pct' | 'int' | 'num' }> = [
    { key: 'market_price', label: 'Market Price', fmt: 'price' },
    { key: 'nav', label: 'NAV', fmt: 'price' },
    { key: 'premium_discount_pct', label: 'Prem/Disc %', fmt: 'pct' },
    { key: 'aum', label: 'AUM', fmt: 'big' },
    { key: 'expense_ratio_pct', label: 'Expense %', fmt: 'pct' },
    { key: 'avg_daily_volume_30d', label: 'Avg Vol 30d', fmt: 'int' },
    { key: 'bid_ask_spread_bps', label: 'Spread (bps)', fmt: 'num' },
    { key: 'shares_outstanding', label: 'Shares Out', fmt: 'int' },
    { key: 'total_return_1y_pct', label: '1y Return', fmt: 'pct' },
    { key: 'total_return_3y_ann_pct', label: '3y Ann Return', fmt: 'pct' },
    { key: 'total_return_5y_ann_pct', label: '5y Ann Return', fmt: 'pct' },
    { key: 'tracking_difference_1y_pct', label: 'Tracking Diff 1y', fmt: 'pct' },
    { key: 'tracking_error_1y_pct', label: 'Tracking Err 1y', fmt: 'pct' },
    { key: 'nav_return_since_inception_pct', label: 'NAV Return Since Incep.', fmt: 'pct' },
  ]

  // Coverage per column = how many ETFs have a non-null value
  const coverage = marketColumns.map((col) => {
    const filled = latestMarketStats.filter((r) => r[col.key] != null).length
    const total = latestMarketStats.length
    return { ...col, filled, total, pct: total ? (filled / total) * 100 : 0 }
  })

  function renderCell(value: unknown, fmt: string) {
    if (value == null) return <span className="text-red-500/70">—</span>
    const n = Number(value)
    switch (fmt) {
      case 'price': return `$${fmtNum(n)}`
      case 'big': return fmtBig(n)
      case 'pct': return fmtPct(n)
      case 'int': return n.toLocaleString()
      default: return fmtNum(n)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">ETFs</h2>
        <p className="text-sm text-muted-foreground">
          Enter a ticker to fetch profile, market, income, and holdings data from FMP
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Fetch ETF</CardTitle>
        </CardHeader>
        <CardContent>
          <EtfFetcher />
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Asset Class</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>AUM</TableHead>
            <TableHead>Expense</TableHead>
            <TableHead>Yield</TableHead>
            <TableHead>Last Fetched</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {((etfs ?? []) as EtfListRow[]).map((etf) => {
            const market = (etf.fmp_etf_market_stats ?? []).sort(
              (a, b) => (a.as_of_date < b.as_of_date ? 1 : -1),
            )[0]
            const income = (etf.fmp_etf_income_stats ?? []).sort(
              (a, b) => (a.as_of_date < b.as_of_date ? 1 : -1),
            )[0]
            return (
              <TableRow key={etf.id}>
                <TableCell className="font-bold">{etf.symbol}</TableCell>
                <TableCell className="max-w-xs truncate">{etf.fund_name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{etf.asset_class}</Badge>
                </TableCell>
                <TableCell>{market ? `$${fmtNum(market.market_price)}` : '—'}</TableCell>
                <TableCell>{market ? fmtBig(market.aum) : '—'}</TableCell>
                <TableCell>{market ? fmtPct(market.expense_ratio_pct) : '—'}</TableCell>
                <TableCell>{income ? fmtPct(income.dividend_yield_ttm_pct) : '—'}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(etf.updated_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )
          })}
          {(!etfs || etfs.length === 0) && (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                No ETFs yet. Enter a ticker above to fetch one.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ============================================== */}
      {/* fmp_etf_market_stats — coverage diagnostic */}
      {/* ============================================== */}
      <div className="mt-10">
        <div className="mb-3">
          <h3 className="text-xl font-semibold tracking-tight">Market Stats Coverage</h3>
          <p className="text-sm text-muted-foreground">
            Data populated in <code className="text-xs bg-muted px-1 py-0.5 rounded">fmp_etf_market_stats</code>.
            Red dashes indicate fields FMP did not provide.
          </p>
        </div>

        {/* Coverage summary */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Field Coverage ({latestMarketStats.length} ETFs)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {coverage.map((c) => (
                <div key={c.key} className="flex items-center justify-between rounded-md border px-3 py-1.5">
                  <span className="text-muted-foreground">{c.label}</span>
                  <span
                    className={
                      c.pct === 0
                        ? 'text-red-600 font-medium'
                        : c.pct < 100
                          ? 'text-yellow-600 font-medium'
                          : 'text-green-600 font-medium'
                    }
                  >
                    {c.filled}/{c.total} ({c.pct.toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Per-ETF detail table */}
        {latestMarketStats.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-background">Symbol</TableHead>
                  <TableHead>As Of</TableHead>
                  {marketColumns.map((col) => (
                    <TableHead key={col.key} className="whitespace-nowrap">
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestMarketStats.map((row) => (
                  <TableRow key={row.etf_id}>
                    <TableCell className="font-bold sticky left-0 bg-background">
                      {row.fmp_etfs?.symbol ?? '—'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {row.as_of_date as string}
                    </TableCell>
                    {marketColumns.map((col) => (
                      <TableCell key={col.key} className="whitespace-nowrap">
                        {renderCell(row[col.key], col.fmt)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No market stats yet.</p>
        )}
      </div>
    </div>
  )
}
