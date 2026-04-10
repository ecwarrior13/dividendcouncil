-- ============================================================
-- AGENT ACTIVITY LOG
-- Narrative progress entries from agents as they work.
-- Used for live dashboard feed and debugging agent behavior.
-- ============================================================

CREATE TABLE dn_agent_activity (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_run_id  UUID REFERENCES dn_pipeline_runs(id) ON DELETE CASCADE,
  agent_name       TEXT NOT NULL,
  activity_type    TEXT NOT NULL CHECK (activity_type IN (
                     'started', 'searching', 'found', 'evaluating',
                     'writing', 'scoring', 'revising', 'completed',
                     'error', 'info'
                   )),
  message          TEXT NOT NULL,
  metadata         JSONB,                        -- optional structured data (source count, scores, etc.)
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dn_agent_activity_pipeline ON dn_agent_activity(pipeline_run_id);
CREATE INDEX idx_dn_agent_activity_created ON dn_agent_activity(created_at DESC);

ALTER TABLE dn_agent_activity ENABLE ROW LEVEL SECURITY;
