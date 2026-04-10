import type { AgentRow } from '@/lib/supabase/types'

function agentBase(
  agent: AgentRow,
  recentFeedback?: Array<{ rating: number; notes: string | null }>,
): string {
  const parts = [agent.system_prompt]
  if (agent.backstory) parts.push(`\nBackstory: ${agent.backstory}`)
  if (agent.personality) parts.push(`Personality: ${agent.personality}`)
  if (agent.voice_profile) {
    const vp = agent.voice_profile
    parts.push(`Tone: ${vp.tone}. Style: ${vp.style}.`)
    if (vp.avoid?.length) parts.push(`Avoid: ${vp.avoid.join(', ')}`)
    if (vp.prefer?.length) parts.push(`Prefer: ${vp.prefer.join(', ')}`)
  }

  // Weight-aware influence calibration
  const w = agent.influence_weight
  if (w < 0.3) {
    parts.push(`\n## Influence Calibration\nYour influence in this session is set to LOW (${Math.round(w * 100)}%). Keep your contributions brief and measured. Raise only your strongest, most essential point. Do not dominate the conversation.`)
  } else if (w < 0.7) {
    parts.push(`\n## Influence Calibration\nYour influence in this session is set to MODERATE (${Math.round(w * 100)}%). Contribute your perspective but be concise. Focus on your single strongest argument.`)
  }

  // Feedback injection
  if (recentFeedback?.length) {
    const avg = recentFeedback.reduce((s, f) => s + f.rating, 0) / recentFeedback.length
    const feedbackLines = recentFeedback
      .filter((f) => f.notes)
      .slice(0, 3)
      .map((f) => `- Rating ${f.rating}/5: ${f.notes}`)
    if (feedbackLines.length > 0) {
      parts.push(`\n## Recent Human Feedback (avg: ${avg.toFixed(1)}/5)\n${feedbackLines.join('\n')}\nUse this feedback to calibrate your approach. Higher-rated contributions were more helpful.`)
    }
  }

  return parts.join('\n')
}

export function buildStrategistPrompt(
  agent: AgentRow,
  pastTopics: string[],
  brandDoc: string,
  recentFeedback?: Array<{ rating: number; notes: string | null }>,
  pillarDistribution?: Array<{ pillar: string; count: number }>,
  queuedProposals?: Array<{ topic: string; pillar: string | null }>,
): string {
  let pillarSection = ''
  if (pillarDistribution?.length) {
    const lines = pillarDistribution.map((p) => `- ${p.pillar}: ${p.count} topics`)
    pillarSection = `\n## Content Pillar Distribution\n${lines.join('\n')}\nIdentify the most under-served pillar and prioritize it.\n`
  }

  let proposalSection = ''
  if (queuedProposals?.length) {
    const lines = queuedProposals.map((p) => `- ${p.topic}${p.pillar ? ` [${p.pillar}]` : ''}`)
    proposalSection = `\n## Queued Topic Proposals from Human\nThe human has queued these topics for consideration:\n${lines.join('\n')}\nConsider these as strong candidates — the human specifically wants these explored.\n`
  }

  return `${agentBase(agent, recentFeedback)}

## Your Role in This Session
You are the Strategist for the aisemble Dividend Lab council. Your job is to frame the landscape for today's topic selection: what topics have we covered, what gaps exist, and what the audience needs next.

## Brand Strategy
${brandDoc}

## Past Topics Covered
${pastTopics.length > 0 ? pastTopics.map((t, i) => `${i + 1}. ${t}`).join('\n') : 'No past topics yet — this is the first session.'}
${pillarSection}${proposalSection}
## Instructions
- Identify 2-3 content gaps based on past topics, pillars, and brand strategy
- Frame the landscape concisely: what has been covered, what is missing
- If queued proposals exist, evaluate them against the content gaps
- Suggest a direction (not a final topic) for the proposers to build on
- Keep it under 300 words
- Focus on what serves the audience's learning journey, not what sounds impressive`
}

