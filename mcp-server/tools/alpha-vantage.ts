import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

const FMP_BASE = 'https://financialmodelingprep.com/stable'
let lastCallTime = 0
const MIN_INTERVAL_MS = 500

async function callFMP(endpoint: string, params: Record<string, string> = {}): Promise<unknown> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY
  if (!apiKey) return { error: 'FINANCIAL_MODELING_PREP_API_KEY not set' }

  const elapsed = Date.now() - lastCallTime
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - elapsed))
  }
  lastCallTime = Date.now()

  const url = new URL(`${FMP_BASE}/${endpoint}`)
  url.searchParams.set('apikey', apiKey)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`FMP error: ${res.status}`)
  return res.json()
}

// Keep the same function name for MCP server registration
export function registerAlphaVantageTools(server: McpServer) {
  server.tool(
    'get_stock_overview',
    'Get company profile: market cap, PE, dividend yield, sector, description, etc.',
    { ticker: z.string().describe('Stock/ETF ticker symbol, e.g. SCHD, JNJ, O') },
    async ({ ticker }) => {
      try {
        const data = await callFMP('profile', { symbol: ticker }) as any[]
        if (!data?.[0]) {
          return { content: [{ type: 'text' as const, text: `No profile found for ${ticker}` }] }
        }
        const p = data[0]
        const overview = {
          symbol: p.symbol,
          name: p.companyName,
          sector: p.sector,
          industry: p.industry,
          description: p.description,
          market_cap: p.mktCap,
          price: p.price,
          pe_ratio: p.pe,
          eps: p.eps,
          beta: p.beta,
          dividend_yield: p.dividendYield,
          last_dividend: p.lastDiv,
          ex_dividend_date: p.exDividendDate,
          range_52_week: p.range,
          country: p.country,
          exchange: p.exchangeShortName,
          is_etf: p.isEtf,
          ceo: p.ceo,
          full_time_employees: p.fullTimeEmployees,
        }
        return { content: [{ type: 'text' as const, text: JSON.stringify(overview, null, 2) }] }
      } catch (err) {
        return { content: [{ type: 'text' as const, text: `Error: ${(err as Error).message}` }] }
      }
    },
  )

  server.tool(
    'get_dividend_history',
    'Get dividend payment history for a stock or ETF',
    { ticker: z.string().describe('Stock/ETF ticker symbol') },
    async ({ ticker }) => {
      try {
        const data = await callFMP('dividends', { symbol: ticker }) as any[]
        if (!data?.length) {
          return { content: [{ type: 'text' as const, text: `No dividend history for ${ticker}` }] }
        }
        const recent = data.slice(0, 24)
        const totalDivs = recent.reduce((s: number, d: any) => s + (d.dividend ?? 0), 0)
        const result = {
          ticker,
          total_dividends_recent: totalDivs.toFixed(4),
          payment_count: recent.length,
          dividends: recent.map((d: any) => ({
            date: d.date,
            dividend: d.dividend,
            adj_dividend: d.adjDividend,
            record_date: d.recordDate,
            payment_date: d.paymentDate,
          })),
        }
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] }
      } catch (err) {
        return { content: [{ type: 'text' as const, text: `Error: ${(err as Error).message}` }] }
      }
    },
  )
}
