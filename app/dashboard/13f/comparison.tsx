'use client'

import { useMemo, useState, useTransition } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  compareFilingsAction,
  type ChangeClass,
  type ComparisonResult,
  type ComparisonRow,
} from './actions'

export interface FilingOption {
  id: string
  reportQuarter: string
  reportPeriod: string
  formType: string
  totalValue: number | null
  totalHoldings: number | null
}

export interface ManagerOption {
  id: string
  cik: string
  managerName: string
  filings: FilingOption[]
}

const MAX_SELECT = 4
const ROW_RENDER_CAP = 250

function fmtShares(n: number): string {
  return Math.round(n).toLocaleString()
}

function fmtUsd(n: number | null | undefined): string {
  if (n == null) return '—'
  const v = Number(n)
  if (Math.abs(v) >= 1e9) return `$${(v / 1e9).toFixed(2)}B`
  if (Math.abs(v) >= 1e6) return `$${(v / 1e6).toFixed(2)}M`
  if (Math.abs(v) >= 1e3) return `$${(v / 1e3).toFixed(1)}K`
  return `$${v.toFixed(0)}`
}

const changeStyle: Record<ChangeClass, { label: string; cls: string }> = {
  new: { label: 'New', cls: 'bg-green-100 text-green-700 border-green-200' },
  exited: { label: 'Exited', cls: 'bg-red-100 text-red-700 border-red-200' },
  increased: { label: 'Increased', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  decreased: { label: 'Decreased', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
  unchanged: { label: 'Unchanged', cls: 'bg-muted text-muted-foreground' },
}

const FILTERS: Array<{ key: 'all' | ChangeClass; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'increased', label: 'Increased' },
  { key: 'decreased', label: 'Decreased' },
  { key: 'exited', label: 'Exited' },
  { key: 'unchanged', label: 'Unchanged' },
]

export function Comparison({ managers }: { managers: ManagerOption[] }) {
  const [managerId, setManagerId] = useState<string>(managers[0]?.id ?? '')
  const [selected, setSelected] = useState<string[]>([])
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const [filter, setFilter] = useState<'all' | ChangeClass>('all')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const manager = managers.find((m) => m.id === managerId)
  const filings = useMemo(
    () =>
      [...(manager?.filings ?? [])].sort((a, b) =>
        a.reportPeriod < b.reportPeriod ? 1 : -1,
      ),
    [manager],
  )

  function switchManager(id: string) {
    setManagerId(id)
    setSelected([])
    setResult(null)
    setError(null)
  }

  function toggleFiling(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_SELECT) return prev
      return [...prev, id]
    })
  }

  function runCompare() {
    setError(null)
    startTransition(async () => {
      const res = await compareFilingsAction(selected)
      if (!res.success) {
        setError(res.message ?? 'Comparison failed')
        setResult(null)
      } else {
        setResult(res)
        setFilter('all')
      }
    })
  }

  if (managers.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Fetch a manager above to start comparing filings.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {/* Manager + filing selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select filings to compare</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Manager</label>
            <select
              value={managerId}
              onChange={(e) => switchManager(e.target.value)}
              className="rounded-md border px-3 py-1.5 text-sm"
            >
              {managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.managerName} (CIK {m.cik})
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Pick 2–{MAX_SELECT} quarters ({selected.length} selected)
            </p>
            <div className="flex flex-wrap gap-2">
              {filings.map((f) => {
                const isSel = selected.includes(f.id)
                const atCap = selected.length >= MAX_SELECT && !isSel
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFiling(f.id)}
                    disabled={atCap}
                    className={`rounded-md border px-3 py-1.5 text-left text-xs transition-colors ${
                      isSel
                        ? 'border-primary bg-primary/10'
                        : atCap
                          ? 'opacity-40'
                          : 'hover:bg-muted'
                    }`}
                  >
                    <div className="font-semibold">
                      {f.reportQuarter}
                      {f.formType.endsWith('/A') && (
                        <span className="ml-1 text-amber-600">/A</span>
                      )}
                    </div>
                    <div className="text-muted-foreground">
                      {fmtUsd(f.totalValue)} · {f.totalHoldings ?? '—'} pos.
                    </div>
                  </button>
                )
              })}
              {filings.length === 0 && (
                <span className="text-sm text-muted-foreground">
                  No filings stored for this manager.
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={runCompare}
              disabled={isPending || selected.length < 2}
            >
              {isPending ? 'Comparing...' : 'Compare filings'}
            </Button>
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </CardContent>
      </Card>

      {result && <ComparisonView result={result} filter={filter} setFilter={setFilter} />}
    </div>
  )
}

function ComparisonView({
  result,
  filter,
  setFilter,
}: {
  result: ComparisonResult
  filter: 'all' | ChangeClass
  setFilter: (f: 'all' | ChangeClass) => void
}) {
  const { filings, stockRows, optionRows, summary } = result

  const filtered =
    filter === 'all' ? stockRows : stockRows.filter((r) => r.changeClass === filter)
  const shown = filtered.slice(0, ROW_RENDER_CAP)

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {(['new', 'increased', 'decreased', 'exited', 'unchanged'] as ChangeClass[]).map(
          (k) => (
            <div
              key={k}
              className={`rounded-md border px-3 py-2 ${changeStyle[k].cls}`}
            >
              <div className="text-xl font-semibold">{summary[k]}</div>
              <div className="text-xs">{changeStyle[k].label}</div>
            </div>
          ),
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Change classified between the earliest ({filings[0]?.reportQuarter}) and latest
        ({filings[filings.length - 1]?.reportQuarter}) selected filing. Common-stock
        positions only.
      </p>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              filter === f.key ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stock holdings comparison */}
      <HoldingsTable filings={filings} rows={shown} />
      {filtered.length > ROW_RENDER_CAP && (
        <p className="text-xs text-muted-foreground">
          Showing top {ROW_RENDER_CAP} of {filtered.length} positions by latest value.
        </p>
      )}

      {/* Options section */}
      {optionRows.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold tracking-tight mb-1">
            Derivative positions
          </h3>
          <p className="text-xs text-muted-foreground mb-2">
            PUT / CALL entries reported in the 13F. Tracked separately — excluded from
            the common-stock comparison above.
          </p>
          <HoldingsTable filings={filings} rows={optionRows} />
        </div>
      )}
    </div>
  )
}

