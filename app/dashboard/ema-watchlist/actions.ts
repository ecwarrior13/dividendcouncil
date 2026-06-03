'use server'

import { revalidatePath } from 'next/cache'
import {
  EmaBuyMode,
  deleteEmaWatchlistItem,
  getActiveEmaWatchlistItems,
  getEmaWatchlistItem,
  updateEmaWatchlistItem,
  upsertEmaWatchlistItem,
} from '@/lib/supabase/atlas/ema-watchlist'
import { refreshEmaWatchlistItem } from '@/lib/fmp/ema-watchlist'

const TICKER_RE = /^[A-Z][A-Z0-9.-]{0,9}$/
const BUY_MODES = new Set<EmaBuyMode>(['any', '62_ema', '79_ema', '200_sma'])

function symbolFromForm(formData: FormData): string {
  const symbol = String(formData.get('symbol') ?? '').trim().toUpperCase()
  if (!TICKER_RE.test(symbol)) {
    throw new Error('Enter a valid ticker symbol.')
  }
  return symbol
}

function buyModeFromForm(formData: FormData): EmaBuyMode {
  const value = String(formData.get('buy_mode') ?? 'any') as EmaBuyMode
  return BUY_MODES.has(value) ? value : 'any'
}

function pctFromForm(formData: FormData, key: string, fallback: number): number {
  const value = Number(formData.get(key))
  if (!Number.isFinite(value) || value < 0) return fallback
  return Number(value.toFixed(4))
}

export async function addEmaWatchlistItemAction(formData: FormData) {
  const symbol = symbolFromForm(formData)
  await upsertEmaWatchlistItem({
    symbol,
    notes: String(formData.get('notes') ?? '').trim() || null,
    buyMode: buyModeFromForm(formData),
    alertThresholdPct: pctFromForm(formData, 'alert_threshold_pct', 3),
    approachingThresholdPct: pctFromForm(formData, 'approaching_threshold_pct', 8),
  })
  revalidatePath('/dashboard/ema-watchlist')
}

export async function updateEmaWatchlistItemAction(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  if (!id) throw new Error('Missing watchlist item id.')

  await updateEmaWatchlistItem(id, {
    notes: String(formData.get('notes') ?? '').trim() || null,
    buyMode: buyModeFromForm(formData),
    alertThresholdPct: pctFromForm(formData, 'alert_threshold_pct', 3),
    approachingThresholdPct: pctFromForm(formData, 'approaching_threshold_pct', 8),
    isActive: formData.get('is_active') === 'on',
    sortOrder: Number(formData.get('sort_order') ?? 0),
  })
  revalidatePath('/dashboard/ema-watchlist')
}

export async function deleteEmaWatchlistItemAction(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  if (!id) throw new Error('Missing watchlist item id.')
  await deleteEmaWatchlistItem(id)
  revalidatePath('/dashboard/ema-watchlist')
}

export async function setEmaWatchlistActiveAction(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  if (!id) throw new Error('Missing watchlist item id.')

  const item = await getEmaWatchlistItem(id)
  if (!item) throw new Error('Watchlist item not found.')

  await updateEmaWatchlistItem(id, {
    notes: item.notes,
    buyMode: item.buy_mode,
    alertThresholdPct: Number(item.alert_threshold_pct),
    approachingThresholdPct: Number(item.approaching_threshold_pct),
    isActive: formData.get('is_active') === 'true',
    sortOrder: Number(item.sort_order),
  })
  revalidatePath('/dashboard/ema-watchlist')
}

export async function refreshEmaWatchlistItemAction(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  if (!id) throw new Error('Missing watchlist item id.')

  const item = await getEmaWatchlistItem(id)
  if (!item) throw new Error('Watchlist item not found.')

  await refreshEmaWatchlistItem(item)
  revalidatePath('/dashboard/ema-watchlist')
}

export async function refreshActiveEmaWatchlistAction() {
  const items = await getActiveEmaWatchlistItems()
  const failures: string[] = []

  for (const item of items) {
    const result = await refreshEmaWatchlistItem(item)
    if (!result.success) {
      failures.push(`${result.symbol}: ${result.message ?? 'refresh failed'}`)
    }
  }

  revalidatePath('/dashboard/ema-watchlist')
  if (failures.length > 0) console.error(`[ema-watchlist] refresh failures: ${failures.join('; ')}`)
}
