'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { launchDebate } from './actions'

function scoreColor(score: number | null | undefined): string {
  if (score === null || score === undefined) return 'text-muted-foreground'
  if (score >= 75) return 'text-green-600'
  if (score >= 55) return 'text-yellow-600'
  return 'text-red-600'
}

export function DebateLauncher({
  ticker,
  latestAnalysis,
}: {
  ticker: string
  latestAnalysis: any | null
}) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleLaunch() {
    setError(null)
    startTransition(async () => {
      try {
        await launchDebate(ticker)
      } catch (err) {
        const msg = (err as Error).message
        if (!msg.includes('NEXT_REDIRECT')) setError(msg)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Aiden vs. Lexa Debate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {latestAnalysis ? (
          <div className="rounded-md border bg-muted/30 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-muted-foreground">
                  Last debated{' '}
                  {new Date(latestAnalysis.created_at).toLocaleString()}
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Aiden </span>
                    <span className={`font-semibold ${scoreColor(latestAnalysis.aiden_score)}`}>
                      {latestAnalysis.aiden_score ?? '—'}
                    </span>
                    {latestAnalysis.safety_fit && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({latestAnalysis.safety_fit})
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lexa </span>
                    <span className={`font-semibold ${scoreColor(latestAnalysis.lexa_score)}`}>
                      {latestAnalysis.lexa_score ?? '—'}
                    </span>
                    {latestAnalysis.growth_fit && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({latestAnalysis.growth_fit})
                      </span>
                    )}
                  </div>
                  {latestAnalysis.stock_profile && (
                    <Badge variant="outline">{latestAnalysis.stock_profile}</Badge>
                  )}
                </div>
              </div>
              <Link
                href={`/dashboard/analyses/${latestAnalysis.id}`}
                className="text-sm text-primary underline"
              >
                View →
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No prior debate for {ticker}.
          </p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex items-center gap-3">
          <Button onClick={handleLaunch} disabled={pending}>
            {pending
              ? 'Starting…'
              : latestAnalysis
                ? 'Re-run debate'
                : 'Launch debate'}
          </Button>
          <p className="text-xs text-muted-foreground">
            Runs in background. Takes 1–2 minutes. You'll be redirected to the analysis page.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
