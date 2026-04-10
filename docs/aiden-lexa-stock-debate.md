# Aiden & Lexa Stock Debate — How It Works

## Trigger

```bash
npm run analyze -- JNJ
```

This runs `scripts/analyze.ts` → calls `runStockDebate("JNJ")` → compiles and invokes the LangGraph state graph.

---

## The Graph (7 Nodes, 5 Phases)

```
START → fetchData → aidenScore → lexaScore → compare → aidenRespond → lexaRespond → finalAssessment → END
```

Each node is a function that receives the current state, does work, and returns a partial state update. LangGraph merges updates into the running state automatically.

---

## Phase 1: Fetch Data

**Node:** `fetchDataNode` in `lib/debate/nodes.ts`
**What happens:**
1. Calls `ensureFinancialData("JNJ")` from `lib/debate/data-fetcher.ts`
2. Checks if `alph_stock_metadata` has a row for JNJ updated within the last 7 days
3. If stale or missing: fetches 4 Alpha Vantage endpoints sequentially (with 12s rate limiting):
   - `OVERVIEW` → upserts into `alph_stock_metadata`
   - `INCOME_STATEMENT` → upserts annual + last 4 quarterly into `alpha_income_statement`
   - `BALANCE_SHEET` → upserts into `alpha_balance_sheet`
   - `CASH_FLOW` → upserts into `alpha_cash_flow`
4. If fresh: reads from Supabase cache directly
5. Returns all data as a `FinancialDataBundle` (metadata + income statements + balance sheets + cash flows)

**State update:** `{ financialData: FinancialDataBundle }`

---

## Phase 2a: Aiden Scores

**Node:** `aidenScoreNode` in `lib/debate/nodes.ts`
**Prompt builder:** `lib/debate/prompts/aiden-scoring.ts`

### System Prompt (what Aiden "is"):
```
You are Aiden, the dividend safety analyst for The Dividend Lab.

Your core question: "How safe and dependable is this dividend over a full cycle?"

## Your Complete Scoring Rules
[Full contents of docs/context/rules_guidelines.md — the entire 
scoring framework with all buckets, weights, hard rules, 
sector overrides, penalty tables, etc.]

## Output Format
You MUST respond with valid JSON matching this exact schema:
{
  "agent": "Aiden",
  "ticker": "JNJ",
  "sector_profile": "corp|reits|bdc|mlp|utility|bank|cyclical",
  "final_score": 0-100,
  "confidence": 0-100,
  "bucket_scores": {
    "dividend_coverage": 0-100,
    "financial_strength": 0-100,
    "business_quality": 0-100,
    "reliability_signals": 0-100
  },
  "hard_flags": [],
  "soft_flags": [],
  "rationale": "2-3 paragraph explanation"
}

Score formula: final_score = (dividend_coverage × 0.35) + 
(financial_strength × 0.25) + (business_quality × 0.25) + 
(reliability_signals × 0.15) - penalties
```

### User Message (the data Aiden analyzes):
```
Analyze JNJ for dividend safety.

## Company Overview
{ full metadata JSON — PE ratio, dividend yield, EPS, margins, etc. }

## Income Statements (most recent first)
{ last 5 annual + 4 quarterly income statements as JSON }

## Balance Sheets (most recent first)
{ balance sheet data as JSON }

## Cash Flow Statements (most recent first)
{ cash flow data as JSON }

Score this stock using your 4-bucket safety framework.
Apply all hard rules and sector overrides.
```

### What Aiden does:
- Reads all the financial data
- Applies his 4-bucket framework (35% coverage, 25% strength, 25% quality, 15% reliability)
- Checks for hard fail conditions (recent cuts, uncovered dividends, weak coverage)
- Applies sector overrides (REITs use FFO, utilities get higher payout tolerance, etc.)
- Returns a structured JSON score

### API Call:
```typescript
callAgent(systemPrompt, userMessage, { maxTokens: 3000 })
// Model: claude-sonnet-4-20250514
```

**State update:** `{ aidenScore: AgentScoreOutput, transcript: [{ agent: 'Aiden', phase: 'score', content }] }`

---

## Phase 2b: Lexa Scores

