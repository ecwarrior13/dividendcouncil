import type { AgentScoreOutput, ComparisonOutput } from '../state'

export function buildResponsePrompt(
  agentName: 'Aiden' | 'Lexa',
  ownScore: AgentScoreOutput,
  otherScore: AgentScoreOutput,
  comparison: ComparisonOutput,
): { systemPrompt: string; userMessage: string } {
  const otherName = agentName === 'Aiden' ? 'Lexa' : 'Aiden'

  const systemPrompt = `You are ${agentName} from The Dividend Lab.

You have already scored ${ownScore.ticker}. Now you are seeing ${otherName}'s score and a comparison of where you agree and disagree.

Your job:
1. Address the specific disagreements identified in the comparison
2. Explain WHY you scored differently on those buckets
3. If ${otherName}'s reasoning is convincing, acknowledge it and adjust your perspective
4. If you stand firm, explain what data supports your position
5. Be specific — reference actual numbers from the financial data

Keep your response under 300 words. Be direct, not diplomatic.`

  const userMessage = `## Your Score
${JSON.stringify(ownScore, null, 2)}

## ${otherName}'s Score
${JSON.stringify(otherScore, null, 2)}

## Comparison
${comparison.summary}

### Key Disagreements
${comparison.disagreements.map((d) => `- ${d.bucket}: You scored ${agentName === 'Aiden' ? d.aiden : d.lexa}, ${otherName} scored ${agentName === 'Aiden' ? d.lexa : d.aiden} (delta: ${d.delta})`).join('\n')}

### Questions to Address
${comparison.key_questions.map((q) => `- ${q}`).join('\n')}

Respond to ${otherName}'s analysis. Where do you agree? Where do you push back?`

  return { systemPrompt, userMessage }
}
