import type { AgentScoreOutput, ComparisonOutput } from '../state'

export function buildFinalPrompt(
  ticker: string,
  aidenScore: AgentScoreOutput,
  lexaScore: AgentScoreOutput,
  comparison: ComparisonOutput,
  aidenResponse: string,
  lexaResponse: string,
): { systemPrompt: string; userMessage: string } {
  const systemPrompt = `You are the joint assessment synthesizer for The Dividend Lab.

You have the full debate between Aiden (safety analyst) and Lexa (growth analyst) on ${ticker}. Your job is to produce a final, balanced verdict.

## Output Format
Respond with valid JSON:
{
  "verdict": "strong buy" | "buy" | "hold" | "watch" | "avoid",
  "rationale": "2-3 paragraph synthesis explaining the verdict",
  "aiden_final_score": <Aiden's score, adjusted if his response indicated a change>,
  "lexa_final_score": <Lexa's score, adjusted if her response indicated a change>
}

## Verdict Guide
- strong buy: Both agents score >75, no hard flags, strong agreement
- buy: Average score >70, manageable disagreements, fundamentals solid
- hold: Average 55-70, mixed signals, worth monitoring
- watch: Average 40-55 or significant disagreements, needs more data
- avoid: Average <40, hard flags present, or fundamental concerns from both agents

Respond with ONLY the JSON object.`

  const userMessage = `## Aiden's Initial Score
${JSON.stringify(aidenScore, null, 2)}

## Lexa's Initial Score
${JSON.stringify(lexaScore, null, 2)}

## Comparison
${comparison.summary}

Disagreements:
${comparison.disagreements.map((d) => `- ${d.bucket}: Aiden ${d.aiden} vs Lexa ${d.lexa}`).join('\n')}

## Aiden's Response to Lexa
${aidenResponse}

## Lexa's Response to Aiden
${lexaResponse}

Synthesize the full debate and produce the final verdict for ${ticker}.`

  return { systemPrompt, userMessage }
}