function HoldingsTable({
  filings,
  rows,
}: {
  filings: ComparisonResult['filings']
  rows: ComparisonRow[]
}) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        No positions match this filter.
      </p>
    )
  }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-background min-w-[220px]">
              Issuer
            </TableHead>
            <TableHead>Ticker</TableHead>
            {filings.map((f) => (
              <TableHead key={f.id} className="text-right whitespace-nowrap">
                {f.reportQuarter}
              </TableHead>
            ))}
            <TableHead className="text-right">Δ Shares</TableHead>
            <TableHead>Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={`${row.cusip}-${row.name}`}>
              <TableCell className="sticky left-0 bg-background font-medium max-w-[260px] truncate">
                {row.name}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {row.ticker ?? '—'}
              </TableCell>
              {row.cells.map((cell, i) => {
                const prev = i > 0 ? row.cells[i - 1] : null
                let tone = ''
                if (cell && prev) {
                  if (cell.shares > prev.shares) tone = 'text-emerald-600'
                  else if (cell.shares < prev.shares) tone = 'text-amber-600'
                } else if (cell && !prev && i > 0) {
                  tone = 'text-green-600'
                }
                return (
                  <TableCell key={i} className="text-right whitespace-nowrap">
                    {cell ? (
                      <div className={tone}>
                        <div className="text-sm">{fmtShares(cell.shares)}</div>
                        <div className="text-xs text-muted-foreground">
                          {fmtUsd(cell.value)}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                )
              })}
              <TableCell className="text-right text-sm whitespace-nowrap">
                {row.sharesDeltaPct == null ? (
                  '—'
                ) : (
                  <span
                    className={
                      row.sharesDeltaPct > 0
                        ? 'text-emerald-600'
                        : row.sharesDeltaPct < 0
                          ? 'text-amber-600'
                          : 'text-muted-foreground'
                    }
                  >
                    {row.sharesDeltaPct > 0 ? '+' : ''}
                    {row.sharesDeltaPct.toFixed(1)}%
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={changeStyle[row.changeClass].cls}>
                  {changeStyle[row.changeClass].label}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
