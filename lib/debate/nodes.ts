// All 7 graph nodes for the stock debate
import { logAgentActivity } from '@/lib/supabase/atlas'
import { callAgent } from '@/lib/council/claude'
import { ensureFinancialData } from './data-fetcher'
import { buildAidenScoringPrompt } from './prompts/aiden-scoring'
import { buildLexaScoringPrompt } from './prompts/lexa-scoring'
import { buildResponsePrompt } from './prompts/response'
import { buildFinalPrompt } from './prompts/final'
import type { DebateStateType, AgentScoreOutput, ComparisonOutput } from './state'

function parseJSON<T>(text: string): T {
  // Strip markdown code fences if present
  const cleaned = text.replace(/^```json?\n?/m, '').replace(/\n?```$/m, '').trim()
  return JSON.parse(cleaned)
}

// --- Node 1: Fetch Data ---
export async function fetchDataNode(state: DebateStateType) {
  console.log(`\n── Phase 1: Fetching financial data for ${state.ticker} ──`)

  await logAgentActivity({
    agent_name: 'Debate',
    activity_type: 'searching',
    message: `Fetching financial data for ${state.ticker}...`,
  })

  const financialData = await ensureFinancialData(state.ticker)

  await logAgentActivity({
    agent_name: 'Debate',
    activity_type: 'found',
    message: `Data loaded: ${financialData.incomeStatements.length} income statements, ${financialData.balanceSheets.length} balance sheets, ${financialData.cashFlows.length} cash flows`,
  })

  return { financialData }
}

// --- Node 2: Aiden Scores ---
export async function aidenScoreNode(state: DebateStateType) {
  console.log('\n── Phase 2a: Aiden scoring ──')

  await logAgentActivity({
    agent_name: 'Aiden',
    activity_type: 'scoring',
    message: `Aiden analyzing ${state.ticker} for dividend safety...`,
  })

  const { systemPrompt, userMessage } = buildAidenScoringPrompt(state.financialData!)
  const response = await callAgent(systemPrompt, userMessage, { maxTokens: 3000 })

  const aidenScore = parseJSON<AgentScoreOutput>(response)
  console.log(`  Aiden score: ${aidenScore.final_score}/100 (confidence: ${aidenScore.confidence})`)

  await logAgentActivity({
    agent_name: 'Aiden',
    activity_type: 'writing',
    message: `Aiden scored ${state.ticker}: ${aidenScore.final_score}/100 — ${aidenScore.hard_flags.length} hard flags`,
  })

  return {
    aidenScore,
    transcript: [{ agent: 'Aiden', phase: 'score', content: response }],
  }
}

// --- Node 3: Lexa Scores ---
export async function lexaScoreNode(state: DebateStateType) {
  console.log('\n── Phase 2b: Lexa scoring ──')

  await logAgentActivity({
    agent_name: 'Lexa',
    activity_type: 'scoring',
    message: `Lexa analyzing ${state.ticker} for dividend growth...`,
  })

  const { systemPrompt, userMessage } = buildLexaScoringPrompt(state.financialData!)
  const response = await callAgent(systemPrompt, userMessage, { maxTokens: 3000 })

  const lexaScore = parseJSON<AgentScoreOutput>(response)
  console.log(`  Lexa score: ${lexaScore.final_score}/100 (confidence: ${lexaScore.confidence})`)

  await logAgentActivity({
    agent_name: 'Lexa',
    activity_type: 'writing',
    message: `Lexa scored ${state.ticker}: ${lexaScore.final_score}/100 — ${lexaScore.hard_flags.length} hard flags`,
  })

  return {
    lexaScore,
    transcript: [{ agent: 'Lexa', phase: 'score', content: response }],
  }
}

// Shared dimensions both agents evaluate (different weights, but same underlying data)
const SHARED_DIMENSIONS: Record<string, { aiden: string; lexa: string }> = {
  'payout/coverage': { aiden: 'dividend_coverage', lexa: 'safety_floor' },
}