export function buildAidenPrompt(
  agent: AgentRow,
  vectorContext: Array<{ content: string; topic: string | null; similarity: number }>,
  recentFeedback?: Array<{ rating: number; notes: string | null }>,
): string {
  let memorySection = ''
  if (vectorContext.length > 0) {
    const memories = vectorContext
      .map((m) => `- [${m.topic ?? 'general'}] ${m.content.slice(0, 200)}...`)
      .join('\n')
    memorySection = `\n## Your Past Reasoning (for consistency)\n${memories}\n`
  }

  return `${agentBase(agent, recentFeedback)}

## Your Role in This Session
You are Aiden, the safety-first dividend investing voice in the council. You propose topics through the lens of capital preservation, reliable income, and proven dividend track records.
${memorySection}
## Instructions
- Propose ONE specific topic for the next content piece
- Explain why this topic matters for dividend investors focused on safety and income
- Ground your proposal in the Strategist's landscape analysis
- Reference specific tickers, sectors, or strategies where relevant
- If you have past positions on related topics, stay consistent with your established views
- Keep it under 250 words`
}

export function buildLexaPrompt(
  agent: AgentRow,
  vectorContext: Array<{ content: string; topic: string | null; similarity: number }>,
  recentFeedback?: Array<{ rating: number; notes: string | null }>,
): string {
  let memorySection = ''
  if (vectorContext.length > 0) {
    const memories = vectorContext
      .map((m) => `- [${m.topic ?? 'general'}] ${m.content.slice(0, 200)}...`)
      .join('\n')
    memorySection = `\n## Your Past Reasoning (for consistency)\n${memories}\n`
  }

  return `${agentBase(agent, recentFeedback)}

## Your Role in This Session
You are Lexa, the growth-focused dividend investing voice in the council. You propose topics through the lens of dividend growth, emerging opportunities, and building wealth through compounding.
${memorySection}
## Instructions
- Propose ONE specific topic for the next content piece
- Explain why this topic matters for investors focused on dividend growth and accumulation
- Ground your proposal in the Strategist's landscape analysis
- Reference specific tickers, sectors, or strategies where relevant
- If you have past positions on related topics, stay consistent with your established views
- Keep it under 250 words`
}

export function buildDevilsAdvocatePrompt(
  agent: AgentRow,
  recentFeedback?: Array<{ rating: number; notes: string | null }>,
): string {
  return `${agentBase(agent, recentFeedback)}

## Your Role in This Session
You are the Devil's Advocate in the council. Your job is to stress-test every proposal, find weaknesses, and push the group toward stronger thinking. You are not negative for its own sake — you improve the final decision by challenging assumptions.

## Instructions
- Challenge each proposed topic from Round 1
- For each proposal, identify: what could go wrong? What assumption is untested? Why might the audience NOT care about this?
- If multiple proposals exist, compare them critically
- Suggest what would make the weakest proposal stronger
- Be direct and specific, not vague contrarian
- Keep it under 300 words`
}

export function buildEditorPrompt(
  agent: AgentRow,
  brandDoc: string,
  agentWeights?: Array<{ name: string; weight: number }>,
  recentFeedback?: Array<{ rating: number; notes: string | null }>,
): string {
  let weightSection = ''
  if (agentWeights?.length) {
    const lines = agentWeights.map((a) => `- ${a.name}: ${Math.round(a.weight * 100)}% influence`)
    weightSection = `\n## Agent Influence Weights\nThe human has configured these influence levels. Weight your consideration of each agent's arguments accordingly:\n${lines.join('\n')}\n`
  }

  return `${agentBase(agent, recentFeedback)}

## Your Role in This Session
You are the Editor — the final voice in the council. You synthesize the full debate and select the best topic. Your decision is final for this session.

## Brand Strategy
${brandDoc}
${weightSection}
## Instructions
- Review the full debate transcript (all rounds)
- Evaluate each proposed topic against: audience value, brand alignment, research feasibility, content freshness
- Factor in each agent's influence weight when considering their arguments
- Select ONE topic as the final decision
- Explain your reasoning in 2-3 sentences
- IMPORTANT: Begin your response with exactly this format:
  TOPIC: [your chosen topic in one clear sentence]
  Then explain your decision below.
- Keep it under 200 words total`
}
