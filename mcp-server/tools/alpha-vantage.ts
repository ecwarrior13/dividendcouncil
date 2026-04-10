import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

const BASE_URL = 'https://www.alphavantage.co/query'

// Simple rate limiter: Alpha Vantage free tier = 25 requests/day, 5/min
let lastCallTime = 0
const MIN_INTERVAL_MS = 12_000 // 5 calls/min = 12s between calls

async function callAlphaVantage(params: Record<string, string>): Promise<Record<string, unknown>> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  if (!apiKey) throw new Error('ALPHA_VANTAGE_API_KEY not set')

  const now = Date.now()
  const elapsed = now - lastCallTime
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise((resolve) => setTimeout(resolve, MIN_INTERVAL_MS - elapsed))
  }
  lastCallTime = Date.now()

  const url = new URL(BASE_URL)
  url.searchParams.set('apikey', apiKey)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const response = await fetch(url.toString())
  if (!response.ok) throw new Error(`Alpha Vantage API error: ${response.status}`)
  return response.json() as Promise<Record<string, unknown>>
}

export function registerAlphaVantageTools(server: McpServer) {
  server.tool(
    'get_stock_overview',
    'Get company fundamentals: P/E, dividend yield, payout ratio, market cap, etc.',
    { ticker: z.string().describe('Stock ticker symbol, e.g. SCHD, JNJ, O') },
    async ({ ticker }) => {
      try {
        const data = await callAlphaVantage({ function: 'OVERVIEW', symbol: ticker })

        if (data['Note'] || data['Information']) {
          return { content: [{ type: 'text' as const, text: `API limit reached: ${data['Note'] ?? data['Information']}` }] }
        }

        // Extract dividend-relevant fields
        const overview = {
          symbol: data['Symbol'],
          name: data['Name'],
          sector: data['Sector'],
          industry: data['Industry'],
          market_cap: data['MarketCapitalization'],
          pe_ratio: data['PERatio'],
          peg_ratio: data['PEGRatio'],
          eps: data['EPS'],
          dividend_per_share: data['DividendPerShare'],
          dividend_yield: data['DividendYield'],
          payout_ratio: data['PayoutRatio'],
          ex_dividend_date: data['ExDividendDate'],
          dividend_date: data['DividendDate'],
          fifty_two_week_high: data['52WeekHigh'],
          fifty_two_week_low: data['52WeekLow'],
          analyst_target_price: data['AnalystTargetPrice'],
          profit_margin: data['ProfitMargin'],
          return_on_equity: data['ReturnOnEquityTTM'],
          revenue_growth: data['QuarterlyRevenueGrowthYOY'],
          description: data['Description'],
        }

        return { content: [{ type: 'text' as const, text: JSON.stringify(overview, null, 2) }] }
      } catch (err) {
        return { content: [{ type: 'text' as const, text: `Error: ${(err as Error).message}` }] }
      }
    },
  )

  server.tool(
    'get_dividend_history',
    'Get monthly adjusted stock data including dividend payment history',
    { ticker: z.string().describe('Stock ticker symbol') },
    async ({ ticker }) => {
      try {
        const data = await callAlphaVantage({
          function: 'TIME_SERIES_MONTHLY_ADJUSTED',
          symbol: ticker,
        })

        if (data['Note'] || data['Information']) {
          return { content: [{ type: 'text' as const, text: `API limit reached: ${data['Note'] ?? data['Information']}` }] }
        }

        const timeSeries = data['Monthly Adjusted Time Series'] as Record<string, Record<string, string>> | undefined
        if (!timeSeries) {
          return { content: [{ type: 'text' as const, text: `No data found for ticker ${ticker}` }] }
        }

        // Extract last 24 months of dividend data
        const entries = Object.entries(timeSeries).slice(0, 24)
        const dividends = entries
          .map(([date, values]) => ({
            date,
            close: values['4. close'],
            adjusted_close: values['5. adjusted close'],
            dividend: values['7. dividend amount'],
          }))
          .filter((d) => parseFloat(d.dividend) > 0)

        const result = {
          ticker,
          total_dividends_24m: dividends.reduce((sum, d) => sum + parseFloat(d.dividend), 0).toFixed(4),
          dividend_payments: dividends,
          payment_count: dividends.length,
        }

        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] }
      } catch (err) {
        return { content: [{ type: 'text' as const, text: `Error: ${(err as Error).message}` }] }
      }
    },
  )
}
