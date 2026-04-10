import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getClient } from '../atlas.js'

export function registerAgentTools(server: McpServer) {
  server.tool(
    'get_agent',
    'Get an agent profile by name (e.g. Clark, Kelly, Aiden, Lexa)',
    { name: z.string() },
    async ({ name }) => {
      const sb = getClient()
      const { data, error } = await sb
        .from('dn_agents')
        .select('*')
        .eq('name', name)
        .maybeSingle()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      if (!data) return { content: [{ type: 'text' as const, text: `Agent "${name}" not found.` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )

  server.tool(
    'record_agent_position',
    'Record an agent\'s position/stance on a topic or ticker',
    {
      agent_name: z.string(),
      ticker: z.string().optional(),
      topic: z.string(),
      stance: z.string(),
      reasoning: z.string(),
      confidence: z.number().min(1).max(10),
    },
    async ({ agent_name, ticker, topic, stance, reasoning, confidence }) => {
      const sb = getClient()

      // Look up agent ID by name
      const { data: agent } = await sb
        .from('dn_agents')
        .select('id')
        .eq('name', agent_name)
        .maybeSingle()
      if (!agent) {
        return { content: [{ type: 'text' as const, text: `Agent "${agent_name}" not found.` }] }
      }

      const { data, error } = await sb
        .from('dn_agent_positions')
        .insert({ agent_id: agent.id, ticker, topic, stance, reasoning, confidence })
        .select()
        .single()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )
}
