import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HoldingsTable, type HoldingRow } from '../../holdings-table'

function fmtUsd(n: number | null | undefined): string {
  if (n == null) return '—'
  const v = Number(n)
  if (Math.abs(v) >= 1e9) return `$${(v / 1e9).toFixed(2)}B`
  if (Math.abs(v) >= 1e6) return `$${(v / 1e6).toFixed(2)}M`
  if (Math.abs(v) >= 1e3) return `$${(v / 1e3).toFixed(1)}K`
  return `$${v.toFixed(0)}`
}

/** Supabase caps a select at 1000 rows — page through every holding. */
async function fetchAllHoldings(
  sb: ReturnType<typeof createServiceClient>,
  filingId: string,
): Promise<HoldingRow[]> {
  const out: HoldingRow[] = []
  const pageSize = 1000
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await sb
      .from('sec_13f_holdings')
      .select(
        'name_of_issuer, title_of_class, cusip, ticker, value, shares, share_type, put_call, is_option',
      )
      .eq('filing_id', filingId)
      .range(from, from + pageSize - 1)
    if (error) throw new Error(error.message)
    if (!data || data.length === 0) break
    out.push(...(data as HoldingRow[]))
    if (data.length < pageSize) break
  }
  return out
}

export default async function FilingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sb = createServiceClient()

  const { data: filing } = await sb
    .from('sec_13f_filings')
    .select(
      `id, accession_number, form_type, is_amendment, report_period, report_quarter,
       filing_date, total_value, total_holdings, total_issuers, info_table_url,
       sec_13f_managers(id, cik, manager_name)`,
    )
    .eq('id', id)
    .maybeSingle()

  if (!filing) notFound()

  const manager = Array.isArray(filing.sec_13f_managers)
    ? filing.sec_13f_managers[0]
    : filing.sec_13f_managers

  const holdings = await fetchAllHoldings(sb, id)

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/dashboard/13f"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to 13F filings
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            {manager?.manager_name ?? 'Unknown manager'}
          </h2>
          <Badge variant="outline">{filing.report_quarter}</Badge>
          {filing.is_amendment && (
            <Badge
              variant="outline"
              className="bg-amber-100 text-amber-700 border-amber-200"
            >
              Amendment
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          CIK {manager?.cik} · {filing.form_type} · accession{' '}
          <span className="font-mono">{filing.accession_number}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {[
          { label: 'Period of report', value: filing.report_period },
          {
            label: 'Filed',
            value: filing.filing_date
              ? new Date(filing.filing_date).toLocaleDateString()
              : '—',
          },
          { label: 'Portfolio value', value: fmtUsd(filing.total_value) },
          { label: 'Position lines', value: String(filing.total_holdings ?? '—') },
          { label: 'Distinct issuers', value: String(filing.total_issuers ?? '—') },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="py-3">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-base font-semibold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filing.info_table_url && (
        <p className="text-xs text-muted-foreground mb-4">
          Source:{' '}
          <a
            href={filing.info_table_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            SEC information table XML
          </a>
        </p>
      )}

      <h3 className="text-xl font-semibold tracking-tight mb-3">Holdings</h3>
      <p className="text-xs text-muted-foreground mb-3">
        Positions aggregated by security (CUSIP). Stock and option positions are tagged
        in the Type column.
      </p>
      <HoldingsTable holdings={holdings} />
    </div>
  )
}
