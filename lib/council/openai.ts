const EMBEDDING_MODEL = 'text-embedding-3-small'
const EMBEDDING_URL = 'https://api.openai.com/v1/embeddings'

export async function embed(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY not set')

  const response = await fetch(EMBEDDING_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI embeddings error ${response.status}: ${err}`)
  }

  const result = (await response.json()) as {
    data: Array<{ embedding: number[] }>
  }

  return result.data[0].embedding
}
