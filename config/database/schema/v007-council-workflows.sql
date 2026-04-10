-- ============================================================
-- CONFIGURABLE COUNCIL WORKFLOWS
-- Defines the round/step structure for council debates.
-- The orchestrator reads these instead of hardcoding rounds.
-- ============================================================

CREATE TABLE dn_council_workflows (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL UNIQUE,
  description  TEXT,
  session_type TEXT NOT NULL DEFAULT 'topic_selection',
  is_default   BOOLEAN NOT NULL DEFAULT false,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE dn_council_workflow_steps (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id     UUID NOT NULL REFERENCES dn_council_workflows(id) ON DELETE CASCADE,
  round_number    SMALLINT NOT NULL,
  round_label     TEXT NOT NULL,
  step_order      SMALLINT NOT NULL,
  debate_role     TEXT NOT NULL,
  action_type     TEXT NOT NULL CHECK (action_type IN (
                    'frame', 'propose', 'challenge', 'defend', 'synthesize', 'decide'
                  )),
  prompt_hint     TEXT,
  include_vector  BOOLEAN NOT NULL DEFAULT false,
  include_brand   BOOLEAN NOT NULL DEFAULT false,
  include_pillars BOOLEAN NOT NULL DEFAULT false,
  include_weights BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workflow_id, round_number, step_order)
);

CREATE INDEX idx_workflow_steps ON dn_council_workflow_steps(workflow_id, round_number, step_order);
ALTER TABLE dn_council_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_council_workflow_steps ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER dn_council_workflows_updated_at
  BEFORE UPDATE ON dn_council_workflows
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE dn_council_sessions ADD COLUMN workflow_id UUID REFERENCES dn_council_workflows(id);

-- Seed the default workflow matching current 3-round behavior
INSERT INTO dn_council_workflows (name, description, session_type, is_default) VALUES
  ('Topic Selection v1', 'Standard 3-round debate: Propose → Challenge → Decide', 'topic_selection', true);

WITH wf AS (SELECT id FROM dn_council_workflows WHERE name = 'Topic Selection v1')
INSERT INTO dn_council_workflow_steps (workflow_id, round_number, round_label, step_order, debate_role, action_type, prompt_hint, include_vector, include_brand, include_pillars, include_weights) VALUES
  ((SELECT id FROM wf), 1, 'Proposals', 1, 'framer', 'frame', 'Analyze the content landscape and suggest directions.', false, true, true, false),
  ((SELECT id FROM wf), 1, 'Proposals', 2, 'proposer', 'propose', 'Propose your topic based on the framer''s landscape analysis.', true, false, false, false),
  ((SELECT id FROM wf), 2, 'Challenge & Defend', 1, 'challenger', 'challenge', 'Challenge the proposals from Round 1.', false, false, false, false),
  ((SELECT id FROM wf), 2, 'Challenge & Defend', 2, 'proposer', 'defend', 'Defend or adjust your position against the challenges.', true, false, false, false),
  ((SELECT id FROM wf), 2, 'Challenge & Defend', 3, 'framer', 'synthesize', 'Weigh in on which direction best serves the brand and audience.', false, true, true, false),
  ((SELECT id FROM wf), 3, 'Decision', 1, 'decider', 'decide', 'Synthesize the full debate and select the best topic.', false, true, false, true);
