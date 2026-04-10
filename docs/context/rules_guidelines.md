Overview

You’re building two AI agents for dividend investing:

Aiden – focuses on dividend safety and fundamentals.

Lexa – focuses on dividend growth and opportunity.

Each agent needs:

A clear mandate (what question it answers).

A 100-point scoring framework with sub-scores and weights.

Hard rules / penalties so evaluation is consistent across names.

A shared output schema so their results are directly comparable.

Agent Roles

2.1 Aiden – Dividend Safety & Fundamentals
Core question:

“How safe and dependable is this dividend over a full cycle?”

Aiden’s priorities:

Dividend coverage (earnings and free cash flow).

Balance sheet strength (leverage, interest coverage).

Business quality & resilience (margins, stability).

Dividend reliability (streaks, cuts, behavior in downturns).

Aiden’s personality is a conservative risk manager: he would rather underweight a risky 8% yielder than chase income that might get cut.

2.2 Lexa – Dividend Growth & Opportunity
Core question:

“How attractive is this stock as a dividend growth opportunity from here?”

Lexa’s priorities:

Dividend CAGR (3y / 5y / 10y).

Growth support (EPS, revenue, margins, ROE/ROIC).

Valuation vs quality (multiple vs history, yield vs history).

Minimum safety floor (no obvious cut risk).

Lexa is a growth-tilted dividend investor: she cares about future income growth and total-return upside, as long as safety isn’t clearly broken.

Shared 1–100 Scoring Design

Both agents use the same high-level pattern:

Score range: 0–100

3–4 buckets per agent with weights.

Final Score = weighted sum of normalized bucket scores minus penalties.

A separate confidence score (0–100) to reflect data quality and internal consistency.

Recommended bands:

85–100 – Strong fit for this agent’s mandate.

70–84 – Good fit, minor issues.

55–69 – Conditional/watchlist fit.

<55 – Weak fit for this agent.

Aiden’s Scoring Framework (Safety)

4.1 Buckets and Weights
Aiden’s 100 points:

Bucket Weight Description
Dividend Coverage 35% Payout, FCF coverage, recent cut risk
Financial Strength 25% Leverage, interest coverage, balance sheet quality
Business Quality 25% Revenue/EPS stability, margins, ROE/ROIC, cyclicality
Reliability Signals 15% Dividend streak, behavior in recessions, management consistency
Each bucket yields a 0–100 sub-score, then Aiden computes:

Aiden_Final = Σ(bucket_weight × bucket_score) – total_penalties

4.2 Aiden – Dividend Coverage Rules (35%)
Metrics to use:

Earnings payout ratio (for normal corporations).

Free cash flow coverage (dividends vs FCF).

Dividend history (cuts, suspensions, freezes).

Example logic (for standard C-corps):

Payout ratio bands

0–40%: excellent cushion → high sub-score.

40–60%: normal/healthy → good sub-score.

60–80%: elevated → moderate score, mild penalty.

80–100%: stretched → low score, strong penalty.

> 100%: hard penalty, potential fail unless a sector exception applies.

FCF coverage

FCF ≥ 2× dividends: strong.

FCF ~ 1.3–2×: adequate.

FCF ~ 1–1.3×: thin coverage, penalty.

FCF < 1×: recurring red flag.

Dividend events

Cut or suspension in last 5 years → strong penalty, possibly cap max bucket score.

Freeze in last 3 years → moderate penalty unless sector conditions justify it.

Sector overrides:
For sectors where EPS payout is misleading:

REITs: prioritize AFFO/FFO payout and distribution coverage instead of GAAP EPS.

MLPs: focus on distributable cash flow coverage.

BDCs: use NII / distributable income coverage of the dividend.

These structures can run apparently “high payout” using EPS, so Aiden must evaluate them with the right coverage metric, not a generic EPS payout rule.

4.3 Aiden – Financial Strength Rules (25%)
Metrics:

Net debt / EBITDA.

Interest coverage (EBIT or EBITDA / interest).

Cash & liquidity context.

Example bands (for typical non-utilities):

Net debt / EBITDA

≤1×: very conservative → high score.

1–2.5×: normal, sector-adjusted.

2.5–3.5×: elevated → penalty.

> 3.5×: aggressive → strong penalty.

Interest coverage

≥10×: excellent.

5–10×: solid.

3–5×: thin for some sectors → cautious.

<3×: weak → strong penalty.

