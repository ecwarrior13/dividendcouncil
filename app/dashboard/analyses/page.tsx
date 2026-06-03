import Link from 'next/link'
import { BarChart3, Ellipsis, Eye, Play, RefreshCw } from 'lucide-react'
import { createServiceClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { launchDebateForTicker, refreshStockDataForTicker } from './actions'

function scoreColor(score: number | null): string {
  if (score === null) return 'text-muted-foreground'
  if (score >= 75) return 'text-green-600'
  if (score >= 55) return 'text-yellow-600'
  return 'text-red-600'
}

const profileVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'premium fit': 'default',
  'defensive compounder': 'default',
  'safety focus': 'default',
  'growth focus': 'secondary',
  'moderate fit': 'secondary',
  'speculative grower': 'outline',
  'caution': 'outline',
  'weak fit': 'destructive',
}

const fitColor: Record<string, string> = {
  high: 'text-green-600',
  moderate: 'text-yellow-600',
  low: 'text-red-600',
}

interface StockAnalysisRow {
  id: string
  ticker: string
  status: string | null
  created_at: string
  aiden_score: number | null
  lexa_score: number | null
  safety_fit: string | null
  growth_fit: string | null
  stock_profile: string | null
}

interface TickerRow {
  symbol: string
  name: string | null
  sector: string | null
  industry: string | null
  source: 'fmp' | 'alpha' | 'both'
  latestAnalysis: StockAnalysisRow | null
}

export default async function AnalysesPage() {
  const sb = createServiceClient()

  const [{ data: fmpProfiles }, { data: alphaProfiles }, { data: analyses }] = await Promise.all([
    sb.from('fmp_company_profile').select('symbol, company_name, sector, industry'),
    sb.from('alph_stock_metadata').select('symbol, name, sector, industry'),
    sb.from('dn_stock_analyses').select('*').order('created_at', { ascending: false }),
  ])

  const tickerMap = new Map<string, TickerRow>()
  for (const p of fmpProfiles ?? []) {
    tickerMap.set(p.symbol, {
      symbol: p.symbol,
      name: p.company_name,
      sector: p.sector,
      industry: p.industry,
      source: 'fmp',
      latestAnalysis: null,
    })
  }
  for (const p of alphaProfiles ?? []) {
    const existing = tickerMap.get(p.symbol)
    if (existing) {
      existing.source = 'both'
      existing.name = existing.name ?? p.name
      existing.sector = existing.sector ?? p.sector
      existing.industry = existing.industry ?? p.industry
    } else {
      tickerMap.set(p.symbol, {
        symbol: p.symbol,
        name: p.name,
        sector: p.sector,
        industry: p.industry,
        source: 'alpha',
        latestAnalysis: null,
      })
    }
  }

  const latestByTicker = new Map<string, StockAnalysisRow>()
  for (const a of (analyses ?? []) as StockAnalysisRow[]) {
    if (!latestByTicker.has(a.ticker)) latestByTicker.set(a.ticker, a)
  }
  for (const [symbol, row] of tickerMap) {
    row.latestAnalysis = latestByTicker.get(symbol) ?? null
  }
  for (const [ticker, a] of latestByTicker) {
    if (!tickerMap.has(ticker)) {
      tickerMap.set(ticker, {
        symbol: ticker,
        name: null,
        sector: null,
        industry: null,
        source: 'fmp',
        latestAnalysis: a,
      })
    }
  }

  const rows = Array.from(tickerMap.values()).sort((a, b) => a.symbol.localeCompare(b.symbol))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Stock Analyses</h2>
          <p className="text-sm text-muted-foreground">
            Tickers with available data. Run an Aiden vs. Lexa debate per ticker.
          </p>
        </div>
        <Link href="/dashboard/analyses/new">
          <Button>+ New Ticker</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Safety</TableHead>
            <TableHead>Growth</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead>Last Debate</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const a = row.latestAnalysis
            return (
              <TableRow key={row.symbol}>
                <TableCell className="font-bold">
                  <Link href={`/dashboard/stocks/${row.symbol}`} className="hover:underline">
                    {row.symbol}
                  </Link>
                </TableCell>
                <TableCell className="max-w-xs truncate text-sm">{row.name ?? '—'}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {row.sector ?? '—'}
                </TableCell>
                <TableCell>
                  {a ? (
                    <>
                      <span className={`font-medium ${scoreColor(a.aiden_score)}`}>
                        {a.aiden_score ?? '—'}
                      </span>
                      {a.safety_fit && (
                        <span className={`ml-1 text-xs ${fitColor[a.safety_fit] ?? ''}`}>
                          ({a.safety_fit})
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {a ? (
                    <>
                      <span className={`font-medium ${scoreColor(a.lexa_score)}`}>
                        {a.lexa_score ?? '—'}
                      </span>
                      {a.growth_fit && (
                        <span className={`ml-1 text-xs ${fitColor[a.growth_fit] ?? ''}`}>
                          ({a.growth_fit})
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {a?.stock_profile ? (
                    <Badge variant={profileVariant[a.stock_profile] ?? 'outline'}>
                      {a.stock_profile}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {a ? (
                    <div className="flex items-center gap-2">
                      <span>{new Date(a.created_at).toLocaleDateString()}</span>
                      <Badge
                        variant={
                          a.status === 'complete'
                            ? 'secondary'
                            : a.status === 'failed'
                              ? 'destructive'
                              : 'default'
                        }
                      >
                        {a.status}
                      </Badge>
                    </div>
                  ) : (
                    <span className="italic">never</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Open actions for ${row.symbol}`}
                      >
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel>{row.symbol}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <form action={refreshStockDataForTicker}>
                        <input type="hidden" name="ticker" value={row.symbol} />
                        <DropdownMenuItem asChild>
                          <button type="submit" className="w-full">
                            <RefreshCw />
                            Refresh stock
                          </button>
                        </DropdownMenuItem>
                      </form>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/stocks/${row.symbol}/free-cash-flow`}>
                          <BarChart3 />
                          FCF
                        </Link>
                      </DropdownMenuItem>
                      {a && (
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/analyses/${a.id}`}>
                            <Eye />
                            View
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {a?.status !== 'running' && (
                        <form action={launchDebateForTicker}>
                          <input type="hidden" name="ticker" value={row.symbol} />
                          <DropdownMenuItem asChild>
                            <button type="submit" className="w-full">
                              <Play />
                              {a ? 'Re-run debate' : 'Run debate'}
                            </button>
                          </DropdownMenuItem>
                        </form>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                No tickers yet.{' '}
                <Link href="/dashboard/analyses/new" className="text-primary underline">
                  Add a ticker
                </Link>
                .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
