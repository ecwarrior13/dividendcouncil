'use server'

import { redirect } from 'next/navigation'

const TICKER_RE = /^[A-Z][A-Z0-9.-]{0,9}$/

export async function submitTicker(formData: FormData) {
  const raw = String(formData.get('ticker') ?? '').trim().toUpperCase()
  if (!TICKER_RE.test(raw)) {
    redirect('/dashboard/analyses/new?error=invalid')
  }
  redirect(`/dashboard/stocks/${raw}`)
}