**Node:** `lexaScoreNode` — identical pattern to Aiden but with Lexa's framework.
**Prompt builder:** `lib/debate/prompts/lexa-scoring.ts`

### Lexa's system prompt differences:
- Core question: "How attractive is this stock as a dividend growth opportunity from here?"
- 4 buckets: dividend_growth_power (30%), growth_support (25%), opportunity_valuation (25%), safety_floor (20%)
- Uses Chowder number (yield + growth rate) for valuation
- More forgiving on payout ratio for stable growers
- Still enforces a safety floor (can't ignore obvious cut risk)

### Key: Lexa does NOT see Aiden's score yet.
Both agents score independently — their analyses are unbiased by each other.

**State update:** `{ lexaScore: AgentScoreOutput, transcript: [...] }`

---

## Phase 3: Compare

**Node:** `compareNode` — this is NOT an LLM call. It's pure code.

### What it does:
1. Takes both `aidenScore` and `lexaScore` from state
2. Compares bucket scores — any difference > 15 points is a "disagreement"
3. Builds structured comparison:
   - `agreements`: buckets where they're within 15 points
   - `disagreements`: buckets with > 15pt gap, showing both values
   - `key_questions`: auto-generated from disagreements ("Why did Aiden rate financial_strength 30 points higher?")
   - `summary`: one-line overview ("Aiden 78/100, Lexa 62/100, delta 16, 2 disagreements")

### Example comparison output:
```
Aiden scored JNJ 78/100 (safety). Lexa scored 62/100 (growth). 
Delta: 16 points. 2 bucket disagreements (>15pt gap), 
2 areas of alignment.
```

**State update:** `{ comparison: ComparisonOutput, transcript: [...] }`

---

## Phase 4a: Aiden Responds

**Node:** `aidenRespondNode`
**Prompt builder:** `lib/debate/prompts/response.ts`

### System Prompt:
```
You are Aiden from The Dividend Lab.

You have already scored JNJ. Now you are seeing Lexa's score 
and a comparison of where you agree and disagree.

Your job:
1. Address the specific disagreements
2. Explain WHY you scored differently
3. If Lexa's reasoning is convincing, acknowledge it
4. If you stand firm, explain what data supports your position
5. Be specific — reference actual numbers

Keep your response under 300 words. Be direct, not diplomatic.
```

### User Message:
```
## Your Score
{ Aiden's full JSON score }

## Lexa's Score
{ Lexa's full JSON score }

## Comparison
Aiden scored JNJ 78/100. Lexa scored 62/100...

### Key Disagreements
- growth_support: You scored 70, Lexa scored 45 (delta: 25)
- opportunity_valuation: You scored 65, Lexa scored 40 (delta: 25)

### Questions to Address
- Why did Aiden rate growth_support 25 points higher?

Respond to Lexa's analysis. Where do you agree? Where do you push back?
```

**State update:** `{ aidenResponse: string, transcript: [...] }`

---

## Phase 4b: Lexa Responds

**Node:** `lexaRespondNode` — same pattern, but Lexa sees Aiden's scores and responds from her growth perspective.

**State update:** `{ lexaResponse: string, transcript: [...] }`

---

## Phase 5: Final Assessment

**Node:** `finalAssessmentNode`
**Prompt builder:** `lib/debate/prompts/final.ts`

### System Prompt:
```
You are the joint assessment synthesizer for The Dividend Lab.

You have the full debate between Aiden (safety) and Lexa (growth).
Produce a final, balanced verdict.

## Output Format
{
  "verdict": "strong fit" | "fit" | "mixed" | "watchlist" | "weak fit",
  "rationale": "2-3 paragraph synthesis",
  "aiden_final_score": <adjusted if response indicated change>,
  "lexa_final_score": <adjusted if response indicated change>
}

## Verdict Guide (research assessment, NOT financial advice)
- strong fit: Both >75, no hard flags, strong agreement on quality
- fit: Average >70, manageable disagreements, fundamentals support thesis
- mixed: Average 55-70, mixed signals, warrants deeper research
- watchlist: Average 40-55 or significant disagreements, monitor for changes
- weak fit: Average <40 or hard flags from both agents
```

### User Message:
Receives ALL prior state: both initial scores, comparison, both responses. Synthesizes into a final verdict.

**State update:** `{ jointAssessment: JointAssessment, transcript: [...] }`

---

## Post-Graph: Saving Results

After the graph completes, `runStockDebate()` in `lib/debate/run.ts`:

1. Extracts all scores and the joint assessment from the final state
2. Updates `dn_stock_analyses` with:
   - Aiden's score, confidence, bucket scores, flags, rationale
   - Lexa's score, confidence, bucket scores, flags, rationale
   - Full debate transcript (array of `{ agent, phase, content }`)
   - Joint verdict and rationale
   - Sector profile
3. Sets status to `complete`
4. Logs activity: "JNJ verdict: HOLD — Aiden: 78, Lexa: 62"

---

## State Flow Summary

| After Node | State Fields Populated |
|------------|----------------------|
| fetchData | `ticker`, `analysisId`, `financialData` |
| aidenScore | + `aidenScore`, `transcript[0]` |
| lexaScore | + `lexaScore`, `transcript[1]` |
| compare | + `comparison`, `transcript[2]` |
| aidenRespond | + `aidenResponse`, `transcript[3]` |
| lexaRespond | + `lexaResponse`, `transcript[4]` |
| finalAssessment | + `jointAssessment`, `transcript[5]` |

The `transcript` field uses a **reducer** that accumulates entries — each node appends to it rather than replacing it. All other fields use a **replace** reducer — each node overwrites the previous value.

---

## What Each Agent Sees at Each Phase

| Phase | Aiden Sees | Lexa Sees |
|-------|-----------|-----------|
| Score | Financial data only | Financial data only |
| Respond | His score + Lexa's score + comparison | Her score + Aiden's score + comparison |
| Final | (Synthesizer sees everything) | (Synthesizer sees everything) |

Key design: **independent scoring, then informed debate.** Neither agent can bias the other's initial analysis.

---

## Files Involved

| File | Purpose |
|------|---------|
| `scripts/analyze.ts` | CLI entry point |
| `lib/debate/run.ts` | Orchestrator: creates DB row, runs graph, saves results |
| `lib/debate/graph.ts` | LangGraph StateGraph definition + compilation |
| `lib/debate/state.ts` | State schema (Annotation) + types |
| `lib/debate/nodes.ts` | All 7 node functions |
| `lib/debate/data-fetcher.ts` | Alpha Vantage fetch + cache layer |
| `lib/debate/prompts/aiden-scoring.ts` | Aiden's system + user prompt |
| `lib/debate/prompts/lexa-scoring.ts` | Lexa's system + user prompt |
| `lib/debate/prompts/response.ts` | Cross-agent response prompt |
| `lib/debate/prompts/final.ts` | Joint assessment prompt |
| `docs/context/rules_guidelines.md` | Scoring rules (loaded at runtime into prompts) |
| `lib/council/claude.ts` | `callAgent()` — the actual Claude API call |

---

## Example Console Output

```
Starting stock debate for JNJ...

── Phase 1: Fetching financial data for JNJ ──
  Using cached data for JNJ

── Phase 2a: Aiden scoring ──
  Aiden score: 78/100 (confidence: 85)

── Phase 2b: Lexa scoring ──
  Lexa score: 62/100 (confidence: 72)

── Phase 3: Comparing scores ──
  Aiden scored JNJ 78/100 (safety). Lexa scored 62/100 (growth). 
  Delta: 16 points. 2 disagreements.

── Phase 4a: Aiden responds to Lexa ──
  Aiden: JNJ's payout ratio of 44% and 62-year dividend streak...

── Phase 4b: Lexa responds to Aiden ──
  Lexa: While JNJ's safety metrics are strong, dividend growth has...

── Phase 5: Joint assessment ──
  Verdict: HOLD
  Aiden final: 76, Lexa final: 64

==================================================
RESULT: JNJ
==================================================
Verdict:     HOLD
Aiden Score: 76/100
Lexa Score:  64/100

[Joint rationale paragraph]

Analysis ID: abc-123-def
View at /dashboard/analyses
```
