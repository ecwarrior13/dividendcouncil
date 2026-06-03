import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CheckItem {
  label: string
  pass: boolean
  detail: string
  critical: boolean
}

export function DataChecklist({
  profile,
  incomeAnnual,
  incomeQuarterly,
  balanceAnnual,
  cashAnnual,
  dividends,
}: {
  profile: any
  incomeAnnual: any[]
  incomeQuarterly: any[]
  balanceAnnual: any[]
  cashAnnual: any[]
  dividends: any[]
}) {
  const isEtf = Boolean(profile?.is_etf || profile?.etf)
  const etf = profile?.etf
  const market = etf?.market_stats
  const income = etf?.income_stats

  if (isEtf) {
    const checks: CheckItem[] = [
      {
        label: 'ETF profile',
        pass: !!profile,
        detail: profile?.company_name ?? 'missing',
        critical: true,
      },
      {
        label: 'Asset class/category',
        pass: !!etf?.etf?.asset_class || !!profile?.industry,
        detail: `${etf?.etf?.asset_class ?? 'missing'} / ${etf?.etf?.category ?? profile?.industry ?? 'missing'}`,
        critical: true,
      },
      {
        label: 'Market stats',
        pass: !!market,
        detail: market ? `as of ${market.as_of_date}` : 'missing',
        critical: true,
      },
      {
        label: 'AUM',
        pass: market?.aum !== null && market?.aum !== undefined,
        detail: market?.aum != null ? `$${Number(market.aum).toLocaleString()}` : 'missing',
        critical: true,
      },
      {
        label: 'Expense ratio',
        pass: market?.expense_ratio_pct !== null && market?.expense_ratio_pct !== undefined,
        detail: market?.expense_ratio_pct != null ? `${Number(market.expense_ratio_pct).toFixed(2)}%` : 'missing',
        critical: true,
      },
      {
        label: 'Dividend yield',
        pass:
          income?.dividend_yield_ttm_pct !== null
          && income?.dividend_yield_ttm_pct !== undefined,
        detail:
          income?.dividend_yield_ttm_pct !== null && income?.dividend_yield_ttm_pct !== undefined
            ? `${Number(income.dividend_yield_ttm_pct).toFixed(2)}%`
            : 'missing',
        critical: true,
      },
      {
        label: 'Holdings',
        pass: (etf?.holdings_count ?? 0) > 0,
        detail: `${etf?.holdings_count ?? 0} holdings loaded`,
        critical: true,
      },
      {
        label: 'Sector allocations',
        pass: Array.isArray(market?.sector_allocations) && market.sector_allocations.length > 0,
        detail:
          Array.isArray(market?.sector_allocations) && market.sector_allocations.length > 0
            ? `${market.sector_allocations.length} sectors`
            : 'missing',
        critical: false,
      },
      {
        label: 'Dividend history',
        pass: dividends.length > 0,
        detail: `${dividends.length} records`,
        critical: false,
      },
    ]

    const criticalFailures = checks.filter((c) => c.critical && !c.pass)
    const allPass = checks.every((c) => c.pass)

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">ETF data verification</CardTitle>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${
              allPass
                ? 'bg-green-100 text-green-700'
                : criticalFailures.length > 0
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {allPass
              ? 'All checks pass'
              : criticalFailures.length > 0
                ? `${criticalFailures.length} critical issue${criticalFailures.length > 1 ? 's' : ''}`
                : 'Minor gaps only'}
          </span>
        </CardHeader>
        <CardContent>
          {criticalFailures.length > 0 && (
            <p className="mb-3 text-sm text-destructive">
              Critical ETF data missing - debate scores may be unreliable.
            </p>
          )}
          <ul className="space-y-1.5 text-sm">
            {checks.map((c) => (
              <li key={c.label} className="flex items-start gap-2">
                <span className={c.pass ? 'text-green-600' : c.critical ? 'text-red-600' : 'text-yellow-600'}>
                  {c.pass ? '✓' : '✗'}
                </span>
                <span className="font-medium w-64">{c.label}</span>
                <span className="text-muted-foreground">{c.detail}</span>
                {!c.pass && !c.critical && (
                  <span className="text-xs text-yellow-600">(non-blocking)</span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }

  const cashHasDividends = cashAnnual.some(
    (c) => c.dividends_paid !== null && c.dividends_paid !== undefined,
  )
  const cashHasFCF = cashAnnual.every(
    (c) => c.free_cash_flow !== null && c.free_cash_flow !== undefined,
  )

  const checks: CheckItem[] = [
    {
      label: 'Company profile',
      pass: !!profile,
      detail: profile?.company_name ?? 'missing',
      critical: true,
    },
    {
      label: 'Sector/Industry',
      pass: !!profile?.sector && !!profile?.industry,
      detail: profile?.sector ? `${profile.sector} / ${profile.industry}` : 'missing',
      critical: true,
    },
    {
      label: 'Dividend yield',
      pass: profile?.dividend_yield !== null && profile?.dividend_yield !== undefined,
      detail:
        profile?.dividend_yield !== null && profile?.dividend_yield !== undefined
          ? `${(Number(profile.dividend_yield) * 100).toFixed(2)}%`
          : 'null',
      critical: true,
    },
    {
      label: 'Annual income statements',
      pass: incomeAnnual.length >= 3,
      detail: `${incomeAnnual.length} years`,
      critical: true,
    },
    {
      label: 'Quarterly income statements',
      pass: incomeQuarterly.length >= 4,
      detail: `${incomeQuarterly.length} quarters`,
      critical: false,
    },
    {
      label: 'Annual balance sheets',
      pass: balanceAnnual.length >= 3,
      detail: `${balanceAnnual.length} years`,
      critical: true,
    },
    {
      label: 'Annual cash flows',
      pass: cashAnnual.length >= 3,
      detail: `${cashAnnual.length} years`,
      critical: true,
    },
    {
      label: 'Cash flow has dividends_paid',
      pass: cashHasDividends,
      detail: cashHasDividends ? 'present' : 'missing — debate cannot evaluate coverage',
      critical: true,
    },
    {
      label: 'Free cash flow computable',
      pass: cashHasFCF,
      detail: cashHasFCF ? 'present in all years' : 'missing in some years',
      critical: false,
    },
    {
      label: 'Dividend history',
      pass: dividends.length > 0,
      detail: `${dividends.length} records`,
      critical: false,
    },
  ]

  const criticalFailures = checks.filter((c) => c.critical && !c.pass)
  const allPass = checks.every((c) => c.pass)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Data verification</CardTitle>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded ${
            allPass
              ? 'bg-green-100 text-green-700'
              : criticalFailures.length > 0
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {allPass
            ? 'All checks pass'
            : criticalFailures.length > 0
              ? `${criticalFailures.length} critical issue${criticalFailures.length > 1 ? 's' : ''}`
              : 'Minor gaps only'}
        </span>
      </CardHeader>
      <CardContent>
        {criticalFailures.length > 0 && (
          <p className="mb-3 text-sm text-destructive">
            ⚠ Critical data missing — a debate run will likely produce unreliable scores.
          </p>
        )}
        <ul className="space-y-1.5 text-sm">
          {checks.map((c) => (
            <li key={c.label} className="flex items-start gap-2">
              <span className={c.pass ? 'text-green-600' : c.critical ? 'text-red-600' : 'text-yellow-600'}>
                {c.pass ? '✓' : '✗'}
              </span>
              <span className="font-medium w-64">{c.label}</span>
              <span className="text-muted-foreground">{c.detail}</span>
              {!c.pass && !c.critical && (
                <span className="text-xs text-yellow-600">(non-blocking)</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
