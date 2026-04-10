import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function scoreColor(score: number | null): string {
  if (score === null) return 'text-muted-foreground'
  if (score >= 75) return 'text-green-600'
  if (score >= 55) return 'text-yellow-600'
  return 'text-red-600'
}

const profileVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'premium fit': 'default',
  'defensive compounder': 'default',
  'safety focus': 'default',
  'growth focus': 'secondary',
  'moderate fit': 'secondary',
  'speculative grower': 'outline',
  'caution': 'outline',
  'weak fit': 'destructive',
}

const fitColor: Record<string, string> = {
  high: 'text-green-600',
  moderate: 'text-yellow-600',
  low: 'text-red-600',
}

export default async function AnalysesPage() {
  const sb = createServiceClient()
  const { data: analyses } = await sb
    .from('dn_stock_analyses')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Stock Analyses</h2>
          <p className="text-sm text-muted-foreground">
            Aiden & Lexa stock debates — run <code className="text-xs bg-muted px-1 py-0.5 rounded">npm run analyze -- TICKER</code>
          </p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead>Safety</TableHead>
            <TableHead>Growth</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(analyses ?? []).map((a: any) => (
            <TableRow key={a.id}>
              <TableCell className="font-bold">{a.ticker}</TableCell>
              <TableCell>
                <span className={`font-medium ${scoreColor(a.aiden_score)}`}>{a.aiden_score ?? '—'}</span>
                {a.safety_fit && <span className={`ml-1 text-xs ${fitColor[a.safety_fit] ?? ''}`}>({a.safety_fit})</span>}
              </TableCell>
              <TableCell>
                <span className={`font-medium ${scoreColor(a.lexa_score)}`}>{a.lexa_score ?? '—'}</span>
                {a.growth_fit && <span className={`ml-1 text-xs ${fitColor[a.growth_fit] ?? ''}`}>({a.growth_fit})</span>}
              </TableCell>
              <TableCell>
                {a.stock_profile ? (
                  <Badge variant={profileVariant[a.stock_profile] ?? 'outline'}>
                    {a.stock_profile}
                  </Badge>
                ) : '—'}
              </TableCell>
              <TableCell>
                <Badge variant={a.status === 'complete' ? 'secondary' : a.status === 'failed' ? 'destructive' : 'default'}>
                  {a.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(a.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/analyses/${a.id}`} className="text-sm text-primary underline">
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {(!analyses || analyses.length === 0) && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                No analyses yet. Run: npm run analyze -- JNJ
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
