-- ============================================================
-- CONTENT ENGINE — INITIAL SCHEMA
-- Designed by Atlas
-- All dn_agents access this database via TypeScript functions only.
-- Direct SQL queries from agents are not permitted.
-- Service role key required. Never expose to client.
-- ============================================================


-- ============================================================
-- AGENTS
-- Persistent identity for every AI agent in the system.
-- Aiden, Lexa, Clark, Kelly, Devil's Advocate, Strategist, Editor.
-- Atlas manages his own record but does not call himself.
-- ============================================================

CREATE TABLE dn_agents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL UNIQUE,
  role            TEXT NOT NULL CHECK (role IN (
                    'researcher', 'social_media', 'database',
                    'talent', 'council', 'editor'
                  )),
  system_prompt   TEXT NOT NULL,
  backstory       TEXT,                        -- formative narrative
  personality     TEXT,                        -- archetype label
  voice_profile   JSONB,                       -- { tone, style, avoid[], prefer[] }
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tracks each agent's stated position on a topic or ticker over time.
-- Core to Aiden and Lexa's character memory.
CREATE TABLE dn_agent_positions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id         UUID NOT NULL REFERENCES dn_agents(id) ON DELETE CASCADE,
  ticker           TEXT,                        -- nullable — not all positions are stock-specific
  topic            TEXT NOT NULL,
  stance           TEXT NOT NULL,               -- e.g. "cautious", "bullish", free text
  reasoning        TEXT NOT NULL,
  confidence       SMALLINT CHECK (confidence BETWEEN 1 AND 10),
  source_session_id UUID,                       -- optional link back to debate/council session
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dn_agent_positions_agent ON dn_agent_positions(agent_id);
CREATE INDEX idx_dn_agent_positions_ticker ON dn_agent_positions(ticker) WHERE ticker IS NOT NULL;


-- ============================================================
-- PIPELINE
-- Master workflow state. One row per content cycle.
-- Everything else hangs off pipeline_runs.
-- ============================================================

CREATE TABLE dn_pipeline_runs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trigger_type   TEXT NOT NULL CHECK (trigger_type IN ('manual', 'scheduled')),
  status         TEXT NOT NULL DEFAULT 'topic_selection' CHECK (status IN (
                   'topic_selection',
                   'topic_approved',
                   'researching',
                   'report_ready',
                   'report_approved',
                   'drafting',
                   'draft_ready',
                   'draft_approved',
                   'posted',
                   'cancelled'
                 )),
  topic          TEXT,
  notes          TEXT,                          -- human notes at any stage
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at   TIMESTAMPTZ
);


-- ============================================================
-- CLARK — RESEARCH
-- ============================================================

CREATE TABLE dn_research_runs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_run_id  UUID NOT NULL REFERENCES dn_pipeline_runs(id) ON DELETE CASCADE,
  topic            TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'running' CHECK (
                     status IN ('running', 'complete', 'failed')
                   ),
  human_approved   BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at     TIMESTAMPTZ
);

CREATE TABLE dn_research_sources (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_run_id  UUID NOT NULL REFERENCES dn_research_runs(id) ON DELETE CASCADE,
  url              TEXT,
  source_type      TEXT NOT NULL CHECK (source_type IN (
                     'web', 'sec_filing', 'finance_site',
                     'youtube_transcript', 'pdf', 'other'
                   )),
  title            TEXT,
  credibility      SMALLINT CHECK (credibility BETWEEN 1 AND 10),
  summary          TEXT,
  raw_content      TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Clark's final deliverable: top 3 ranked research items.
CREATE TABLE dn_research_reports (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_run_id  UUID NOT NULL REFERENCES dn_research_runs(id) ON DELETE CASCADE,
  rank             SMALLINT NOT NULL CHECK (rank IN (1, 2, 3)),
  title            TEXT NOT NULL,
  summary          TEXT NOT NULL,
  key_points       JSONB,                       -- string[]
  recommendation   TEXT,
  contradictions   TEXT,                        -- how Clark resolved conflicting sources
  human_approved   BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (research_run_id, rank)
);

CREATE INDEX idx_dn_research_sources_run ON dn_research_sources(research_run_id);
CREATE INDEX idx_dn_research_reports_run ON dn_research_reports(research_run_id);


-- ============================================================
-- KELLY — SOCIAL MEDIA
-- Stores every draft and revision. This is her learning record.
-- ============================================================

CREATE TABLE dn_thread_drafts (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_run_id      UUID NOT NULL REFERENCES dn_pipeline_runs(id) ON DELETE CASCADE,
  research_report_id   UUID REFERENCES dn_research_reports(id),
  version              SMALLINT NOT NULL DEFAULT 1,
  tweets               JSONB NOT NULL,           -- string[] — one entry per tweet in thread
  authenticity_score   SMALLINT CHECK (authenticity_score BETWEEN 1 AND 100),
  voice_score          SMALLINT CHECK (voice_score BETWEEN 1 AND 100),
  overall_score        SMALLINT CHECK (overall_score BETWEEN 1 AND 100),
  audit_notes          TEXT,                     -- Kelly's self-audit summary
  ai_patterns_flagged  JSONB,                    -- string[] — patterns caught and removed
  status               TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
                         'draft', 'revised', 'approved', 'posted', 'rejected'
                       )),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Every time Kelly revises, a new draft version is created.
