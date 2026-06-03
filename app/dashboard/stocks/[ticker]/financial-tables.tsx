'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function fmt(v: unknown): string {
  if (v === null || v === undefined || v === '') return '—'
  const n = typeof v === 'number' ? v : Number(v)
  if (!Number.isFinite(n)) return String(v)
  if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(2)}M`
  if (Math.abs(n) >= 1e3) return `${(n / 1e3).toFixed(2)}K`
  return n.toFixed(2)
}

function StatementTable({
  rows,
  fields,
}: {
  rows: any[]
  fields: Array<[string, string]>
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground py-4">No data available.</p>
  }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-56">Line item</TableHead>
            {rows.map((r) => (
              <TableHead key={r.date} className="text-right">
                {r.date}
                <div className="text-xs font-normal text-muted-foreground">{r.period}</div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map(([label, key]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{label}</TableCell>
              {rows.map((r) => (
                <TableCell key={r.date} className="text-right tabular-nums">
                  {fmt(r[key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const INCOME_FIELDS: Array<[string, string]> = [
  ['Revenue', 'revenue'],
  ['Gross Profit', 'gross_profit'],
  ['Operating Income', 'operating_income'],
  ['Net Income', 'net_income'],
  ['EPS', 'eps'],
  ['EPS Diluted', 'eps_diluted'],
  ['EBITDA', 'ebitda'],
  ['Operating Margin', 'operating_income_ratio'],
  ['Net Margin', 'net_income_ratio'],
]

const BALANCE_FIELDS: Array<[string, string]> = [
  ['Cash & Equivalents', 'cash_and_cash_equivalents'],
  ['Total Current Assets', 'total_current_assets'],
  ['Total Assets', 'total_assets'],
  ['Short-Term Debt', 'short_term_debt'],
  ['Long-Term Debt', 'long_term_debt'],
  ['Total Current Liabilities', 'total_current_liabilities'],
  ['Total Liabilities', 'total_liabilities'],
  ['Retained Earnings', 'retained_earnings'],
  ['Total Stockholders Equity', 'total_stockholders_equity'],
]

const CASHFLOW_FIELDS: Array<[string, string]> = [
  ['Operating Cash Flow', 'operating_cash_flow'],
  ['Capital Expenditure', 'capital_expenditure'],
  ['Free Cash Flow', 'free_cash_flow'],
  ['Dividends Paid', 'dividends_paid'],
  ['Stock Repurchased', 'common_stock_repurchased'],
  ['Net Cash Investing', 'net_cash_used_for_investing'],
  ['Net Cash Financing', 'net_cash_used_for_financing'],
  ['Net Change in Cash', 'net_change_in_cash'],
]

export function FinancialTables({
  incomeAnnual,
  incomeQuarterly,
  balanceAnnual,
  balanceQuarterly,
  cashAnnual,
  cashQuarterly,
}: {
  incomeAnnual: any[]
  incomeQuarterly: any[]
  balanceAnnual: any[]
  balanceQuarterly: any[]
  cashAnnual: any[]
  cashQuarterly: any[]
}) {
  const [period, setPeriod] = useState<'annual' | 'quarterly'>('annual')

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Financial Statements</CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as 'annual' | 'quarterly')}>
          <TabsList>
            <TabsTrigger value="annual">Annual</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold mb-2">Income Statement</h4>
          <StatementTable
            rows={period === 'annual' ? incomeAnnual : incomeQuarterly}
            fields={INCOME_FIELDS}
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Balance Sheet</h4>
          <StatementTable
            rows={period === 'annual' ? balanceAnnual : balanceQuarterly}
            fields={BALANCE_FIELDS}
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Cash Flow</h4>
          <StatementTable
            rows={period === 'annual' ? cashAnnual : cashQuarterly}
            fields={CASHFLOW_FIELDS}
          />
        </div>
      </CardContent>
    </Card>
  )
}
