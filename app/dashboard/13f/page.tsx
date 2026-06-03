import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ManagerFetcher } from './manager-fetcher'
import { Comparison, type ManagerOption } from './comparison'

function fmtUsd(n: number | null | undefined): string {
  if (n == null) return '—'
  const v = Number(n)
  if (Math.abs(v) >= 1e9) return `$${(v / 1e9).toFixed(2)}B`
  if (Math.abs(v) >= 1e6) return `$${(v / 1e6).toFixed(2)}M`
  if (Math.abs(v) >= 1e3) return `$${(v / 1e3).toFixed(1)}K`
  return `$${v.toFixed(0)}`
}

interface FilingRow {
  id: string
  report_quarter: string
  report_period: string
  form_type: string
  filing_date: string | null
  total_value: number | null
  total_holdings: number | null
}

interface ManagerRow {
  id: string
  cik: string
  manager_name: string
  business_city: string | null
  business_state: string | null
  last_fetched_at: string | null
  sec_13f_filings: FilingRow[]
}

export default async function Filings13FPage() {
  const sb = createServiceClient()

  const { data: managersData } = await sb
    .from('sec_13f_managers')
    .select(
      `id, cik, manager_name, business_city, business_state, last_fetched_at,
       sec_13f_filings(id, report_quarter, report_period, form_type, filing_date,
                       total_value, total_holdings)`,
    )
    .order('last_fetched_at', { ascending: false })

  const managers = (managersData ?? []) as ManagerRow[]

  const managerOptions: ManagerOption[] = managers.map((m) => ({
    id: m.id,
    cik: m.cik,
    managerName: m.manager_name,
    filings: [...(m.sec_13f_filings ?? [])].map((f) => ({
      id: f.id,
      reportQuarter: f.report_quarter,
      reportPeriod: f.report_period,
      formType: f.form_type,
      totalValue: f.total_value,
      totalHoldings: f.total_holdings,
    })),
  }))

  // Flat list of every stored filing, newest first.
  const allFilings = managers
    .flatMap((m) =>
      (m.sec_13f_filings ?? []).map((f) => ({ ...f, managerName: m.manager_name })),
    )
    .sort((a, b) => {
      const ak = a.filing_date ?? a.report_period
      const bk = b.filing_date ?? b.report_period
      return ak < bk ? 1 : ak > bk ? -1 : 0
    })

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">SEC 13F Filings</h2>
        <p className="text-sm text-muted-foreground">
          Track institutional managers&apos; quarterly portfolios from SEC EDGAR and
          compare up to 4 filings for increases, decreases, new positions and exits.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Fetch a manager</CardTitle>
        </CardHeader>
        <CardContent>
          <ManagerFetcher />
        </CardContent>
      </Card>

      {/* Comparison tool */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold tracking-tight mb-3">
          Compare quarterly filings
        </h3>
        <Comparison managers={managerOptions} />
      </div>

      {/* All filings — browse a single filing's full holdings */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold tracking-tight mb-1">All filings</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Open any filing to browse its full holdings — no comparison.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Manager</TableHead>
              <TableHead>Quarter</TableHead>
              <TableHead>Form</TableHead>
              <TableHead>Positions</TableHead>
              <TableHead>Portfolio value</TableHead>
              <TableHead>Filed</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allFilings.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="font-medium">{f.managerName}</TableCell>
                <TableCell>{f.report_quarter}</TableCell>
                <TableCell>
                  <Badge variant="outline">{f.form_type}</Badge>
                </TableCell>
                <TableCell>{f.total_holdings ?? '—'}</TableCell>
                <TableCell>{fmtUsd(f.total_value)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {f.filing_date
                    ? new Date(f.filing_date).toLocaleDateString()
                    : '—'}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/13f/filing/${f.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View holdings →
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {allFilings.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No filings yet. Fetch a manager above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Tracked managers overview */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight mb-3">Tracked managers</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Manager</TableHead>
              <TableHead>CIK</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Filings</TableHead>
              <TableHead>Latest quarter</TableHead>
              <TableHead>Latest portfolio value</TableHead>
              <TableHead>Last fetched</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managers.map((m) => {
              const filings = [...(m.sec_13f_filings ?? [])].sort((a, b) =>
                a.report_period < b.report_period ? 1 : -1,
              )
              const latest = filings[0]
              return (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.manager_name}</TableCell>
                  <TableCell className="font-mono text-sm">{m.cik}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {[m.business_city, m.business_state].filter(Boolean).join(', ') ||
                      '—'}
                  </TableCell>
                  <TableCell>{filings.length}</TableCell>
                  <TableCell>{latest?.report_quarter ?? '—'}</TableCell>
                  <TableCell>{fmtUsd(latest?.total_value)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {m.last_fetched_at
                      ? new Date(m.last_fetched_at).toLocaleDateString()
                      : '—'}
                  </TableCell>
                </TableRow>
              )
            })}
            {managers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No managers tracked yet. Enter a CIK above to fetch one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
