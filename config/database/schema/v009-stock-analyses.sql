-- ============================================================
-- STOCK ANALYSES — Aiden & Lexa debate results
-- Stores independent scores, debate transcript, and joint verdict.
-- Linked optionally to pipeline runs for research integration.
-- ============================================================

CREATE TABLE dn_stock_analyses (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker            TEXT NOT NULL,
  pipeline_run_id   UUID REFERENCES dn_pipeline_runs(id),
  status            TEXT NOT NULL DEFAULT 'running' CHECK (status IN (
                      'running', 'complete', 'failed'
                    )),
  -- Aiden's scores
  aiden_score       SMALLINT CHECK (aiden_score BETWEEN 0 AND 100),
  aiden_confidence  SMALLINT CHECK (aiden_confidence BETWEEN 0 AND 100),
  aiden_buckets     JSONB,
  aiden_hard_flags  JSONB,
  aiden_soft_flags  JSONB,
  aiden_rationale   TEXT,
  -- Lexa's scores
  lexa_score        SMALLINT CHECK (lexa_score BETWEEN 0 AND 100),
  lexa_confidence   SMALLINT CHECK (lexa_confidence BETWEEN 0 AND 100),
  lexa_buckets      JSONB,
  lexa_hard_flags   JSONB,
  lexa_soft_flags   JSONB,
  lexa_rationale    TEXT,
  -- Debate
  debate_transcript JSONB,
  -- Joint assessment
  joint_verdict     TEXT,
  joint_rationale   TEXT,
  sector_profile    TEXT,
  -- Meta
  langgraph_thread  TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at      TIMESTAMPTZ
);

CREATE INDEX idx_stock_analyses_ticker ON dn_stock_analyses(ticker);
CREATE INDEX idx_stock_analyses_pipeline ON dn_stock_analyses(pipeline_run_id) WHERE pipeline_run_id IS NOT NULL;
ALTER TABLE dn_stock_analyses ENABLE ROW LEVEL SECURITY;
