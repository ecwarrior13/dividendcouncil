import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

export function registerWebSearchTools(server: McpServer) {
  server.tool(
    'web_search',
    'Search the web for research material. Returns title, URL, and snippet for each result.',
    {
      query: z.string().describe('Search query'),
      num_results: z.number().min(1).max(20).optional().describe('Number of results (default 10)'),
    },
    async ({ query, num_results }) => {
      const apiKey = process.env.BRAVE_SEARCH_API_KEY
      if (!apiKey) {
        return { content: [{ type: 'text' as const, text: 'Error: BRAVE_SEARCH_API_KEY not set. Cannot perform web search.' }] }
      }

      try {
        const count = num_results ?? 10
        const url = new URL('https://api.search.brave.com/res/v1/web/search')
        url.searchParams.set('q', query)
        url.searchParams.set('count', count.toString())

        const response = await fetch(url.toString(), {
          headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip',
            'X-Subscription-Token': apiKey,
          },
        })

        if (!response.ok) {
          return { content: [{ type: 'text' as const, text: `Brave Search API error: ${response.status} ${response.statusText}` }] }
        }

        const data = await response.json() as {
          web?: { results?: Array<{ title: string; url: string; description: string }> }
        }

        const results = (data.web?.results ?? []).map((r) => ({
          title: r.title,
          url: r.url,
          snippet: r.description,
        }))

        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify({ query, result_count: results.length, results }, null, 2),
          }],
        }
      } catch (err) {
        return { content: [{ type: 'text' as const, text: `Error: ${(err as Error).message}` }] }
      }
    },
  )
}
