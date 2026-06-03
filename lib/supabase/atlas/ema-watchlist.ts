import { createServiceClient } from '../client'

export type EmaBuyMode = 'any' | '62_ema' | '79_ema' | '200_sma'

export type EmaWatchlistStatus =
  | 'Extended'
  | 'Approaching 62 EMA'
  | 'Approaching 79 EMA'
  | 'Approaching 200 SMA'
  | 'Inside buy zone'
  | 'Below selected level'
  | 'Needs refresh'

export interface EmaWatchlistItemRow {
  id: string
  symbol: string
  notes: string | null
  buy_mode: EmaBuyMode
  alert_threshold_pct: number
  approaching_threshold_pct: number
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface EmaWatchlistLatestRow {
  watchlist_item_id: string
  symbol: string
  company_name: string | null
  latest_price: number | null
  latest_date: string | null
  ema_62: number | null
  ema_79: number | null
  sma_200: number | null
  pct_to_62_ema: number | null
  pct_to_79_ema: number | null
  pct_to_200_sma: number | null
  nearest_level: string | null
  nearest_level_price: number | null
  nearest_distance_pct: number | null
  status: EmaWatchlistStatus
  raw_source: string
  computed_at: string
}

export interface EmaWatchlistSnapshotInsert {
  watchlist_item_id: string
  symbol: string
  as_of_date: string
  latest_price: number | null
  ema_62: number | null
  ema_79: number | null
  sma_200: number | null
  pct_to_62_ema: number | null
  pct_to_79_ema: number | null
  pct_to_200_sma: number | null
  nearest_level: string | null
  nearest_level_price: number | null
  nearest_distance_pct: number | null
  buy_mode: EmaBuyMode
  alert_threshold_pct: number
  approaching_threshold_pct: number
  status: EmaWatchlistStatus
  raw_source?: string
  computed_at?: string
}

export interface EmaWatchlistItemWithLatest extends EmaWatchlistItemRow {
  latest: EmaWatchlistLatestRow | null
}

export class EmaWatchlistSetupError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmaWatchlistSetupError'
  }
}

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  return (
    error?.code === '42P01' ||
    Boolean(error?.message?.toLowerCase().includes('ema_watchlist'))
  )
}

function normalizeSymbol(symbol: string): string {
  return symbol.trim().toUpperCase()
}

function asNumber(value: unknown, fallback: number): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export async function getEmaWatchlistItems(options: { includeInactive?: boolean } = {}) {
  const sb = createServiceClient()

  let query = sb
    .from('ema_watchlist_items')
    .select('*')
    .order('is_active', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('symbol', { ascending: true })

  if (!options.includeInactive) query = query.eq('is_active', true)

  const { data: itemData, error: itemError } = await query
  if (itemError) {
    if (isMissingTableError(itemError)) {
      throw new EmaWatchlistSetupError(
        'EMA watchlist tables are not installed. Run config/database/schema/v012-ema-watchlist.sql in Supabase.',
      )
    }
    throw itemError
  }

  const items = (itemData ?? []) as EmaWatchlistItemRow[]
  if (items.length === 0) return []

  const { data: latestData, error: latestError } = await sb
    .from('ema_watchlist_latest')
    .select('*')
    .in('watchlist_item_id', items.map((item) => item.id))

  if (latestError) {
    if (isMissingTableError(latestError)) {
      throw new EmaWatchlistSetupError(
        'EMA watchlist latest table is not installed. Run config/database/schema/v012-ema-watchlist.sql in Supabase.',
      )
    }
    throw latestError
  }

  const latestByItem = new Map(
    ((latestData ?? []) as EmaWatchlistLatestRow[]).map((row) => [
      row.watchlist_item_id,
      row,
    ]),
  )

  return items.map((item) => ({
    ...item,
    latest: latestByItem.get(item.id) ?? null,
  }))
}

export async function getEmaWatchlistItem(id: string) {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('ema_watchlist_items')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data as EmaWatchlistItemRow | null
}

export async function getActiveEmaWatchlistItems() {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('ema_watchlist_items')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('symbol', { ascending: true })

  if (error) throw error
  return (data ?? []) as EmaWatchlistItemRow[]
}

export async function upsertEmaWatchlistItem(input: {
  symbol: string
  notes?: string | null
  buyMode?: EmaBuyMode
  alertThresholdPct?: number
  approachingThresholdPct?: number
}) {
  const sb = createServiceClient()
  const row = {
    symbol: normalizeSymbol(input.symbol),
    notes: input.notes ?? null,
    buy_mode: input.buyMode ?? 'any',
    alert_threshold_pct: input.alertThresholdPct ?? 3,
    approaching_threshold_pct: input.approachingThresholdPct ?? 8,
    is_active: true,
  }

  const { error } = await sb
    .from('ema_watchlist_items')
    .upsert(row, { onConflict: 'symbol' })

  if (error) throw error
}

export async function updateEmaWatchlistItem(
  id: string,
  input: {
    notes?: string | null
    buyMode?: EmaBuyMode
    alertThresholdPct?: number
    approachingThresholdPct?: number
    isActive?: boolean
    sortOrder?: number
  },
) {
  const sb = createServiceClient()
  const row = {
    notes: input.notes ?? null,
    buy_mode: input.buyMode ?? 'any',
    alert_threshold_pct: asNumber(input.alertThresholdPct, 3),
    approaching_threshold_pct: asNumber(input.approachingThresholdPct, 8),
    is_active: input.isActive ?? true,
    sort_order: asNumber(input.sortOrder, 0),
  }

  const { error } = await sb
    .from('ema_watchlist_items')
    .update(row)
    .eq('id', id)

  if (error) throw error
}

export async function deleteEmaWatchlistItem(id: string) {
  const sb = createServiceClient()
  const { error } = await sb
    .from('ema_watchlist_items')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function persistEmaWatchlistSnapshot(
  latest: EmaWatchlistLatestRow,
  snapshot: EmaWatchlistSnapshotInsert,
) {
  const sb = createServiceClient()

  const { error: latestError } = await sb
    .from('ema_watchlist_latest')
    .upsert(latest, { onConflict: 'watchlist_item_id' })

  if (latestError) throw latestError

  const { error: snapshotError } = await sb
    .from('ema_watchlist_snapshots')
    .upsert(snapshot, { onConflict: 'watchlist_item_id,as_of_date' })

  if (snapshotError) throw snapshotError
}