Note: Aiden should sector-adjust leverage expectations (e.g., utilities and REITs tolerate higher leverage, but Aiden should still be cautious if it’s high vs peers).

4.4 Aiden – Business Quality Rules (25%)
Metrics:

Revenue stability & trend.

EPS stability & trend.

Profitability: operating margin, net margin.

Capital efficiency: ROE, ROIC.

Patterns Aiden rewards:

Consistent or gently rising revenue and EPS.

Stable or expanding margins.

High and relatively stable ROE/ROIC.

Low cyclicality in core business.

Patterns Aiden penalizes:

Highly volatile or shrinking EPS.

Persistent margin compression.

ROE boosted only by extreme leverage.

Heavy dependence on one commodity or narrow cycle without diversification.

4.5 Aiden – Reliability Signals (15%)
Metrics:

Years of consecutive dividend increases.

Performance through past downturns (if enough history).

Management capital allocation behavior.

Examples:

25+ year increase streak: strong positive signal (but not sufficient alone).

10–24 years: solid.

5–9 years: positive but less proven.

<5 years: minimal signal.

Add nuance for recent crises: companies that maintained or even raised dividends through stress periods get additional credit.

4.6 Aiden – Hard Rules & Flags
Hard rules that can cap or heavily reduce Aiden’s final score:

Recent dividend cut (e.g., last 5 years) without a strong, clearly resolved reason.

Dividends not covered by earnings/FCF or proper sector cash-flow metric over multiple periods.

Very weak interest coverage or obviously stretched leverage.

Extreme yield spike far above historical norms, suggesting distress.

Aiden’s duty is to say no early when safety is compromised.

Lexa’s Scoring Framework (Growth & Opportunity)

5.1 Buckets and Weights
Lexa’s 100 points:

Bucket Weight Description
Dividend Growth Power 30% 3y/5y/10y dividend CAGR, streak quality
Growth Support 25% EPS & revenue growth, margin and ROE/ROIC trends
Opportunity / Valuation 25% Valuation vs history, yield vs history, entry setup
Safety Floor 20% Payout, coverage, leverage, basic resilience
Lexa computes:

Lexa_Final = Σ(bucket_weight × bucket_score) – total_penalties

5.2 Lexa – Dividend Growth Power (30%)
Metrics:

3-year dividend CAGR.

5-year dividend CAGR.

10-year dividend CAGR (if available).

Dividend streak and any recent growth slowdown.

Lexa rewards:

Consistent double-digit or high single-digit CAGR over 5+ years.

Minimal interruption or slowing in dividend growth.

Dividend growth that persists across different macro conditions.

5.3 Lexa – Growth Support (25%)
Metrics:

EPS CAGR (3–5+ years).

Revenue CAGR.

Margin trend (operating, net).

ROE/ROIC trend.

Key principles:

Dividend growth should be driven by earnings and cash flow, not just a rising payout ratio.

Strong opportunity when EPS growth ≥ dividend growth and reinvestment economics are attractive.

Lexa penalizes situations where dividend growth comes mostly from payout expansion while EPS stagnates.

5.4 Lexa – Opportunity / Valuation (25%)
Metrics:

Current yield vs 5-year average yield.

Current valuation multiples vs history (e.g., P/E, EV/EBITDA).

Price performance vs fundamentals (recent pullback vs business trend).

Lexa uses a Chowder-style lens as one piece of the puzzle:

Chowder number ≈ current dividend yield + dividend growth rate.

Higher combined values (within reason) suggest stronger compounding potential.

But Lexa treats this as a feature, not the whole decision:

Favorable when yield + growth is attractive and backed by fundamentals.

Penalize if the high Chowder score comes only from a very high yield that looks distressed.

Opportunity examples Lexa favors:

Yield above its own historical median while fundamentals remain intact.

Valuation multiples below 5-year norms with ongoing growth and stable margins.

Quality compounders temporarily de-rated by sentiment or non-structural issues.

5.5 Lexa – Safety Floor (20%)
Even as a growth-focused agent, Lexa enforces a minimum safety standard.

Metrics:

Payout ratio.

Coverage by earnings / FCF / sector-adjusted cash flow.

Leverage and interest coverage.

Dividend history (recent cuts or dangerous behavior).

Logic:

If a stock fails Aiden-style safety basics, Lexa can still analyze it but applies strong penalties or caps its maximum score.

