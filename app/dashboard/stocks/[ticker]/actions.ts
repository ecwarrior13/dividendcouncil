'use server'

import { redirect } from 'next/navigation'
import { createStockAnalysis } from '@/lib/supabase/atlas'
import { runStockDebate } from '@/lib/debate/run'

export async function launchDebate(ticker: string): Promise<void> {
  const symbol = ticker.toUpperCase()

  const analysis = await createStockAnalysis({
    ticker: symbol,
    status: 'running',
  })

  void runStockDebate(symbol, { existingAnalysisId: analysis.id }).catch((err) => {
    console.error(`[debate-launcher] runStockDebate failed for ${symbol}:`, err)
  })

  redirect(`/dashboard/analyses/${analysis.id}`)
}
