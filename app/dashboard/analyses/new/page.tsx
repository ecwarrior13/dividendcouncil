import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { submitTicker } from './actions'

export default function NewAnalysisPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">New Stock Analysis</h2>
          <p className="text-sm text-muted-foreground">
            Enter a ticker to fetch financials, verify data, and launch a debate.
          </p>
        </div>
        <Link href="/dashboard/analyses" className="text-sm text-muted-foreground underline">
          ← Back to analyses
        </Link>
      </div>

      <form action={submitTicker} className="space-y-4 rounded-lg border bg-card p-6">
        <div>
          <label htmlFor="ticker" className="block text-sm font-medium mb-2">
            Ticker symbol
          </label>
          <Input
            id="ticker"
            name="ticker"
            type="text"
            placeholder="JNJ"
            required
            autoFocus
            maxLength={10}
            pattern="[A-Za-z][A-Za-z0-9.\-]{0,9}"
            className="uppercase"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            1–10 chars, letters/digits/. /-. Example: JNJ, BRK.B, RY.TO
          </p>
        </div>
        <ErrorBanner searchParams={searchParams} />
        <Button type="submit">Continue</Button>
      </form>
    </div>
  )
}

async function ErrorBanner({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  if (!error) return null
  return (
    <p className="text-sm text-destructive">
      Invalid ticker format. Use letters, digits, dot, or hyphen.
    </p>
  )
}
