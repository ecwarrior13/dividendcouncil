// ============================================================
// Atlas Types — Hand-written from v001-migration.sql
// ============================================================

// --- Enums ---

export type AgentRole =
  | 'researcher'
  | 'social_media'
  | 'database'
  | 'talent'
  | 'council'
  | 'editor'

export type PipelineRunStatus =
  | 'topic_selection'
  | 'topic_approved'
  | 'researching'
  | 'report_ready'
  | 'report_approved'
  | 'drafting'
  | 'draft_ready'
  | 'draft_approved'
  | 'posted'
  | 'cancelled'

export type TriggerType = 'manual' | 'scheduled'

export type ResearchRunStatus = 'running' | 'complete' | 'failed'

export type SourceType =
  | 'web'
  | 'sec_filing'
  | 'finance_site'
  | 'youtube_transcript'
  | 'pdf'
  | 'other'

export type ThreadDraftStatus =
  | 'draft'
  | 'revised'
  | 'approved'
  | 'posted'
  | 'rejected'

export type CouncilSessionType =
  | 'topic_selection'
  | 'quality_review'
  | 'podcast'
  | 'debate'

export type CouncilSessionStatus = 'active' | 'complete' | 'cancelled'

export type PodcastScriptStatus = 'draft' | 'approved' | 'published'

export type TopicProposalStatus = 'queued' | 'seeded' | 'approved' | 'rejected'

export type ActionType = 'frame' | 'propose' | 'challenge' | 'defend' | 'synthesize' | 'decide'

export type JointVerdict = 'strong buy' | 'buy' | 'hold' | 'watch' | 'avoid'
export type SectorProfile = 'corp' | 'reits' | 'bdc' | 'mlp' | 'utility' | 'bank' | 'cyclical'

export type AgentActivityType =
  | 'started'
  | 'searching'
  | 'found'
  | 'evaluating'
  | 'writing'
  | 'scoring'
  | 'revising'
  | 'completed'
  | 'error'
  | 'info'

// --- Voice Profile ---

export interface VoiceProfile {
  tone: string
  style: string
  avoid: string[]
  prefer: string[]
}

// --- Pipeline Status Transitions ---

export const VALID_STATUS_TRANSITIONS: Record<PipelineRunStatus, PipelineRunStatus[]> = {
  topic_selection: ['topic_approved', 'cancelled'],
  topic_approved: ['researching', 'cancelled'],
  researching: ['report_ready', 'cancelled'],
  report_ready: ['report_approved', 'cancelled'],
  report_approved: ['drafting', 'cancelled'],
  drafting: ['draft_ready', 'cancelled'],
  draft_ready: ['draft_approved', 'cancelled'],
  draft_approved: ['posted', 'cancelled'],
  posted: [],
  cancelled: [],
}

// --- Table Row Types ---

export type DebateRole = 'proposer' | 'challenger' | 'synthesizer' | 'framer' | 'decider'

export interface AgentRow {
  id: string
  name: string
  role: AgentRole
  system_prompt: string
  backstory: string | null
  personality: string | null
  voice_profile: VoiceProfile | null
  is_active: boolean
  influence_weight: number
  debate_role: DebateRole | null
  created_at: string
  updated_at: string
}

export interface AgentPositionRow {
  id: string
  agent_id: string
  ticker: string | null
  topic: string
  stance: string
  reasoning: string
  confidence: number
  source_session_id: string | null
  created_at: string
}

export interface PipelineRunRow {
  id: string
  trigger_type: TriggerType
  status: PipelineRunStatus
  topic: string | null
  notes: string | null
  pillar_id: string | null
  created_at: string
  updated_at: string
  completed_at: string | null
}

export interface ResearchRunRow {
  id: string
  pipeline_run_id: string
  topic: string
  status: ResearchRunStatus
  human_approved: boolean
  created_at: string
  completed_at: string | null
}

export interface ResearchSourceRow {
  id: string
  research_run_id: string
  url: string | null
  source_type: SourceType
  title: string | null
  credibility: number | null
  summary: string | null
  raw_content: string | null
  created_at: string
}

export interface ResearchReportRow {
  id: string
  research_run_id: string
  rank: 1 | 2 | 3
  title: string
  summary: string
  key_points: string[] | null
  recommendation: string | null
  contradictions: string | null
  human_approved: boolean
  created_at: string
}

