import Anthropic from '@anthropic-ai/sdk'

const PRIMARY_MODEL = 'claude-sonnet-4-20250514'
const FALLBACK_MODEL = 'claude-haiku-4-5-20251001'

let client: Anthropic | null = null

function getClient(): Anthropic {
  if (client) return client
  client = new Anthropic() // uses ANTHROPIC_API_KEY from env
  return client
}

function isRetryableError(err: any): boolean {
  const status = err?.status ?? err?.statusCode
  return status === 529 || status === 503 || status === 500 || status === 429
}

async function withRetry<T>(fn: () => Promise<T>, label: string, maxRetries = 5): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err: any) {
      if (!isRetryableError(err) || attempt === maxRetries) throw err

      // Backoff: 4s, 8s, 16s, 32s (capped at 60s)
      const delay = Math.min(4000 * Math.pow(2, attempt - 1), 60000)
      const status = err?.status ?? err?.statusCode
      console.log(`  ${label}: API overloaded (${status}), retrying in ${delay / 1000}s (attempt ${attempt}/${maxRetries})...`)
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

  const makeCall = (model: string) =>
    anthropic.messages.create({
      model,
      max_tokens: options?.maxTokens ?? 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

  let response
  try {
    // Try primary model with retries
    response = await withRetry(() => makeCall(PRIMARY_MODEL), 'Sonnet')
  } catch (err) {
    if (!isRetryableError(err)) throw err
    // Primary model is still overloaded after all retries — fall back to Haiku
    console.log(`  Sonnet exhausted retries, falling back to Haiku...`)
    response = await withRetry(() => makeCall(FALLBACK_MODEL), 'Haiku', 3)
  }

  const block = response.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type')
  return block.text
}
