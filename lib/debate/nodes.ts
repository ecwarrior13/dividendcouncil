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

// --- Node 4: Compare ---
export async function compareNode(state: DebateStateType) {
  console.log('\n── Phase 3: Comparing scores ──')

  const aiden = state.aidenScore!
  const lexa = state.lexaScore!

  // Build comparison from bucket-level differences
  const aidenBuckets = Object.entries(aiden.bucket_scores)
  const lexaBuckets = Object.entries(lexa.bucket_scores)
  const allBucketNames = new Set([...aidenBuckets.map(([k]) => k), ...lexaBuckets.map(([k]) => k)])

  const agreements: string[] = []
  const disagreements: Array<{ bucket: string; aiden: number; lexa: number; delta: number }> = []

  for (const bucket of allBucketNames) {
    const aidenVal = aiden.bucket_scores[bucket] ?? 0
    const lexaVal = lexa.bucket_scores[bucket] ?? 0
    const delta = Math.abs(aidenVal - lexaVal)
    if (delta > 15) {
      disagreements.push({ bucket, aiden: aidenVal, lexa: lexaVal, delta })
    } else {
      agreements.push(`${bucket}: Aiden ${aidenVal}, Lexa ${lexaVal} (aligned)`)
    }
  }

  // Generate key questions from disagreements
  const key_questions = disagreements.map(
    (d) => `Why did ${d.aiden > d.lexa ? 'Aiden' : 'Lexa'} rate ${d.bucket} ${d.delta} points higher?`,
  )

  const scoreDelta = Math.abs(aiden.final_score - lexa.final_score)
  const summary = `Aiden scored ${state.ticker} ${aiden.final_score}/100 (safety). Lexa scored ${lexa.final_score}/100 (growth). Delta: ${scoreDelta} points. ${disagreements.length} bucket disagreements (>15pt gap), ${agreements.length} areas of alignment.`

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

// --- Node 7: Final Assessment ---
export async function finalAssessmentNode(state: DebateStateType) {
  console.log('\n── Phase 5: Joint assessment ──')

  await logAgentActivity({
    agent_name: 'Debate',
    activity_type: 'writing',
    message: `Synthesizing final verdict for ${state.ticker}...`,
  })

  const { systemPrompt, userMessage } = buildFinalPrompt(
    state.ticker,
    state.aidenScore!,
    state.lexaScore!,
    state.comparison!,
    state.aidenResponse!,
    state.lexaResponse!,
  )
  const response = await callAgent(systemPrompt, userMessage, { maxTokens: 2000 })

  const jointAssessment = parseJSON<typeof state.jointAssessment>(response)

  console.log(`\n  Verdict: ${jointAssessment!.verdict.toUpperCase()}`)
  console.log(`  Aiden final: ${jointAssessment!.aiden_final_score}, Lexa final: ${jointAssessment!.lexa_final_score}`)

  await logAgentActivity({
    agent_name: 'Debate',
    activity_type: 'completed',
    message: `${state.ticker} verdict: ${jointAssessment!.verdict} — Aiden: ${jointAssessment!.aiden_final_score}, Lexa: ${jointAssessment!.lexa_final_score}`,
  })

  return {
    jointAssessment,
    transcript: [{ agent: 'System', phase: 'final', content: response }],
  }
}
