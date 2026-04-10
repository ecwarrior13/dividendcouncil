import Anthropic from '@anthropic-ai/sdk'

let client: Anthropic | null = null

function getClient(): Anthropic {
  if (client) return client
  client = new Anthropic() // uses ANTHROPIC_API_KEY from env
  return client
}

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err: any) {
      const status = err?.status ?? err?.statusCode
      const shouldRetry = status === 529 || status === 503 || status === 500
      if (!shouldRetry || attempt === maxRetries) throw err

      const delay = Math.min(2000 * Math.pow(2, attempt - 1), 30000) // 2s, 4s, 8s... max 30s
      console.log(`  API overloaded (${status}), retrying in ${delay / 1000}s (attempt ${attempt}/${maxRetries})...`)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw new Error('Unreachable')
}

export async function callAgent(
  systemPrompt: string,
  userMessage: string,
  options?: { maxTokens?: number },
): Promise<string> {
  const anthropic = getClient()

  const response = await withRetry(() =>
    anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: options?.maxTokens ?? 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  )

  const block = response.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type')
  return block.text
}
