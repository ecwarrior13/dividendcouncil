-- ============================================================
-- AGENT FEEDBACK — per-session ratings from the human
-- Feeds back into agent context so they improve over time.
-- ============================================================

CREATE TABLE dn_agent_feedback (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID NOT NULL REFERENCES dn_council_sessions(id) ON DELETE CASCADE,
  agent_id    UUID NOT NULL REFERENCES dn_agents(id) ON DELETE CASCADE,
  rating      SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id, agent_id)
);

CREATE INDEX idx_agent_feedback_agent ON dn_agent_feedback(agent_id);
ALTER TABLE dn_agent_feedback ENABLE ROW LEVEL SECURITY;
