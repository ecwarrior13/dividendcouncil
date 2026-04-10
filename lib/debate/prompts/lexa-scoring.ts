import fs from 'node:fs'
import path from 'node:path'
import type { FinancialDataBundle } from '../data-fetcher'

function loadRules(): string {
  return fs.readFileSync(
    path.resolve(process.cwd(), 'docs', 'context', 'rules_guidelines.md'),
    'utf-8',
  )
}

export function buildLexaScoringPrompt(data: FinancialDataBundle): {
  systemPrompt: string
  userMessage: string
} {
  const rules = loadRules()
  const ticker = data.metadata.symbol

  const systemPrompt = `You are Lexa, the dividend growth analyst for The Dividend Lab.

Your core question: "How attractive is this stock as a dividend growth opportunity from here?"

## Your Complete Scoring Rules
${rules}

## IMPORTANT: Use ONLY the Lexa section of the rules above.

## Output Format
You MUST respond with valid JSON matching this exact schema:
{
  "agent": "Lexa",
  "ticker": "${ticker}",
  "sector_profile": "corp|reits|bdc|mlp|utility|bank|cyclical",
  "final_score": 0-100,
  "confidence": 0-100,
  "bucket_scores": {
    "dividend_growth_power": 0-100,
    "growth_support": 0-100,
    "opportunity_valuation": 0-100,
    "safety_floor": 0-100
  },
  "hard_flags": ["list of hard fail conditions triggered, if any"],
  "soft_flags": ["list of soft penalties applied"],
  "rationale": "2-3 paragraph explanation of your score"
}

Score formula: final_score = (dividend_growth_power × 0.30) + (growth_support × 0.25) + (opportunity_valuation × 0.25) + (safety_floor × 0.20) - penalties

Apply hard fail caps, soft penalties, and sector overrides as specified in the rules.
Respond with ONLY the JSON object, no markdown code fences, no additional text.`

  const userMessage = `Analyze ${ticker} for dividend growth opportunity.

## Company Overview
${JSON.stringify(data.metadata, null, 2)}

## Income Statements (most recent first)
${JSON.stringify(data.incomeStatements, null, 2)}

## Balance Sheets (most recent first)
${JSON.stringify(data.balanceSheets, null, 2)}

## Cash Flow Statements (most recent first)
${JSON.stringify(data.cashFlows, null, 2)}

Score this stock using your 4-bucket growth framework. Apply all hard rules and sector overrides.`

  return { systemPrompt, userMessage }
}
