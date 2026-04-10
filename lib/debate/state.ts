import { Annotation } from '@langchain/langgraph'
import type { FinancialDataBundle } from './data-fetcher'
import type { SectorProfile } from '@/lib/supabase/types'

export interface AgentScoreOutput {
  agent: 'Aiden' | 'Lexa'
  ticker: string
  sector_profile: SectorProfile
  final_score: number
  confidence: number
  bucket_scores: Record<string, number>
  hard_flags: string[]
  soft_flags: string[]
  rationale: string
}

export interface ComparisonOutput {
  agreements: string[]
  disagreements: Array<{ bucket: string; aiden: number; lexa: number; delta: number }>
  key_questions: string[]
  summary: string
}

export interface JointAssessment {
  verdict: 'strong buy' | 'buy' | 'hold' | 'watch' | 'avoid'
  rationale: string
  aiden_final_score: number
  lexa_final_score: number
}

export interface TranscriptEntry {
  agent: string
  phase: string
  content: string
}

export const DebateState = Annotation.Root({
  ticker: Annotation<string>,
  analysisId: Annotation<string>,
  financialData: Annotation<FinancialDataBundle | null>({
    reducer: (_prev, next) => next,
    default: () => null,
  }),
  aidenScore: Annotation<AgentScoreOutput | null>({
    reducer: (_prev, next) => next,
    default: () => null,
  }),
  lexaScore: Annotation<AgentScoreOutput | null>({
    reducer: (_prev, next) => next,
    default: () => null,
  }),
  comparison: Annotation<ComparisonOutput | null>({
    reducer: (_prev, next) => next,
    default: () => null,
  }),
  aidenResponse: Annotation<string | null>({
    reducer: (_prev, next) => next,
    default: () => null,
  }),
  lexaResponse: Annotation<string | null>({
    reducer: (_prev, next) => next,
    default: () => null,
  }),
  jointAssessment: Annotation<JointAssessment | null>({
    reducer: (_prev, next) => next,
    default: () => null,
  }),
  transcript: Annotation<TranscriptEntry[]>({
    reducer: (prev, next) => [...prev, ...next],
    default: () => [],
  }),
})

export type DebateStateType = typeof DebateState.State
