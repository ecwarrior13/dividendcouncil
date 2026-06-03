'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { fetch13fAction } from './actions'

interface Diagnostic {
  source: string
  status: string
  detail?: string
}

const statusColor: Record<string, string> = {
  ok: 'text-green-600',
  empty: 'text-yellow-600',
  skipped: 'text-yellow-600',
  no_info_table: 'text-yellow-600',
  error: 'text-red-600',
}

export function ManagerFetcher() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null,
  )
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([])
  const router = useRouter()

  const handleSubmit = (formData: FormData) => {
    setMessage(null)
    setDiagnostics([])
    startTransition(async () => {
      const result = await fetch13fAction(formData)
      setDiagnostics(result.diagnostics ?? [])
      if (result.success) {
        setMessage({
          type: 'success',
          text: `Fetched ${result.filingsStored} filing(s) for ${result.managerName} (CIK ${result.cik})`,
        })
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
          name="cik"
          type="text"
          placeholder="Enter institutional manager CIK (e.g. 1067983)..."
          required
          className="rounded-md border px-3 py-1.5 text-sm w-80"
        />
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? 'Fetching from SEC...' : 'Fetch 13F filings'}
        </Button>
      </form>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Pulls the 8 most recent 13F-HR filings from SEC EDGAR and enriches holdings
        with tickers via FMP.
      </p>
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
          <p className="text-xs font-medium mb-2 text-muted-foreground">
            Fetch diagnostics:
          </p>
          <div className="space-y-1 text-xs font-mono">
            {diagnostics.map((d, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-52 shrink-0">{d.source}</span>
                <span className={`w-28 shrink-0 ${statusColor[d.status] ?? ''}`}>
                  {d.status}
                </span>
                {d.detail && <span className="text-muted-foreground">{d.detail}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