-- This table links them with the delta reasoning.
CREATE TABLE dn_thread_revisions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id         UUID NOT NULL REFERENCES dn_thread_drafts(id) ON DELETE CASCADE,
  previous_version SMALLINT NOT NULL,
  new_version      SMALLINT NOT NULL,
  reason           TEXT,                         -- why this revision was made
  score_delta      SMALLINT,                     -- overall_score change
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Final record of posted content. X post ID populated when API is live.
CREATE TABLE dn_posted_threads (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id          UUID NOT NULL REFERENCES dn_thread_drafts(id),
  pipeline_run_id   UUID NOT NULL REFERENCES dn_pipeline_runs(id),
  x_post_id         TEXT,                        -- null until X API connected
  content_snapshot  JSONB NOT NULL,              -- frozen copy of tweets at post time
  posted_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Populated once X API is live.
CREATE TABLE dn_engagement_metrics (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_thread_id  UUID NOT NULL REFERENCES dn_posted_threads(id) ON DELETE CASCADE,
  likes             INTEGER NOT NULL DEFAULT 0,
  replies           INTEGER NOT NULL DEFAULT 0,
  reposts           INTEGER NOT NULL DEFAULT 0,
  impressions       INTEGER NOT NULL DEFAULT 0,
  link_clicks       INTEGER NOT NULL DEFAULT 0,
  profile_visits    INTEGER NOT NULL DEFAULT 0,
  measured_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dn_thread_drafts_pipeline ON dn_thread_drafts(pipeline_run_id);
CREATE INDEX idx_dn_posted_threads_pipeline ON dn_posted_threads(pipeline_run_id);
CREATE INDEX idx_engagement_thread ON dn_engagement_metrics(posted_thread_id);


-- ============================================================
-- COUNCIL + PODCAST
-- Covers topic selection, quality review, Aiden/Lexa debates,
-- and full podcast script generation.
-- ============================================================

CREATE TABLE dn_council_sessions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_type     TEXT NOT NULL CHECK (session_type IN (
                     'topic_selection', 'quality_review', 'podcast', 'debate'
                   )),
  pipeline_run_id  UUID REFERENCES dn_pipeline_runs(id),
  topic            TEXT,
  status           TEXT NOT NULL DEFAULT 'active' CHECK (
                     status IN ('active', 'complete', 'cancelled')
                   ),
  decision         TEXT,                         -- final output or conclusion
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at     TIMESTAMPTZ
);

-- Individual agent contributions within a council session.
CREATE TABLE dn_council_turns (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   UUID NOT NULL REFERENCES dn_council_sessions(id) ON DELETE CASCADE,
  agent_id     UUID REFERENCES dn_agents(id),
  agent_name   TEXT NOT NULL,                    -- denormalized for fast reads
  content      TEXT NOT NULL,
  turn_order   SMALLINT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Full structured podcast scripts — Aiden and Lexa as dialogue.
CREATE TABLE dn_podcast_scripts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  council_session_id  UUID REFERENCES dn_council_sessions(id),
  pipeline_run_id     UUID REFERENCES dn_pipeline_runs(id),
  title               TEXT NOT NULL,
  description         TEXT,
  script              JSONB NOT NULL,            -- { speaker, line, notes? }[]
  status              TEXT NOT NULL DEFAULT 'draft' CHECK (
                        status IN ('draft', 'approved', 'published')
                      ),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dn_council_turns_session ON dn_council_turns(session_id);
CREATE INDEX idx_dn_podcast_scripts_pipeline ON dn_podcast_scripts(pipeline_run_id);


-- ============================================================
-- UTILITY: updated_at trigger
-- Applies to any table with an updated_at column.
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dn_agents_updated_at
  BEFORE UPDATE ON dn_agents
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER dn_pipeline_runs_updated_at
  BEFORE UPDATE ON dn_pipeline_runs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER dn_thread_drafts_updated_at
  BEFORE UPDATE ON dn_thread_drafts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER dn_podcast_scripts_updated_at
  BEFORE UPDATE ON dn_podcast_scripts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

  ALTER TABLE dn_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_agent_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_pipeline_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_research_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_research_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_thread_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_thread_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_posted_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_engagement_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_council_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_council_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE dn_podcast_scripts ENABLE ROW LEVEL SECURITY;