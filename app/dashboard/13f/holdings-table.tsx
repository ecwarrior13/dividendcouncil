'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface HoldingRow {
  name_of_issuer: string | null
  title_of_class: string | null
  cusip: string
  ticker: string | null
  value: number | null
  shares: number | null
  share_type: string | null
  put_call: string | null
  is_option: boolean
}

const ROW_RENDER_CAP = 500

function fmtShares(n: number): string {
  return Math.round(n).toLocaleString()
}

function fmtUsd(n: number): string {
  if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

interface Position {
  cusip: string
  name: string
  ticker: string | null
  titleOfClass: string | null
  shares: number
  value: number
  shareType: string | null
  putCall: string | null
  isOption: boolean
  lines: number
}

type SortKey = 'name' | 'shares' | 'value' | 'weight'

export function HoldingsTable({ holdings }: { holdings: HoldingRow[] }) {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'all' | 'stock' | 'options'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('value')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  // Aggregate raw filing lines into positions, keyed by security.
  const positions = useMemo<Position[]>(() => {
    const map = new Map<string, Position>()
    for (const h of holdings) {
      const isOption = h.is_option || (h.put_call != null && h.put_call !== '')
      const key = `${h.cusip}|${h.put_call ?? ''}`
      let p = map.get(key)
      if (!p) {
        p = {
          cusip: h.cusip,
          name: h.name_of_issuer ?? h.cusip,
          ticker: h.ticker,
          titleOfClass: h.title_of_class,
          shares: 0,
          value: 0,
          shareType: h.share_type,
          putCall: h.put_call,
          isOption,
          lines: 0,
        }
        map.set(key, p)
      }
      p.shares += Number(h.shares ?? 0)
      p.value += Number(h.value ?? 0)
      p.lines += 1
      if (!p.ticker && h.ticker) p.ticker = h.ticker
    }
    return Array.from(map.values())
  }, [holdings])

  const totalValue = useMemo(
    () => positions.reduce((s, p) => s + p.value, 0),
    [positions],
  )

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = positions.filter((p) => {
      if (view === 'stock' && p.isOption) return false
      if (view === 'options' && !p.isOption) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.cusip.toLowerCase().includes(q) ||
        (p.ticker?.toLowerCase().includes(q) ?? false)
      )
    })
    list = [...list].sort((a, b) => {
      let cmp = 0
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name)
      else if (sortKey === 'shares') cmp = a.shares - b.shares
      else cmp = a.value - b.value // value & weight share the same ordering
      return sortDir === 'asc' ? cmp : -cmp
    })
    return list
  }, [positions, query, view, sortKey, sortDir])

  const shown = rows.slice(0, ROW_RENDER_CAP)

  function sortBy(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'name' ? 'asc' : 'desc')
    }
  }

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''

  const views: Array<{ key: 'all' | 'stock' | 'options'; label: string }> = [
    { key: 'all', label: `All (${positions.length})` },
    { key: 'stock', label: `Stock (${positions.filter((p) => !p.isOption).length})` },
    { key: 'options', label: `Options (${positions.filter((p) => p.isOption).length})` },
  ]

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search issuer, ticker or CUSIP..."
          className="rounded-md border px-3 py-1.5 text-sm w-72"
        />
        <div className="flex gap-1">
          {views.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setView(v.key)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                view === v.key
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          {rows.length} positions · {fmtUsd(totalValue)} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="sticky left-0 bg-background min-w-[220px] cursor-pointer select-none"
                onClick={() => sortBy('name')}
              >
                Issuer{arrow('name')}
              </TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>CUSIP</TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => sortBy('shares')}
              >
                Shares / Prn{arrow('shares')}
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => sortBy('value')}
              >
                Value{arrow('value')}
              </TableHead>
              <TableHead
                className="text-right cursor-pointer select-none"
                onClick={() => sortBy('weight')}
              >
                Weight{arrow('weight')}
              </TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.map((p) => (
              <TableRow key={`${p.cusip}-${p.putCall ?? ''}`}>
                <TableCell className="sticky left-0 bg-background font-medium max-w-[280px] truncate">
                  {p.name}
                  {p.lines > 1 && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({p.lines} lines)
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.ticker ?? '—'}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[140px] truncate">
                  {p.titleOfClass ?? '—'}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {p.cusip}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {fmtShares(p.shares)}
                </TableCell>
                <TableCell className="text-right text-sm">{fmtUsd(p.value)}</TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {totalValue > 0 ? `${((p.value / totalValue) * 100).toFixed(2)}%` : '—'}
                </TableCell>
                <TableCell>
                  {p.isOption ? (
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-700 border-amber-200"
                    >
                      {p.putCall ?? 'Option'}
                    </Badge>
                  ) : (
                    <Badge variant="outline">{p.shareType ?? 'SH'}</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {shown.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No positions match.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {rows.length > ROW_RENDER_CAP && (
        <p className="text-xs text-muted-foreground">
          Showing top {ROW_RENDER_CAP} of {rows.length} positions. Narrow with search.
        </p>
      )}
    </div>
  )
}
