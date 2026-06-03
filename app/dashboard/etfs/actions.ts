'use server'

import { revalidatePath } from 'next/cache'
import { fetchAndStoreEtf } from '@/lib/fmp/etf'
import type { FetchEtfResult } from '@/lib/fmp/etf'

export async function fetchEtfAction(formData: FormData): Promise<FetchEtfResult> {
  const rawSymbol = formData.get('symbol') as string
  if (!rawSymbol?.trim()) {
    return { success: false, symbol: '', message: 'Symbol is required' }
  }

  const result = await fetchAndStoreEtf(rawSymbol)
  if (result.success) {
    revalidatePath('/dashboard/etfs')
    revalidatePath(`/dashboard/stocks/${result.symbol}`)
  }
  return result
}
