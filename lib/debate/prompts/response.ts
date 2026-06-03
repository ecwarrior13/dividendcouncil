import type { FinancialDataBundle } from '../data-fetcher'
import type { AgentScoreOutput, ComparisonOutput } from '../state'

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : null
}

function dividendYieldDecimal(value: unknown): number | null {
  const n = toNumber(value)
  if (n === null || n <= 0) return null
  return n > 1 ? n / 100 : n
}

function fmtCurrency(value: number | null): string {
  if (value === null) return 'N/A'
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function fmtPercent(value: number | null): string {
  if (value === null) return 'N/A'
  return `${(value * 100).toFixed(2)}%`
}

function buildDerivedMetrics(data?: FinancialDataBundle | null): string {
  if (!data) return 'No source financial data was passed to this response phase.'

  const price = toNumber(data.profile.price)
  const pe = toNumber(data.profile.pe)
  const yieldDecimal = dividendYieldDecimal(data.profile.dividend_yield)
  const annualDividendPerShare =
    price !== null && yieldDecimal !== null ? price * yieldDecimal : null
  const pricePerDollarDividend =
    yieldDecimal !== null ? 1 / yieldDecimal : null

  return [
    `Current price: ${fmtCurrency(price)}`,
    `P/E: ${pe === null ? 'N/A' : `${pe.toFixed(1)}x`}`,
    `Dividend yield: ${fmtPercent(yieldDecimal)}`,
    `Estimated annual dividend/share from price x yield: ${fmtCurrency(annualDividendPerShare)}`,
    `Price paid for each $1 of annual dividend income: ${fmtCurrency(pricePerDollarDividend)}`,
    'If citing price paid per $1 of annual dividend income, use ONLY the value above. Formula: 1 / dividend_yield_decimal.',
  ].join('\n')
}

export function buildResponsePrompt(
  agentName: 'Aiden' | 'Lexa',
  ownScore: AgentScoreOutput,
  otherScore: AgentScoreOutput,
  comparison: ComparisonOutput,
  financialData?: FinancialDataBundle | null,
): { systemPrompt: string; userMessage: string } {
  const otherName = agentName === 'Aiden' ? 'Lexa' : 'Aiden'
  const derivedMetrics = buildDerivedMetrics(financialData)

  const systemPrompt = `You are ${agentName} from The Dividend Lab.

You have already scored ${ownScore.ticker}. Now you are seeing ${otherName}'s score and a comparison of where you agree and disagree.

Your job:
1. Address the specific disagreements identified in the comparison
2. Explain WHY you scored differently on those buckets
3. If ${otherName}'s reasoning is convincing, acknowledge it and adjust your perspective
4. If you stand firm, explain what data supports your position
5. Be specific and reference actual numbers from the financial data
6. Do not do mental math for valuation shortcuts when derived metrics are provided. Use the derived metrics exactly.

Keep your response under 300 words. Be direct, not diplomatic.`

  const userMessage = `## Your Score
${JSON.stringify(ownScore, null, 2)}

## ${otherName}'s Score
${JSON.stringify(otherScore, null, 2)}

## Comparison
${comparison.summary}

## Source Financial Data Checks
${derivedMetrics}

### Key Disagreements
${comparison.disagreements.map((d) => `- ${d.bucket}: You scored ${agentName === 'Aiden' ? d.aiden : d.lexa}, ${otherName} scored ${agentName === 'Aiden' ? d.lexa : d.aiden} (delta: ${d.delta})`).join('\n')}

### Questions to Address
${comparison.key_questions.map((q) => `- ${q}`).join('\n')}

Respond to ${otherName}'s analysis. Where do you agree? Where do you push back?`

  return { systemPrompt, userMessage }
}
