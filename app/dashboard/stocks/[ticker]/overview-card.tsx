import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function fmt(v: unknown, kind: 'currency' | 'number' | 'percent' | 'text' = 'text'): string {
  if (v === null || v === undefined || v === '') return '—'
  const n = typeof v === 'number' ? v : Number(v)
  if (kind === 'percent') return Number.isFinite(n) ? `${(n * 100).toFixed(2)}%` : String(v)
  if (kind === 'currency') {
    if (!Number.isFinite(n)) return String(v)
    if (Math.abs(n) >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
    if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
    if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
    return `$${n.toFixed(2)}`
  }
  if (kind === 'number') return Number.isFinite(n) ? n.toFixed(2) : String(v)
  return String(v)
}

export function OverviewCard({ profile }: { profile: any }) {
  const isEtf = Boolean(profile.is_etf || profile.etf)
  const etf = profile.etf
  const market = etf?.market_stats
  const income = etf?.income_stats

  const fields: Array<[string, string]> = isEtf ? [
    ['Issuer', fmt(etf?.etf?.issuer)],
    ['Asset Class', fmt(etf?.etf?.asset_class)],
    ['Category', fmt(etf?.etf?.category ?? profile.industry)],
    ['Exchange', fmt(etf?.etf?.primary_exchange ?? profile.exchange)],
    ['Domicile', fmt(etf?.etf?.domicile ?? profile.country)],
    ['AUM', fmt(market?.aum ?? profile.market_cap, 'currency')],
    ['Market Price', fmt(market?.market_price ?? profile.price, 'currency')],
    ['NAV', fmt(market?.nav, 'currency')],
    ['Premium/Discount', market?.premium_discount_pct == null ? 'â€”' : `${Number(market.premium_discount_pct).toFixed(2)}%`],
    ['Expense Ratio', market?.expense_ratio_pct == null ? 'â€”' : `${Number(market.expense_ratio_pct).toFixed(2)}%`],
    ['Dividend Yield', income?.dividend_yield_ttm_pct == null ? fmt(profile.dividend_yield, 'percent') : `${Number(income.dividend_yield_ttm_pct).toFixed(2)}%`],
    ['TTM Distributions', fmt(income?.ttm_distributions_per_share, 'number')],
    ['Avg Volume', fmt(market?.avg_daily_volume_30d ?? profile.vol_avg, 'currency').replace('$', '')],
    ['Shares Out', fmt(market?.shares_outstanding, 'currency').replace('$', '')],
    ['1Y Return', market?.total_return_1y_pct == null ? 'â€”' : `${Number(market.total_return_1y_pct).toFixed(2)}%`],
    ['3Y Ann Return', market?.total_return_3y_ann_pct == null ? 'â€”' : `${Number(market.total_return_3y_ann_pct).toFixed(2)}%`],
    ['5Y Ann Return', market?.total_return_5y_ann_pct == null ? 'â€”' : `${Number(market.total_return_5y_ann_pct).toFixed(2)}%`],
    ['Inception Date', fmt(etf?.etf?.inception_date ?? profile.ipo_date)],
  ] : [
    ['Sector', fmt(profile.sector)],
    ['Industry', fmt(profile.industry)],
    ['Exchange', fmt(profile.exchange)],
    ['Country', fmt(profile.country)],
    ['Market Cap', fmt(profile.market_cap, 'currency')],
    ['Price', fmt(profile.price, 'currency')],
    ['52w High', fmt(profile.week_52_high, 'currency')],
    ['52w Low', fmt(profile.week_52_low, 'currency')],
    ['P/E', fmt(profile.pe, 'number')],
    ['EPS', fmt(profile.eps, 'number')],
    ['Dividend Yield', fmt(profile.dividend_yield, 'percent')],
    ['Last Dividend', fmt(profile.last_div, 'number')],
    ['Ex-Div Date', fmt(profile.ex_dividend_date)],
    ['Beta', fmt(profile.beta, 'number')],
    ['Avg Volume', fmt(profile.vol_avg, 'currency').replace('$', '')],
    ['CEO', fmt(profile.ceo)],
    ['Employees', fmt(profile.full_time_employees)],
    ['IPO Date', fmt(profile.ipo_date)],
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{isEtf ? 'ETF Overview' : 'Company Overview'}</CardTitle>
      </CardHeader>
      <CardContent>
        {profile.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{profile.description}</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
          {fields.map(([label, value]) => (
            <div key={label} className="flex justify-between border-b pb-1">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium text-right">{value}</span>
            </div>
          ))}
        </div>
        {isEtf && etf?.holdings?.length > 0 && (
          <div className="mt-5">
            <h4 className="mb-2 text-sm font-semibold">Top holdings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm">
              {etf.holdings.slice(0, 10).map((holding: Record<string, unknown>) => (
                <div key={`${holding.symbol}-${holding.as_of_date}`} className="flex justify-between border-b pb-1">
                  <span className="truncate text-muted-foreground">
                    {String(holding.asset_name ?? holding.symbol ?? 'Unknown')}
                  </span>
                  <span className="ml-3 font-medium">
                    {holding.weight_pct == null ? 'â€”' : `${Number(holding.weight_pct).toFixed(2)}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {profile.updated_at && (
          <p className="mt-4 text-xs text-muted-foreground">
            Data updated {new Date(profile.updated_at).toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
