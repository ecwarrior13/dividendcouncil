'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { fetchEtfAction } from './actions'

interface Diagnostic {
  source: string
  status: string
  detail?: string
}

const statusColor: Record<string, string> = {
  ok: 'text-green-600',
  empty: 'text-yellow-600',
  rate_limited: 'text-yellow-600',
  no_key: 'text-red-600',
  http_error: 'text-red-600',
  fetch_error: 'text-red-600',
  error: 'text-red-600',
}

export function EtfFetcher() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([])
  const router = useRouter()

  const handleSubmit = (formData: FormData) => {
    setMessage(null)
    setDiagnostics([])
    startTransition(async () => {
      const result = await fetchEtfAction(formData)
      setDiagnostics(result.diagnostics ?? [])
      if (result.success) {
        setMessage({ type: 'success', text: `Fetched ${result.symbol} successfully` })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: result.message ?? 'Unknown error' })
      }
    })
  }

  return (
    <div>
      <form action={handleSubmit} className="flex items-center gap-2">
        <input
          name="symbol"
          type="text"
          placeholder="Enter ETF ticker (e.g. SCHD, JEPI)..."
          required
          className="rounded-md border px-3 py-1.5 text-sm w-64 uppercase"
        />
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? 'Fetching...' : 'Fetch from FMP'}
        </Button>
      </form>
      {message && (
        <p
          className={`mt-2 text-sm ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message.text}
        </p>
      )}
      {diagnostics.length > 0 && (
        <div className="mt-3 rounded-md border bg-muted/30 p-3">
          <p className="text-xs font-medium mb-2 text-muted-foreground">API call diagnostics:</p>
          <div className="space-y-1 text-xs font-mono">
            {diagnostics.map((d, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-44 shrink-0">{d.source}</span>
                <span className={`w-24 shrink-0 ${statusColor[d.status] ?? ''}`}>{d.status}</span>
                {d.detail && <span className="text-muted-foreground">{d.detail}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