// --- Node 4: Compare ---
export async function compareNode(state: DebateStateType) {
  console.log('\n── Phase 3: Comparing scores ──')

  const aiden = state.aidenScore!
  const lexa = state.lexaScore!

  const agreements: string[] = []
  const disagreements: Array<{ bucket: string; aiden: number; lexa: number; delta: number }> = []

  // Only compare genuinely shared dimensions
  for (const [label, mapping] of Object.entries(SHARED_DIMENSIONS)) {
    const aidenVal = aiden.bucket_scores[mapping.aiden] ?? 0
    const lexaVal = lexa.bucket_scores[mapping.lexa] ?? 0
    const delta = Math.abs(aidenVal - lexaVal)
    if (delta > 20) {
      disagreements.push({ bucket: label, aiden: aidenVal, lexa: lexaVal, delta })
    } else {
      agreements.push(`${label}: Aiden ${aidenVal} (${mapping.aiden}), Lexa ${lexaVal} (${mapping.lexa}) — aligned`)
    }
  }

  // Cross-check: if Lexa's safety_floor is low but Aiden's overall is high, that's noteworthy
  const lexaSafety = lexa.bucket_scores['safety_floor'] ?? 0
  const aidenOverall = aiden.final_score
  if (lexaSafety < 50 && aidenOverall > 70) {
    disagreements.push({
      bucket: 'safety assessment',
      aiden: aidenOverall,
      lexa: lexaSafety,
      delta: aidenOverall - lexaSafety,
    })
  }

  const key_questions = disagreements.map(
    (d) => `On ${d.bucket}: Aiden sees ${d.aiden}, Lexa sees ${d.lexa} — what explains the ${d.delta}pt gap?`,
  )

  // Note: we no longer compute a "delta" between Aiden and Lexa overall scores
  // because they measure different things (safety vs growth opportunity)
  const summary = `${state.ticker} — Safety: ${aiden.final_score}/100 (Aiden). Growth opportunity: ${lexa.final_score}/100 (Lexa). ${disagreements.length} shared-dimension disagreements, ${agreements.length} aligned. Hard flags: Aiden ${aiden.hard_flags.length}, Lexa ${lexa.hard_flags.length}.`

  const comparison: ComparisonOutput = { agreements, disagreements, key_questions, summary }

  console.log(`  ${summary}`)

  await logAgentActivity({
    agent_name: 'Debate',
    activity_type: 'evaluating',
    message: summary,
  })

  return {
    comparison,
    transcript: [{ agent: 'System', phase: 'compare', content: summary }],
  }
}

// --- Node 5: Aiden Responds ---
export async function aidenRespondNode(state: DebateStateType) {
  console.log('\n── Phase 4a: Aiden responds to Lexa ──')

  await logAgentActivity({
    agent_name: 'Aiden',
    activity_type: 'evaluating',
    message: `Aiden reviewing Lexa's score and comparison...`,
  })

  const { systemPrompt, userMessage } = buildResponsePrompt(
    'Aiden', state.aidenScore!, state.lexaScore!, state.comparison!,
  )
  const response = await callAgent(systemPrompt, userMessage, { maxTokens: 1500 })

  const preview = response.slice(0, 120).replace(/\n/g, ' ')
  console.log(`  Aiden: ${preview}...`)

  await logAgentActivity({
    agent_name: 'Aiden',
    activity_type: 'writing',
    message: `Aiden's response: ${preview}...`,
  })

  return {
    aidenResponse: response,
    transcript: [{ agent: 'Aiden', phase: 'respond', content: response }],
  }
}

