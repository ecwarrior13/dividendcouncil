'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createStockAnalysis } from '@/lib/supabase/atlas'
import { runStockDebate } from '@/lib/debate/run'
import { ensureFinancialData, ensureFreeCashFlowData } from '@/lib/debate/data-fetcher'

const TICKER_RE = /^[A-Z][A-Z0-9.-]{0,9}$/

export async function launchDebateForTicker(formData: FormData): Promise<void> {
  const raw = String(formData.get('ticker') ?? '').trim().toUpperCase()
  if (!TICKER_RE.test(raw)) return

  const analysis = await createStockAnalysis({
    ticker: raw,
    status: 'running',
  })

  void runStockDebate(raw, { existingAnalysisId: analysis.id }).catch((err) => {
    console.error(`[analyses/launch] runStockDebate failed for ${raw}:`, err)
  })

  redirect(`/dashboard/analyses/${analysis.id}`)
}

export async function refreshStockDataForTicker(formData: FormData): Promise<void> {
  const raw = String(formData.get('ticker') ?? '').trim().toUpperCase()
  if (!TICKER_RE.test(raw)) return

  await ensureFinancialData(raw, 0, { throwIfMissingProfile: false })
  await ensureFreeCashFlowData(raw, 11)

  revalidatePath('/dashboard/analyses')
  revalidatePath(`/dashboard/stocks/${raw}`)
  revalidatePath(`/dashboard/stocks/${raw}/free-cash-flow`)
}