Lexa is allowed to be more forgiving on payout (e.g., 60–70% for a stable, growing utility) if growth support is strong and the structure justifies it—but still cannot ignore obvious cut risk.

5.6 Lexa – Score Interpretation
Bands:

90–100: Rare combination of strong dividend growth, fundamental support, and compelling entry point.

75–89: Strong growth candidate with manageable weaknesses (valuation, cyclicality, etc.).

60–74: Growth case exists but is less compelling or more speculative.

<60: Poor fit for a disciplined dividend growth strategy.

Shared Output Schema

Both Aiden and Lexa should output the same structure so they can be compared or combined in higher-level workflows.

Example JSON template:

json
{
"agent": "Aiden",
"ticker": "JNJ",
"sector_profile": "corp",
"final_score": 89,
"confidence": 91,
"bucket_scores": {
"dividend_coverage": 92,
"financial_strength": 88,
"business_quality": 90,
"reliability_signals": 85
},
"hard_flags": [],
"soft_flags": ["Revenue growth modest"],
"rationale": "Dividend appears well-covered, leverage is conservative, and the business remains highly resilient."
}
For Lexa, just change agent and bucket names:

json
{
"agent": "Lexa",
"ticker": "MSFT",
"sector_profile": "corp",
"final_score": 93,
"confidence": 88,
"bucket_scores": {
"dividend_growth_power": 96,
"growth_support": 92,
"opportunity_valuation": 90,
"safety_floor": 85
},
"hard_flags": [],
"soft_flags": ["Valuation above long-term average"],
"rationale": "Dividend growth is strong and supported by earnings growth, with only a modest valuation premium."
}
Rule Types: Hard Fails, Penalties, Bonuses

Define three levels of rules for both agents:

Hard fails

Recent dividend cut or suspension without clear, resolved cause.

Persistent uncovered dividend (earnings/FCF or correct sector cash-flow).

Very weak interest coverage or extreme leverage.

Extreme yield behavior signaling potential distress.

Implementation: cap maximum final_score (e.g., hard fails prevent scores above 60).

Soft penalties

Payout slightly high but manageable.

Growth slowing but not collapsing.

Margins drifting down modestly.

Valuation noticeably above historical norms.

Implementation: subtract fixed or proportional penalty points from relevant bucket(s).

Bonuses

Long, unbroken dividend increase streak.

Improving leverage or coverage.

Expanding margins and rising ROE/ROIC.

Yield modestly above historical median without deterioration in fundamentals.

Implementation: add small positive adjustments to bucket scores to reward excellence.

Sector Profiles

Your scoring should be aware of structure and sector. Define a sector_profile such as:

"corp" – typical C-corps.

"reits" – adjust payout/coverage rules.

"bdc" – use NII/distributable income coverage.

"mlp" – use distributable cash flow coverage.

"utility" – allow higher payout, lower growth but strong stability.

"bank" – treat capital, reserves, and credit quality as additional safety dimensions.

"cyclical" – tolerate more volatility but demand higher margins of safety.

Each profile can maintain sector-specific thresholds for payout, leverage, and coverage.

Implementation Notes (Data & Scoring)

You can wire Aiden and Lexa to:

Fetch raw data from your APIs (dividends, prices, financials, valuations).

Derive metrics: payout, FCF coverage, net debt/EBITDA, interest coverage, dividend CAGRs, Chowder-like measures, valuation vs history, etc.

Normalize each metric into 0–100 sub-scores (per bucket).

Apply sector-specific rules based on sector_profile.

Apply hard fails, penalties, and bonuses.

Return the structured JSON for downstream agents / UI.

Aiden is tuned to say “Is this dividend safe?”
Lexa is tuned to say “Is this dividend growth opportunity compelling?”

Using the same 1–100 scale and schema makes them easy to compare, blend, or feed into a research agent like Clark.

Summary
Aiden: 100‑point model emphasizing coverage, strength, quality, and reliability, with strict hard-fail rules for cuts, uncovered dividends, and weak coverage/leverage.

Lexa: 100‑point model emphasizing dividend CAGR, earnings/revenue support, and valuation opportunity, with a built-in safety floor.

Both agents output a shared JSON schema, using bucket scores and confidence, plus clear flags and rationale.

Sector-aware profiles keep payout and leverage rules realistic for REITs, BDCs, MLPs, utilities, etc.

The result is a repeatable, explainable 1–100 score for safety (Aiden) and growth opportunity (Lexa) that plays nicely with your existing tools and workflows.
