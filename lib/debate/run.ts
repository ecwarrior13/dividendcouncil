import {
  createStockAnalysis,
  updateStockAnalysis,
  logAgentActivity,
} from '@/lib/supabase/atlas'
import { compileDebateGraph } from './graph'
import type { JointAssessment } from './state'
import type { StockProfile } from '@/lib/supabase/types'

export interface StockDebateResult {
  analysisId: string
  ticker: string
  aidenScore: number
  lexaScore: number
  safetyFit: string
  growthFit: string
  profile: string
  rationale: string
}

export async function runStockDebate(
  ticker: string,
  options?: { pipelineRunId?: string },
): Promise<StockDebateResult> {
  const symbol = ticker.toUpperCase()

  // Create analysis record
  const analysis = await createStockAnalysis({
    ticker: symbol,
    pipeline_run_id: options?.pipelineRunId ?? null,
    status: 'running',
  })

  await logAgentActivity({
    agent_name: 'Debate',
    activity_type: 'started',
    message: `Stock debate started for ${symbol}`,
    metadata: { analysis_id: analysis.id },
  })

  try {
    // Compile and run the LangGraph
    const graph = compileDebateGraph()
    const threadId = `debate-${symbol}-${Date.now()}`

    const result = await graph.invoke(
      {
        ticker: symbol,
        analysisId: analysis.id,
      },
      {
        configurable: { thread_id: threadId },
      },
    )

    // Extract results from final state
    const aidenScore = result.aidenScore!
    const lexaScore = result.lexaScore!
    const joint = result.jointAssessment as JointAssessment

    // Update analysis with full results
    await updateStockAnalysis(analysis.id, {
      status: 'complete',
      aiden_score: aidenScore.final_score,
      aiden_confidence: aidenScore.confidence,
      aiden_buckets: aidenScore.bucket_scores,
      aiden_hard_flags: aidenScore.hard_flags,
      aiden_soft_flags: aidenScore.soft_flags,
      aiden_rationale: aidenScore.rationale,
      lexa_score: lexaScore.final_score,
      lexa_confidence: lexaScore.confidence,
      lexa_buckets: lexaScore.bucket_scores,
      lexa_hard_flags: lexaScore.hard_flags,
      lexa_soft_flags: lexaScore.soft_flags,
      lexa_rationale: lexaScore.rationale,
      debate_transcript: result.transcript,
      safety_fit: joint.safety_fit,
      growth_fit: joint.growth_fit,
      stock_profile: joint.stock_profile as StockProfile,
      joint_rationale: joint.rationale,
      sector_profile: aidenScore.sector_profile,
      langgraph_thread: threadId,
      completed_at: new Date().toISOString(),
    })

    return {
      analysisId: analysis.id,
      ticker: symbol,
      aidenScore: joint.aiden_final_score,
      lexaScore: joint.lexa_final_score,
      safetyFit: joint.safety_fit,
      growthFit: joint.growth_fit,
      profile: joint.stock_profile,
      rationale: joint.rationale,
    }
  } catch (err) {
    await updateStockAnalysis(analysis.id, { status: 'failed' })
    await logAgentActivity({
      agent_name: 'Debate',
      activity_type: 'error',
      message: `Stock debate failed for ${symbol}: ${(err as Error).message}`,
      metadata: { analysis_id: analysis.id },
    })
    throw err
  }
}
