-- ============================================================
-- WORKFLOW AGENT ROSTER
-- Optional per-workflow agent selection.
-- If a workflow has entries here, only those agents participate.
-- If empty, all active agents with matching debate_role participate.
-- ============================================================

CREATE TABLE dn_workflow_agents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES dn_council_workflows(id) ON DELETE CASCADE,
  agent_id    UUID NOT NULL REFERENCES dn_agents(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workflow_id, agent_id)
);

CREATE INDEX idx_workflow_agents_workflow ON dn_workflow_agents(workflow_id);
ALTER TABLE dn_workflow_agents ENABLE ROW LEVEL SECURITY;
