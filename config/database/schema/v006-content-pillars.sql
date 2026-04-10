-- ============================================================
-- CONTENT PILLARS + TOPIC PROPOSALS
-- Pillars map to the brand learning journey.
-- Proposals let humans queue topic ideas for council debate.
-- ============================================================

CREATE TABLE dn_content_pillars (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE dn_topic_proposals (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic         TEXT NOT NULL,
  pillar_id     UUID REFERENCES dn_content_pillars(id),
  status        TEXT NOT NULL DEFAULT 'queued' CHECK (status IN (
                  'queued', 'seeded', 'approved', 'rejected'
                )),
  proposed_by   TEXT NOT NULL DEFAULT 'human',
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_topic_proposals_status ON dn_topic_proposals(status);
CREATE INDEX idx_topic_proposals_pillar ON dn_topic_proposals(pillar_id);
ALTER TABLE dn_topic_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_content_pillars ENABLE ROW LEVEL SECURITY;

-- Add pillar tracking to existing tables
ALTER TABLE dn_pipeline_runs ADD COLUMN pillar_id UUID REFERENCES dn_content_pillars(id);
ALTER TABLE dn_council_sessions ADD COLUMN pillar_id UUID REFERENCES dn_content_pillars(id);

-- Seed the 5 pillars
INSERT INTO dn_content_pillars (name, description) VALUES
  ('Foundations', 'Core concepts for beginners — what is a dividend, payout ratios, DRIP basics, how dividends are taxed'),
  ('Analysis', 'Deep dives on specific tickers, sectors, or ETFs — SCHD breakdown, REIT analysis, dividend aristocrat profiles'),
  ('Strategy', 'Portfolio construction, allocation, income vs growth tradeoffs, reinvestment strategies'),
  ('Market Context', 'Timely topics tied to current events — rate changes, earnings season, ex-dividend dates, sector rotation'),
  ('Advanced', 'Tax optimization, international dividends, preferred stocks, covered calls on dividend stocks');