export interface ThreadDraftRow {
  id: string
  pipeline_run_id: string
  research_report_id: string | null
  version: number
  tweets: string[]
  authenticity_score: number | null
  voice_score: number | null
  overall_score: number | null
  audit_notes: string | null
  ai_patterns_flagged: string[] | null
  status: ThreadDraftStatus
  created_at: string
  updated_at: string
}

export interface ThreadRevisionRow {
  id: string
  draft_id: string
  previous_version: number
  new_version: number
  reason: string | null
  score_delta: number | null
  created_at: string
}

export interface PostedThreadRow {
  id: string
  draft_id: string
  pipeline_run_id: string
  x_post_id: string | null
  content_snapshot: string[]
  posted_at: string
}

export interface EngagementMetricsRow {
  id: string
  posted_thread_id: string
  likes: number
  replies: number
  reposts: number
  impressions: number
  link_clicks: number
  profile_visits: number
  measured_at: string
}

export interface CouncilSessionRow {
  id: string
  session_type: CouncilSessionType
  pipeline_run_id: string | null
  workflow_id: string | null
  topic: string | null
  pillar_id: string | null
  status: CouncilSessionStatus
  decision: string | null
  created_at: string
  completed_at: string | null
}

export interface CouncilTurnRow {
  id: string
  session_id: string
  agent_id: string | null
  agent_name: string
  content: string
  turn_order: number
  created_at: string
}

export interface PodcastScriptRow {
  id: string
  council_session_id: string | null
  pipeline_run_id: string | null
  title: string
  description: string | null
  script: { speaker: string; line: string; notes?: string }[]
  status: PodcastScriptStatus
  created_at: string
  updated_at: string
}

export interface AgentEmbeddingRow {
  id: string
  agent_id: string
  session_id: string | null
  content: string
  summary: string | null
  topic: string | null
  embedding: number[]
  created_at: string
}

