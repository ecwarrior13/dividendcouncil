# Aisemble Content Engine — Workflow & Agent Architecture

## Agent Types

There are two distinct runtime models in the system:

### Claude Code CLI Agents
These are full Claude Code sessions that run interactively in your terminal. They have access to MCP tools (Supabase, Alpha Vantage, Brave Search, X API) and can read project files.

| Agent | Trigger | What it does |
|-------|---------|-------------|
| **Clark** | `npm run clark` | Picks up `topic_approved` pipeline runs, researches via web search + Alpha Vantage, writes top-3 reports to Supabase |
| **Kelly** | `npm run kelly` | Picks up `report_approved` pipeline runs, reads Clark's research, drafts X threads with authenticity self-audit |

### Claude API Agents (called by orchestrator script)
These are stateless Claude API calls made by the Council orchestrator (`lib/council/orchestrate.ts`). Each agent gets a system prompt + context assembled per round. They do NOT have MCP tools — the orchestrator handles all database reads/writes.

| Agent | Role | Memory |
|-------|------|--------|
| **Aiden** | Safety-first dividend investing, podcast co-host | pgvector embeddings of past reasoning + dn_agent_positions |
| **Lexa** | Growth-focused dividend investing, podcast co-host | pgvector embeddings of past reasoning + dn_agent_positions |
| **Devils Advocate** | Challenges every proposal | Stateless — gets debate transcript per session |
| **Strategist** | Long-term brand arc, content gaps | Past topics from dn_council_sessions + docs/brand.md |
| **Editor** | Quality gate, final decision maker | Full debate transcript + docs/brand.md |

### Shared Infrastructure (not an agent)
| Component | What it is |
|-----------|-----------|
| **Atlas** | Typed Supabase client library (`lib/supabase/atlas/`). All agents access data through here. |
| **MCP Server** | 21 tools wrapping Atlas + external APIs. Only Clark and Kelly use this. |

---

## Full Pipeline Workflow

```
┌─────────────────────────────────────────────────────────┐
│  TOPIC SELECTION                                        │
│                                                         │
│  Option A: Manual                                       │
│  You create a topic on /dashboard → topic_approved      │
│                                                         │
│  Option B: Council (npm run council)                    │
│  Orchestrator script calls 5 API agents:                │
│    Round 1: Strategist → Aiden → Lexa (propose)         │
│    Round 2: Devils Advocate → Aiden → Lexa → Strategist │
│    Round 3: Editor (decides)                            │
│  You review on /dashboard/council → approve → topic_approved
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  RESEARCH (npm run clark)                               │
│                                                         │
│  Clark (CLI agent + MCP tools):                         │
│    1. Picks up topic_approved run                       │
│    2. web_search + get_stock_overview + get_dividend_history
│    3. Adds sources with credibility ratings             │
│    4. Writes top-3 ranked reports                       │
│    5. Pipeline → report_ready                           │
│                                                         │
│  You review on /dashboard/research/[id] → approve       │
│  Pipeline → report_approved                             │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  CONTENT CREATION (npm run kelly)                       │
│                                                         │
│  Kelly (CLI agent + MCP tools):                         │
│    1. Picks up report_approved run                      │
│    2. Reads Clark's research                            │
│    3. Drafts X thread (5-12 tweets)                     │
│    4. Runs authenticity self-audit (scores + patterns)  │
│    5. Self-revises if overall_score < 70 (up to 3x)    │
│    6. Pipeline → draft_ready                            │
│                                                         │
│  You review on /dashboard/drafts/[id] → approve         │
│  Pipeline → draft_approved                              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  POSTING                                                │
│                                                         │
│  Manual: copy thread to X                               │
│  Or: post_thread MCP tool (when X API keys configured)  │
│  Pipeline → posted                                      │
└─────────────────────────────────────────────────────────┘
```

---

## Pipeline Status Machine

```
topic_selection → topic_approved → researching → report_ready → report_approved → drafting → draft_ready → draft_approved → posted
       ↓               ↓              ↓              ↓               ↓              ↓             ↓              ↓
   cancelled        cancelled      cancelled      cancelled       cancelled      cancelled     cancelled      cancelled
```

---

## Commands

| Command | What it runs | Runtime |
|---------|-------------|---------|
| `npm run dev` | Next.js dashboard at localhost:3000 | Next.js |
| `npm run council` | Council topic selection debate | Node script → Claude API |
| `npm run council -- "topic idea"` | Council with seeded candidates | Node script → Claude API |
| `npm run seed:council` | Insert 5 council agents into dn_agents | Node script → Supabase |
| `npm run clark` | Clark research agent | Claude Code CLI + MCP |
| `npm run kelly` | Kelly social media agent | Claude Code CLI + MCP |
| `npm run mcp:build` | Rebuild MCP server after changes | TypeScript compiler |

---

## Data Flow

All agents write to Supabase. The dashboard reads from Supabase. Real-time updates on the dashboard use Supabase Realtime subscriptions on `dn_agent_activity`.

```
Council (API) ──┐
                ├──→ Supabase ←──→ Dashboard (Next.js)
Clark (CLI) ────┤         ↑
                │    service role
Kelly (CLI) ────┘    (internal only)
```

---

## Human Gates

There are 3 approval points where you review and decide:

1. **Topic approval** — after Council debate or manual creation
2. **Research approval** — after Clark's top-3 report
3. **Draft approval** — after Kelly's scored X thread

Nothing moves forward without your approval.
