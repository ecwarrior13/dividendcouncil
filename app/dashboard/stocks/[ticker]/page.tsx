import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getMergedCompanyProfile,
  getIncomeStatements,
  getBalanceSheets,
  getCashFlows,
  getDividendHistory,
  getLatestAnalysis,
} from '@/lib/supabase/atlas'
import { ensureFinancialData } from '@/lib/debate/data-fetcher'
import { DataChecklist } from './data-checklist'
import { OverviewCard } from './overview-card'
import { FinancialTables } from './financial-tables'
import { DividendTable } from './dividend-table'
import { DebateLauncher } from './debate-launcher'

const TICKER_RE = /^[A-Z][A-Z0-9.-]{0,9}$/

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>
}) {
  const { ticker: rawTicker } = await params
  const ticker = rawTicker.toUpperCase()
  if (!TICKER_RE.test(ticker)) notFound()

  let fetchError: string | null = null
  try {
    await ensureFinancialData(ticker, 7, { throwIfMissingProfile: false })
  } catch (err) {
    fetchError = (err as Error).message
  }

  const [
    profile,
    incomeAnnual,
    incomeQuarterly,
    balanceAnnual,
    balanceQuarterly,
    cashAnnual,
    cashQuarterly,
    dividends,
    latestAnalysis,
  ] = await Promise.all([
    getMergedCompanyProfile(ticker),
    getIncomeStatements(ticker, 'FY', 5),
    getIncomeStatements(ticker, 'Q1', 4).then(async (q1) => {
      const [q2, q3, q4] = await Promise.all([
        getIncomeStatements(ticker, 'Q2', 4),
        getIncomeStatements(ticker, 'Q3', 4),
        getIncomeStatements(ticker, 'Q4', 4),
      ])
      return [...q1, ...q2, ...q3, ...q4]
        .sort((a: any, b: any) => (a.date < b.date ? 1 : -1))
        .slice(0, 4)
    }),
    getBalanceSheets(ticker, 'FY', 5),
    getBalanceSheets(ticker, 'Q1', 4).then(async (q1) => {
      const [q2, q3, q4] = await Promise.all([
        getBalanceSheets(ticker, 'Q2', 4),
        getBalanceSheets(ticker, 'Q3', 4),
        getBalanceSheets(ticker, 'Q4', 4),
      ])
      return [...q1, ...q2, ...q3, ...q4]
        .sort((a: any, b: any) => (a.date < b.date ? 1 : -1))
        .slice(0, 4)
    }),
    getCashFlows(ticker, 'FY', 5),
    getCashFlows(ticker, 'Q1', 4).then(async (q1) => {
      const [q2, q3, q4] = await Promise.all([
        getCashFlows(ticker, 'Q2', 4),
        getCashFlows(ticker, 'Q3', 4),
        getCashFlows(ticker, 'Q4', 4),
      ])
      return [...q1, ...q2, ...q3, ...q4]
        .sort((a: any, b: any) => (a.date < b.date ? 1 : -1))
        .slice(0, 4)
    }),
    getDividendHistory(ticker, 12),
    getLatestAnalysis(ticker),
  ])
  const isEtf = Boolean(profile?.is_etf || profile?.etf)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {ticker}
            {profile?.company_name ? (
              <span className="ml-2 text-base font-normal text-muted-foreground">
                {String(profile.company_name)}
              </span>
            ) : null}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isEtf
              ? 'Verify ETF data, then launch an Aiden vs. Lexa debate.'
              : 'Verify financial data, then launch an Aiden vs. Lexa debate.'}
          </p>
        </div>
        <Link href="/dashboard/analyses" className="text-sm text-muted-foreground underline">
          ← Back to analyses
        </Link>
      </div>

      {fetchError && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <strong>Data fetch error:</strong> {fetchError}
          <p className="mt-1 text-xs">
            Per-step errors are logged in the dev server console. Showing whatever data is available below.
          </p>
        </div>
      )}

      <DataChecklist
        profile={profile}
        incomeAnnual={incomeAnnual}
        incomeQuarterly={incomeQuarterly}
        balanceAnnual={balanceAnnual}
        cashAnnual={cashAnnual}
        dividends={dividends}
      />

      {profile && <OverviewCard profile={profile} />}

      {!isEtf && (
        <FinancialTables
          incomeAnnual={incomeAnnual}
          incomeQuarterly={incomeQuarterly}
          balanceAnnual={balanceAnnual}
          balanceQuarterly={balanceQuarterly}
          cashAnnual={cashAnnual}
          cashQuarterly={cashQuarterly}
        />
      )}

      <DividendTable dividends={dividends} />

      <DebateLauncher ticker={ticker} latestAnalysis={latestAnalysis} />
    </div>
  )
}