// --- Node 6: Lexa Responds ---
export async function lexaRespondNode(state: DebateStateType) {
  console.log('\n── Phase 4b: Lexa responds to Aiden ──')

  await logAgentActivity({
    agent_name: 'Lexa',
    activity_type: 'evaluating',
    message: `Lexa reviewing Aiden's score and comparison...`,
  })

  const { systemPrompt, userMessage } = buildResponsePrompt(
    'Lexa', state.lexaScore!, state.aidenScore!, state.comparison!,
  )
  const response = await callAgent(systemPrompt, userMessage, { maxTokens: 1500 })

  const preview = response.slice(0, 120).replace(/\n/g, ' ')
  console.log(`  Lexa: ${preview}...`)

  await logAgentActivity({
    agent_name: 'Lexa',
    activity_type: 'writing',
    message: `Lexa's response: ${preview}...`,
  })

  return {
    lexaResponse: response,
    transcript: [{ agent: 'Lexa', phase: 'respond', content: response }],
  }
}

// --- Two-Axis Classification ---

type FitLevel = 'high' | 'moderate' | 'low'

function classifyFit(score: number, hasHardFlags: boolean): FitLevel {
  if (hasHardFlags && score < 60) return 'low'
  if (score >= 70) return 'high'
  if (score >= 50) return 'moderate'
  return 'low'
}

// Safety × Growth matrix
const PROFILE_MATRIX: Record<string, Record<string, string>> = {
  high:     { high: 'premium fit',          moderate: 'safety focus',        low: 'defensive compounder' },
  moderate: { high: 'growth focus',         moderate: 'moderate fit',        low: 'caution' },
  low:      { high: 'speculative grower',   moderate: 'caution',             low: 'weak fit' },
}

function computeProfile(
  aidenScore: AgentScoreOutput,
  lexaScore: AgentScoreOutput,
): { safetyFit: FitLevel; growthFit: FitLevel; profile: string } {
  const safetyFit = classifyFit(aidenScore.final_score, aidenScore.hard_flags.length > 0)
  const growthFit = classifyFit(lexaScore.final_score, lexaScore.hard_flags.length > 0)
  const profile = PROFILE_MATRIX[safetyFit][growthFit]
  return { safetyFit, growthFit, profile }
}

// --- Node 7: Final Assessment ---
export async function finalAssessmentNode(state: DebateStateType) {
  console.log('\n── Phase 5: Joint assessment ──')

  const aiden = state.aidenScore!
  const lexa = state.lexaScore!

  // Profile is determined by rules on two axes, not by the LLM
  const { safetyFit, growthFit, profile } = computeProfile(aiden, lexa)
  console.log(`  Safety: ${safetyFit} (${aiden.final_score}), Growth: ${growthFit} (${lexa.final_score}) → ${profile}`)

  await logAgentActivity({
    agent_name: 'Debate',
    activity_type: 'writing',
    message: `Profile: ${profile} (safety: ${safetyFit}, growth: ${growthFit}). Generating rationale...`,
  })

  // LLM writes the rationale around the pre-determined profile
  const { systemPrompt, userMessage } = buildFinalPrompt(
    state.ticker,
    aiden,
    lexa,
    state.comparison!,
    state.aidenResponse!,
    state.lexaResponse!,
    profile,
    safetyFit,
    growthFit,
  )
  const rationale = await callAgent(systemPrompt, userMessage, { maxTokens: 1500 })

  const jointAssessment = {
    safety_fit: safetyFit,
    growth_fit: growthFit,
    stock_profile: profile,
    rationale,
    aiden_final_score: aiden.final_score,
    lexa_final_score: lexa.final_score,
  }

  console.log(`  Aiden: ${aiden.final_score}, Lexa: ${lexa.final_score}`)

  await logAgentActivity({
    agent_name: 'Debate',
    activity_type: 'completed',
    message: `${state.ticker}: ${profile} — Safety: ${safetyFit} (${aiden.final_score}), Growth: ${growthFit} (${lexa.final_score})`,
  })

  return {
    jointAssessment,
    transcript: [{ agent: 'System', phase: 'final', content: `Profile: ${profile}\nSafety: ${safetyFit} | Growth: ${growthFit}\n\n${rationale}` }],
  }
}
