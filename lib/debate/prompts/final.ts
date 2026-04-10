import type { AgentScoreOutput, ComparisonOutput } from '../state'

export function buildFinalPrompt(
  ticker: string,
  aidenScore: AgentScoreOutput,
  lexaScore: AgentScoreOutput,
  comparison: ComparisonOutput,
  aidenResponse: string,
  lexaResponse: string,
  profile: string,
  safetyFit: string,
  growthFit: string,
): { systemPrompt: string; userMessage: string } {
  const systemPrompt = `You are the joint assessment synthesizer for The Dividend Lab.

You have the full debate between Aiden (safety analyst) and Lexa (growth analyst) on ${ticker}.

The stock has been classified on two independent axes:
- **Safety fit**: ${safetyFit.toUpperCase()} (Aiden's assessment: ${aidenScore.final_score}/100)
- **Growth fit**: ${growthFit.toUpperCase()} (Lexa's assessment: ${lexaScore.final_score}/100)
- **Stock profile**: ${profile.toUpperCase()}

## Profile Meanings
- premium fit: High safety + high growth — rare combination of quality and opportunity
- defensive compounder: High safety + low growth — reliable income, limited upside
- speculative grower: Low safety + high growth — opportunity exists but risk is elevated
- moderate fit: Moderate on both axes — decent but not exceptional on either dimension
- safety focus: High safety + moderate growth — strong foundation, some growth potential
- growth focus: Moderate safety + high growth — growth story with acceptable risk
- weak fit: Low on both axes — does not meet standards on either dimension
- caution: Hard flags present or mixed signals requiring further research

Your ONLY job is to write a clear rationale explaining WHY this profile fits. Do NOT choose a different profile. Explain the one that was determined by the scoring rules.

## Instructions
- Write 2-3 paragraphs explaining this profile for ${ticker}
- Frame it as two independent assessments: what Aiden found on safety, what Lexa found on growth
- Do NOT average their scores or treat a gap as a "conflict" — they measure different things
- Reference specific bucket scores, flags, and data points
- If agents adjusted views during the response phase, note that
- This is a research assessment, NOT financial advice
- Respond with ONLY the rationale text, no JSON, no headers`

  const userMessage = `Stock Profile: ${profile.toUpperCase()}
Safety Fit: ${safetyFit} | Growth Fit: ${growthFit}

## Aiden (Safety): ${aidenScore.final_score}/100
Buckets: ${JSON.stringify(aidenScore.bucket_scores)}
Hard flags: ${aidenScore.hard_flags.length > 0 ? aidenScore.hard_flags.join(', ') : 'none'}
Rationale: ${aidenScore.rationale}

## Lexa (Growth): ${lexaScore.final_score}/100
Buckets: ${JSON.stringify(lexaScore.bucket_scores)}
Hard flags: ${lexaScore.hard_flags.length > 0 ? lexaScore.hard_flags.join(', ') : 'none'}
Rationale: ${lexaScore.rationale}

## Shared Dimension Comparison
${comparison.summary}
${comparison.disagreements.length > 0 ? comparison.disagreements.map((d) => `- ${d.bucket}: Aiden ${d.aiden} vs Lexa ${d.lexa} (delta: ${d.delta})`).join('\n') : 'No shared-dimension disagreements.'}

## Aiden's Response
${aidenResponse}

## Lexa's Response
${lexaResponse}

Write the rationale for the ${profile.toUpperCase()} profile.`

  return { systemPrompt, userMessage }
}
