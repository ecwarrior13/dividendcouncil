import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getClient } from '../atlas.js'

export function registerActivityTools(server: McpServer) {
  server.tool(
    'log_activity',
    'Log a progress update so the human can see what you are doing in real time on the dashboard',
    {
      pipeline_run_id: z.string().uuid().optional(),
      agent_name: z.string().describe('Your name: Clark, Kelly, etc.'),
      activity_type: z.enum([
        'started', 'searching', 'found', 'evaluating',
        'writing', 'scoring', 'revising', 'completed',
        'error', 'info',
      ]),
      message: z.string().describe('Human-readable description of what you are doing right now'),
      metadata: z.record(z.unknown()).optional().describe('Optional structured data (source count, scores, ticker, etc.)'),
    },
    async (input) => {
      const sb = getClient()
      const { data, error } = await sb
        .from('dn_agent_activity')
        .insert({
          pipeline_run_id: input.pipeline_run_id,
          agent_name: input.agent_name,
          activity_type: input.activity_type,
          message: input.message,
          metadata: input.metadata,
        })
        .select()
        .single()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: `Logged: ${input.message}` }] }
    },
  )

  server.tool(
    'get_activity_feed',
    'Get recent activity log entries for a pipeline run',
    {
      pipeline_run_id: z.string().uuid(),
      limit: z.number().optional(),
    },
    async ({ pipeline_run_id, limit }) => {
      const sb = getClient()
      const { data, error } = await sb
        .from('dn_agent_activity')
        .select('*')
        .eq('pipeline_run_id', pipeline_run_id)
        .order('created_at', { ascending: true })
        .limit(limit ?? 50)
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )
}