export interface AgentActivityRow {
  id: string
  pipeline_run_id: string | null
  agent_name: string
  activity_type: AgentActivityType
  message: string
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface ContentPillarRow {
  id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: string
}

export interface TopicProposalRow {
  id: string
  topic: string
  pillar_id: string | null
  status: TopicProposalStatus
  proposed_by: string
  notes: string | null
  created_at: string
}

export interface WorkflowRow {
  id: string
  name: string
  description: string | null
  session_type: string
  is_default: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface WorkflowStepRow {
  id: string
  workflow_id: string
  round_number: number
  round_label: string
  step_order: number
  debate_role: string
  action_type: ActionType
  prompt_hint: string | null
  include_vector: boolean
  include_brand: boolean
  include_pillars: boolean
  include_weights: boolean
  created_at: string
}

export type WorkflowInsert = {
  name: string
  description?: string | null
  session_type?: string
  is_default?: boolean
  is_active?: boolean
}

export type WorkflowStepInsert = {
  workflow_id: string
  round_number: number
  round_label: string
  step_order: number
  debate_role: string
  action_type: ActionType
  prompt_hint?: string | null
  include_vector?: boolean
  include_brand?: boolean
  include_pillars?: boolean
  include_weights?: boolean
}

export interface StockAnalysisRow {
  id: string
  ticker: string
  pipeline_run_id: string | null
  status: 'running' | 'complete' | 'failed'
  aiden_score: number | null
  aiden_confidence: number | null
  aiden_buckets: Record<string, number> | null
  aiden_hard_flags: string[] | null
  aiden_soft_flags: string[] | null
  aiden_rationale: string | null
  lexa_score: number | null
  lexa_confidence: number | null
  lexa_buckets: Record<string, number> | null
  lexa_hard_flags: string[] | null
  lexa_soft_flags: string[] | null
  lexa_rationale: string | null
  debate_transcript: Array<{ agent: string; phase: string; content: string }> | null
  joint_verdict: JointVerdict | null
  joint_rationale: string | null
  sector_profile: SectorProfile | null
  langgraph_thread: string | null
  created_at: string
  completed_at: string | null
}

export type StockAnalysisInsert = {
  ticker: string
  pipeline_run_id?: string | null
  status?: 'running' | 'complete' | 'failed'
  langgraph_thread?: string | null
}

export type StockAnalysisUpdate = Partial<Omit<StockAnalysisRow, 'id' | 'created_at'>>

// --- Insert Types (omit server-generated fields) ---

export type AgentInsert = Omit<AgentRow, 'id' | 'created_at' | 'updated_at'> & {
  id?: string
}

export type AgentPositionInsert = Omit<AgentPositionRow, 'id' | 'created_at' | 'ticker'> & {
  id?: string
  ticker?: string | null
}

export type PipelineRunInsert = {
  trigger_type: TriggerType
  topic?: string | null
  notes?: string | null
  pillar_id?: string | null
  status?: PipelineRunStatus
}

export type ResearchRunInsert = {
  pipeline_run_id: string
  topic: string
  status?: ResearchRunStatus
}

export type ResearchSourceInsert = Omit<ResearchSourceRow, 'id' | 'created_at'> & {
  id?: string
}

export type ResearchReportInsert = Omit<ResearchReportRow, 'id' | 'created_at' | 'human_approved'> & {
  id?: string
  human_approved?: boolean
}

export type ThreadDraftInsert = {
  pipeline_run_id: string
  research_report_id?: string | null
  version?: number
  tweets: string[]
  authenticity_score?: number | null
  voice_score?: number | null
  overall_score?: number | null
  audit_notes?: string | null
  ai_patterns_flagged?: string[] | null
  status?: ThreadDraftStatus
}

export type ThreadRevisionInsert = Omit<ThreadRevisionRow, 'id' | 'created_at'> & {
  id?: string
}

export type PostedThreadInsert = {
  draft_id: string
  pipeline_run_id: string
  x_post_id?: string | null
  content_snapshot: string[]
}

export type EngagementMetricsInsert = Omit<EngagementMetricsRow, 'id' | 'measured_at'> & {
  id?: string
}

export type CouncilSessionInsert = {
  session_type: CouncilSessionType
  pipeline_run_id?: string | null
  workflow_id?: string | null
  topic?: string | null
  pillar_id?: string | null
  status?: CouncilSessionStatus
  decision?: string | null
}

export type CouncilTurnInsert = Omit<CouncilTurnRow, 'id' | 'created_at'> & {
  id?: string
}

export type PodcastScriptInsert = {
  council_session_id?: string | null
  pipeline_run_id?: string | null
  title: string
  description?: string | null
  script: { speaker: string; line: string; notes?: string }[]
  status?: PodcastScriptStatus
}

export type AgentEmbeddingInsert = {
  agent_id: string
  session_id?: string | null
  content: string
  summary?: string | null
  topic?: string | null
  embedding: number[]
}

export interface AgentFeedbackRow {
  id: string
  session_id: string
  agent_id: string
  rating: number
  notes: string | null
  created_at: string
}

export type AgentFeedbackInsert = {
  session_id: string
  agent_id: string
  rating: number
  notes?: string | null
}

export type AgentActivityInsert = {
  pipeline_run_id?: string | null
  agent_name: string
  activity_type: AgentActivityType
  message: string
  metadata?: Record<string, unknown> | null
}

export type TopicProposalInsert = {
  topic: string
  pillar_id?: string | null
  status?: TopicProposalStatus
  proposed_by?: string
  notes?: string | null
}

// --- Update Types (all fields optional) ---

export type AgentUpdate = Partial<Omit<AgentRow, 'id' | 'created_at' | 'updated_at'>>
export type AgentPositionUpdate = Partial<Omit<AgentPositionRow, 'id' | 'created_at'>>
export type PipelineRunUpdate = Partial<Omit<PipelineRunRow, 'id' | 'created_at' | 'updated_at'>>
export type ResearchRunUpdate = Partial<Omit<ResearchRunRow, 'id' | 'created_at'>>
export type ResearchSourceUpdate = Partial<Omit<ResearchSourceRow, 'id' | 'created_at'>>
export type ResearchReportUpdate = Partial<Omit<ResearchReportRow, 'id' | 'created_at'>>
export type ThreadDraftUpdate = Partial<Omit<ThreadDraftRow, 'id' | 'created_at' | 'updated_at'>>
export type ThreadRevisionUpdate = Partial<Omit<ThreadRevisionRow, 'id' | 'created_at'>>
export type PostedThreadUpdate = Partial<Omit<PostedThreadRow, 'id' | 'posted_at'>>
export type EngagementMetricsUpdate = Partial<Omit<EngagementMetricsRow, 'id' | 'measured_at'>>
export type CouncilSessionUpdate = Partial<Omit<CouncilSessionRow, 'id' | 'created_at'>>
export type CouncilTurnUpdate = Partial<Omit<CouncilTurnRow, 'id' | 'created_at'>>
export type PodcastScriptUpdate = Partial<Omit<PodcastScriptRow, 'id' | 'created_at' | 'updated_at'>>
