# Council Workflow System

## Overview

The Council is a group of AI agents that debate and select topics for the content pipeline. The debate structure is defined by **workflows** — configurable sequences of rounds and steps stored in the database, not hardcoded.

---

## Agents & Debate Roles

Each council agent has a `debate_role` that determines when they speak:

| Debate Role | What They Do | When They Speak |
|-------------|-------------|-----------------|
| **Framer** | Sets the landscape, identifies content gaps | Round 1 (first), Round 2 (synthesis) |
| **Proposer** | Proposes specific topics, defends them | Round 1 (after framer), Round 2 (defense) |
| **Challenger** | Stress-tests proposals, finds weaknesses | Round 2 (before defense) |
| **Decider** | Synthesizes debate, picks the final topic | Round 3 (last) |

### Current Agents

| Agent | Debate Role | Focus |
|-------|------------|-------|
| Strategist | Framer | Brand arc, content gaps, pillar balance |
| Aiden | Proposer | Safety-first dividend investing |
| Lexa | Proposer | Growth-focused dividend investing |
| Devils Advocate | Challenger | Challenges every position |
| Editor | Decider | Quality, brand alignment, final call |

New agents (e.g., Chuck the beginner investor) can be added via `/dashboard/agents/new` with a debate role of `proposer` — they'll automatically participate in the next council session.

---

## Workflow Structure

A workflow is a sequence of **steps** grouped into **rounds**:

```
Workflow: "Topic Selection v1"
│
├── Round 1: Proposals
│   ├── Step 1: framer → frame
│   ├── Step 2: proposer → propose
│
├── Round 2: Challenge & Defend
│   ├── Step 1: challenger → challenge
│   ├── Step 2: proposer → defend
│   ├── Step 3: framer → synthesize
│
├── Round 3: Decision
│   ├── Step 1: decider → decide
```

### Step Properties

Each step defines:
- **debate_role** — which agents speak (all agents with this role take turns)
- **action_type** — what kind of contribution (frame, propose, challenge, defend, synthesize, decide)
- **prompt_hint** — extra instruction appended to the agent's message
- **Context flags:**
  - `include_vector` — load past reasoning via pgvector (for proposers)
  - `include_brand` — inject brand strategy document
  - `include_pillars` — inject pillar distribution + queued proposals
  - `include_weights` — inject agent influence weights (for deciders)

### Action Types

| Action | Message Template |
|--------|-----------------|
| `frame` | "Analyze the content landscape and suggest directions." |
| `propose` | Shows framer output + prior proposals → "Now propose your topic." |
| `challenge` | Shows all prior turns → "Challenge these proposals." |
| `defend` | Shows challenger concerns → "Defend or adjust your position." |
| `synthesize` | Shows round transcript → "Weigh in on direction." |
| `decide` | Shows full transcript → "Make your final decision." |

---

## Running the Council

### Default workflow
```bash
npm run council
```
Loads the workflow marked `is_default = true` and `is_active = true`.

### With seeded topics
```bash
npm run council -- "SCHD vs VYM comparison" "REIT dividend sustainability"
```

### With a specific workflow
```bash
npm run council -- --workflow "<workflow-uuid>"
```

---

## Managing Workflows

### Dashboard: `/dashboard/workflows`
- View all workflows with step counts and status
- Create new workflows
- Active/inactive workflows shown (inactive ones are skipped)

### Dashboard: `/dashboard/workflows/[id]`
- Visual workflow builder
- Steps grouped by round with role and action badges
- Add steps to existing rounds
- Add new rounds
- Remove steps
- Set as default / activate / deactivate

---

## Execution Flow

```
npm run council
    │
    ▼
Load default workflow + steps from dn_council_workflows
    │
    ▼
Load council agents grouped by debate_role
    │
    ▼
For each round:
  For each step:
    For each agent matching step.debate_role:
      1. Load context (feedback, vector memory, brand doc, pillars)
      2. Build system prompt (personality + weight calibration + feedback)
      3. Build user message (from action_type template + prompt_hint)
      4. Call Claude API
      5. Save turn to dn_council_turns
      6. Log activity to dn_agent_activity
    │
    ▼
Parse final topic from last decider turn (TOPIC: ...)
    │
    ▼
Update session: status → complete, topic, decision
    │
    ▼
Post-session:
  - Embed all proposer turns (pgvector for persistent memory)
  - Record agent positions (dn_agent_positions)
    │
    ▼
Human reviews on /dashboard/council/[id]
  - Rate each agent (1-5 stars + notes)
  - Approve topic → creates pipeline run at topic_approved
  - Or reject → session cancelled
```

---

## Agent Memory & Learning

### Persistent Memory (Proposers)
Aiden, Lexa, and any proposer have their debate reasoning embedded via pgvector after each session. In future sessions, similar past reasoning is retrieved and injected into their system prompt under "Your Past Reasoning (for consistency)."

### Influence Weight
Each agent has an `influence_weight` (0.0–1.0) editable at `/dashboard/agents/[id]`:
- Below 0.3: "Keep contributions brief, raise only your strongest point"
- Below 0.7: "Be concise, focus on your single strongest argument"
- 0.7+: Full voice (default)

The Editor (decider) sees all weights and factors them into the final decision.

### Feedback Loop
After each session, rate agents 1-5 stars with optional notes. Recent feedback is injected into each agent's prompt: "Recent Human Feedback (avg: 3.2/5) — too aggressive." Agents self-calibrate based on your ratings.

---

## Content Pillars

The Strategist (framer) receives pillar distribution data showing how many topics have been covered per pillar:

| Pillar | Description |
|--------|-------------|
| Foundations | Core beginner concepts |
| Analysis | Deep dives on tickers/sectors |
| Strategy | Portfolio construction, tradeoffs |
| Market Context | Timely, event-driven topics |
| Advanced | Tax, international, preferred stocks |

Queued topic proposals from `/dashboard/proposals` are also surfaced to the Strategist. This ensures the Council considers your ideas and avoids over-covering any single pillar.

---

## Creating Custom Workflows

### Example: Quick Decision (1 round)
1. Go to `/dashboard/workflows` → Create "Quick Decision"
2. Add Round 1 with two steps:
   - Step 1: `proposer` / `propose` / include_vector
   - Step 2: `decider` / `decide` / include_brand + include_weights
3. Set as default → `npm run council` runs the short version

### Example: Deep Debate (5 rounds)
1. Create workflow with additional rounds:
   - Round 3: Proposers respond to each other's positions
   - Round 4: Challenger does a second pass
   - Round 5: Decider synthesizes
2. Useful for complex or high-stakes topic decisions

### Example: Beginner Perspective Round
1. Add Chuck (debate_role: proposer) via `/dashboard/agents/new`
2. Edit the default workflow
3. Add Round 2.5: `proposer` / `synthesize` / prompt_hint: "As a beginner, what would confuse you about these proposals?"
4. Chuck speaks alongside Aiden and Lexa in this new round
