import { Fragment } from 'react'
import Link from 'next/link'
import { Activity, PauseCircle, Pencil, PlayCircle, RefreshCcw, Save, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/native-select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
  EmaWatchlistItemWithLatest,
  EmaWatchlistSetupError,
  getEmaWatchlistItems,
} from '@/lib/supabase/atlas/ema-watchlist'
import {
  addEmaWatchlistItemAction,
  deleteEmaWatchlistItemAction,
  refreshActiveEmaWatchlistAction,
  refreshEmaWatchlistItemAction,
  setEmaWatchlistActiveAction,
  updateEmaWatchlistItemAction,
} from './actions'

type WatchlistFilter = 'all' | 'inside' | 'approaching' | 'extended' | 'inactive'
type WatchlistSort = 'priority' | 'nearest' | 'symbol' | 'updated'

const FILTERS: Array<{ key: WatchlistFilter; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'inside', label: 'Inside buy zone' },
  { key: 'approaching', label: 'Approaching' },
  { key: 'extended', label: 'Extended' },
  { key: 'inactive', label: 'Inactive' },
]

function fmtMoney(value: number | null | undefined): string {
  if (value == null) return '-'
  return `$${Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function fmtPct(value: number | null | undefined): string {
  if (value == null) return '-'
  const sign = value > 0 ? '+' : ''
  return `${sign}${Number(value).toFixed(2)}%`
}

function fmtDate(value: string | null | undefined): string {
  if (!value) return '-'
  return new Date(`${value}T00:00:00`).toLocaleDateString()
}

function statusVariant(status: string | undefined): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (status === 'Inside buy zone') return 'default'
  if (status?.startsWith('Approaching')) return 'secondary'
  if (status === 'Below selected level') return 'destructive'
  return 'outline'
}

function buyModeLabel(mode: string): string {
  switch (mode) {
    case '62_ema':
      return '62 EMA'
    case '79_ema':
      return '79 EMA'
    case '200_sma':
      return '200 SMA'
    default:
      return 'Any'
  }
}

function normalizeFilter(value: string | undefined): WatchlistFilter {
  return FILTERS.some((filter) => filter.key === value) ? value as WatchlistFilter : 'all'
}

function normalizeSort(value: string | undefined): WatchlistSort {
  return value === 'nearest' || value === 'symbol' || value === 'updated' ? value : 'priority'
}

function itemStatus(item: EmaWatchlistItemWithLatest): string {
  return item.latest?.status ?? 'Needs refresh'
}

function filterItems(items: EmaWatchlistItemWithLatest[], filter: WatchlistFilter) {
  return items.filter((item) => {
    const status = itemStatus(item)
    if (filter === 'inactive') return !item.is_active
    if (!item.is_active) return false
    if (filter === 'inside') return status === 'Inside buy zone'
    if (filter === 'approaching') return status.startsWith('Approaching')
    if (filter === 'extended') return status === 'Extended'
    return true
  })
}

function priorityRank(item: EmaWatchlistItemWithLatest): number {
  if (!item.is_active) return 5
  const status = itemStatus(item)
  if (status === 'Inside buy zone') return 0
  if (status.startsWith('Approaching')) return 1
  if (status === 'Extended') return 2
  if (status === 'Below selected level') return 3
  return 4
}

function sortItems(items: EmaWatchlistItemWithLatest[], sort: WatchlistSort) {
  return [...items].sort((a, b) => {
    if (sort === 'symbol') return a.symbol.localeCompare(b.symbol)
    if (sort === 'updated') {
      const at = a.latest?.computed_at ? new Date(a.latest.computed_at).getTime() : 0
      const bt = b.latest?.computed_at ? new Date(b.latest.computed_at).getTime() : 0
      return bt - at || a.symbol.localeCompare(b.symbol)
    }

    const an = a.latest?.nearest_distance_pct == null ? Number.POSITIVE_INFINITY : Math.abs(a.latest.nearest_distance_pct)
    const bn = b.latest?.nearest_distance_pct == null ? Number.POSITIVE_INFINITY : Math.abs(b.latest.nearest_distance_pct)
    if (sort === 'nearest') return an - bn || a.symbol.localeCompare(b.symbol)

    return priorityRank(a) - priorityRank(b) || an - bn || a.symbol.localeCompare(b.symbol)
  })
}

function tabHref(filter: WatchlistFilter, sort: WatchlistSort): string {
  const params = new URLSearchParams()
  if (filter !== 'all') params.set('filter', filter)
  if (sort !== 'priority') params.set('sort', sort)
  const query = params.toString()
  return query ? `/dashboard/ema-watchlist?${query}` : '/dashboard/ema-watchlist'
}

function SetupRequired({ message }: { message: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">EMA Watchlist</h2>
        <p className="text-sm text-muted-foreground">
          Daily technical setup tracker for watched stocks and ETFs.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Supabase setup required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>{message}</p>
          <p className="text-muted-foreground">
            Run <code className="rounded bg-muted px-1 py-0.5">config/database/schema/v012-ema-watchlist.sql</code>{' '}
            in the Supabase SQL editor, then reload this page.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function AddTickerCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add ticker</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={addEmaWatchlistItemAction} className="grid gap-3 md:grid-cols-[120px_140px_120px_120px_1fr_auto]">
          <div className="space-y-1">
            <Label htmlFor="symbol">Symbol</Label>
            <Input id="symbol" name="symbol" required placeholder="MSFT" className="uppercase" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="buy_mode">Buy mode</Label>
            <NativeSelect id="buy_mode" name="buy_mode" className="w-full">
              <option value="any">Any level</option>
              <option value="62_ema">62 EMA</option>
              <option value="79_ema">79 EMA</option>
              <option value="200_sma">200 SMA</option>
            </NativeSelect>
          </div>
          <div className="space-y-1">
            <Label htmlFor="alert_threshold_pct">Buy zone %</Label>
            <Input id="alert_threshold_pct" name="alert_threshold_pct" type="number" min="0" step="0.25" defaultValue="3" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="approaching_threshold_pct">Approach %</Label>
            <Input id="approaching_threshold_pct" name="approaching_threshold_pct" type="number" min="0" step="0.25" defaultValue="8" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" name="notes" placeholder="Thesis or tracking reason" />
          </div>
          <div className="flex items-end">
            <Button type="submit">
              <Activity />
              Add
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function FilterTabs({
  activeFilter,
  sort,
  counts,
}: {
  activeFilter: WatchlistFilter
  sort: WatchlistSort
  counts: Record<WatchlistFilter, number>
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <Button
          key={filter.key}
          asChild
          variant={activeFilter === filter.key ? 'default' : 'outline'}
          size="sm"
        >
          <Link href={tabHref(filter.key, sort)}>
            {filter.label}
            <span className="ml-1 text-xs opacity-70">{counts[filter.key]}</span>
          </Link>
        </Button>
      ))}
    </div>
  )
}

function SortControls({ filter, sort }: { filter: WatchlistFilter; sort: WatchlistSort }) {
  return (
    <form className="flex items-center gap-2" action="/dashboard/ema-watchlist">
      {filter !== 'all' && <input type="hidden" name="filter" value={filter} />}
      <Label htmlFor="sort" className="text-muted-foreground">Sort</Label>
      <NativeSelect id="sort" name="sort" defaultValue={sort}>
        <option value="priority">Morning priority</option>
        <option value="nearest">Nearest level</option>
        <option value="symbol">Symbol</option>
        <option value="updated">Last refreshed</option>
      </NativeSelect>
      <Button type="submit" variant="outline" size="sm">Apply</Button>
    </form>
  )
}

function EditPanel({ item }: { item: EmaWatchlistItemWithLatest }) {
  return (
    <details id={`edit-${item.id}`} className="rounded-md border bg-muted/20 p-3">
      <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium">
        <Pencil className="size-4" />
        Edit {item.symbol}
      </summary>
      <form action={updateEmaWatchlistItemAction} className="mt-3 grid gap-3 md:grid-cols-[120px_140px_120px_120px_120px_1fr_auto]">
        <input type="hidden" name="id" value={item.id} />
        <div className="space-y-1">
          <Label htmlFor={`active-${item.id}`}>Active</Label>
          <label className="flex h-8 items-center gap-2 text-sm">
            <input id={`active-${item.id}`} type="checkbox" name="is_active" defaultChecked={item.is_active} />
            Track
          </label>
        </div>
        <div className="space-y-1">
          <Label htmlFor={`buy-mode-${item.id}`}>Buy mode</Label>
          <NativeSelect id={`buy-mode-${item.id}`} name="buy_mode" defaultValue={item.buy_mode} className="w-full">
            <option value="any">Any level</option>
            <option value="62_ema">62 EMA</option>
            <option value="79_ema">79 EMA</option>
            <option value="200_sma">200 SMA</option>
          </NativeSelect>
        </div>
        <div className="space-y-1">
          <Label htmlFor={`alert-${item.id}`}>Buy zone %</Label>
          <Input id={`alert-${item.id}`} name="alert_threshold_pct" type="number" min="0" step="0.25" defaultValue={item.alert_threshold_pct} />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`approach-${item.id}`}>Approach %</Label>
          <Input id={`approach-${item.id}`} name="approaching_threshold_pct" type="number" min="0" step="0.25" defaultValue={item.approaching_threshold_pct} />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`sort-order-${item.id}`}>Sort</Label>
          <Input id={`sort-order-${item.id}`} name="sort_order" type="number" step="1" defaultValue={item.sort_order} />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`notes-${item.id}`}>Notes</Label>
          <Textarea id={`notes-${item.id}`} name="notes" defaultValue={item.notes ?? ''} />
        </div>
        <div className="flex items-end">
          <Button type="submit" variant="outline">
            <Save />
            Save
          </Button>
        </div>
      </form>
    </details>
  )
}

function WatchlistTable({ items }: { items: EmaWatchlistItemWithLatest[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>62 EMA</TableHead>
            <TableHead>Dist.</TableHead>
            <TableHead>79 EMA</TableHead>
            <TableHead>Dist.</TableHead>
            <TableHead>200 SMA</TableHead>
            <TableHead>Dist.</TableHead>
            <TableHead>Nearest</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const latest = item.latest
            return (
              <Fragment key={item.id}>
                <TableRow className={!item.is_active ? 'opacity-60' : undefined}>
                  <TableCell className="min-w-52 align-top">
                    <div className="font-bold">
                      <Link href={`/dashboard/stocks/${item.symbol}`} className="hover:underline">
                        {item.symbol}
                      </Link>
                    </div>
                    <div className="max-w-52 truncate text-xs text-muted-foreground">
                      {latest?.company_name ?? '-'}
                    </div>
                    {!item.is_active && (
                      <Badge variant="outline" className="mt-1">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge variant={statusVariant(latest?.status)}>{latest?.status ?? 'Needs refresh'}</Badge>
                  </TableCell>
                  <TableCell className="align-top font-medium">{fmtMoney(latest?.latest_price)}</TableCell>
                  <TableCell className="align-top text-sm text-muted-foreground">{fmtDate(latest?.latest_date)}</TableCell>
                  <TableCell className="align-top">{fmtMoney(latest?.ema_62)}</TableCell>
                  <TableCell className="align-top">{fmtPct(latest?.pct_to_62_ema)}</TableCell>
                  <TableCell className="align-top">{fmtMoney(latest?.ema_79)}</TableCell>
                  <TableCell className="align-top">{fmtPct(latest?.pct_to_79_ema)}</TableCell>
                  <TableCell className="align-top">{fmtMoney(latest?.sma_200)}</TableCell>
                  <TableCell className="align-top">{fmtPct(latest?.pct_to_200_sma)}</TableCell>
                  <TableCell className="align-top">
                    <div>{latest?.nearest_level ?? '-'}</div>
                    <div className="text-xs text-muted-foreground">{fmtPct(latest?.nearest_distance_pct)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {buyModeLabel(item.buy_mode)} target
                    </div>
                  </TableCell>
                  <TableCell className="max-w-64 align-top text-sm text-muted-foreground">
                    <div className="truncate">{item.notes ?? '-'}</div>
                    <div className="mt-1 text-xs">
                      {Number(item.alert_threshold_pct).toFixed(1)}% buy zone / {Number(item.approaching_threshold_pct).toFixed(1)}% approach
                    </div>
                  </TableCell>
                  <TableCell className="min-w-40 align-top">
                    <div className="flex items-center justify-end gap-2">
                      <form action={refreshEmaWatchlistItemAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <Button type="submit" variant="outline" size="icon-sm" title="Refresh">
                          <RefreshCcw />
                          <span className="sr-only">Refresh</span>
                        </Button>
                      </form>
                      <form action={setEmaWatchlistActiveAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="is_active" value={item.is_active ? 'false' : 'true'} />
                        <Button type="submit" variant="outline" size="icon-sm" title={item.is_active ? 'Deactivate' : 'Activate'}>
                          {item.is_active ? <PauseCircle /> : <PlayCircle />}
                          <span className="sr-only">{item.is_active ? 'Deactivate' : 'Activate'}</span>
                        </Button>
                      </form>
                      <form action={deleteEmaWatchlistItemAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <Button type="submit" variant="destructive" size="icon-sm" title="Delete">
                          <Trash2 />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={13} className="bg-muted/10 py-2">
                    <EditPanel item={item} />
                  </TableCell>
                </TableRow>
              </Fragment>
            )
          })}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={13} className="py-8 text-center text-muted-foreground">
                No watchlist items match this filter.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default async function EmaWatchlistPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; sort?: string }>
}) {
  const { filter: rawFilter, sort: rawSort } = await searchParams
  const activeFilter = normalizeFilter(rawFilter)
  const sort = normalizeSort(rawSort)

  let allItems: EmaWatchlistItemWithLatest[]
  try {
    allItems = await getEmaWatchlistItems({ includeInactive: true })
  } catch (err) {
    if (err instanceof EmaWatchlistSetupError) return <SetupRequired message={err.message} />
    throw err
  }

  const counts: Record<WatchlistFilter, number> = {
    all: filterItems(allItems, 'all').length,
    inside: filterItems(allItems, 'inside').length,
    approaching: filterItems(allItems, 'approaching').length,
    extended: filterItems(allItems, 'extended').length,
    inactive: filterItems(allItems, 'inactive').length,
  }
  const visibleItems = sortItems(filterItems(allItems, activeFilter), sort)
  const refreshedCount = allItems.filter((item) => item.latest).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">EMA Watchlist</h2>
          <p className="text-sm text-muted-foreground">
            Morning scan for watched stocks and ETFs using FMP daily data.
          </p>
        </div>
        <form action={refreshActiveEmaWatchlistAction}>
          <Button type="submit">
            <RefreshCcw />
            Refresh active
          </Button>
        </form>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{counts.all}</CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Buy zone</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{counts.inside}</CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>With snapshots</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{refreshedCount}</CardContent>
        </Card>
      </div>

      <AddTickerCard />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <FilterTabs activeFilter={activeFilter} sort={sort} counts={counts} />
        <SortControls filter={activeFilter} sort={sort} />
      </div>

      <WatchlistTable items={visibleItems} />
    </div>
  )
}
