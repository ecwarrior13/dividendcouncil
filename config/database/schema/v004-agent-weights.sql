-- ============================================================
-- AGENT WEIGHTS + DEBATE ROLES
-- influence_weight controls how much each agent dominates debate.
-- debate_role defines the agent's function in council sessions.
-- ============================================================

ALTER TABLE dn_agents
  ADD COLUMN influence_weight REAL NOT NULL DEFAULT 1.0
  CHECK (influence_weight >= 0.0 AND influence_weight <= 1.0);

ALTER TABLE dn_agents
  ADD COLUMN debate_role TEXT
  CHECK (debate_role IS NULL OR debate_role IN (
    'proposer', 'challenger', 'synthesizer', 'framer', 'decider'
  ));

-- Set debate roles for existing council agents
UPDATE dn_agents SET debate_role = 'framer' WHERE name = 'Strategist';
UPDATE dn_agents SET debate_role = 'proposer' WHERE name IN ('Aiden', 'Lexa');
UPDATE dn_agents SET debate_role = 'challenger', influence_weight = 0.6 WHERE name = 'Devils Advocate';
UPDATE dn_agents SET debate_role = 'decider' WHERE name = 'Editor';
