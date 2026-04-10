import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getClient, VALID_STATUS_TRANSITIONS } from '../atlas.js'
import type { PipelineRunStatus } from '../atlas.js'

export function registerPipelineTools(server: McpServer) {
  server.tool(
    'list_pipeline_runs',
    'List pipeline runs, optionally filtered by status',
    { status: z.string().optional(), limit: z.number().optional() },
    async ({ status, limit }) => {
      const sb = getClient()
      let query = sb.from('dn_pipeline_runs').select('*').order('created_at', { ascending: false })
      if (status) query = query.eq('status', status)
      if (limit) query = query.limit(limit)
      const { data, error } = await query
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )

  server.tool(
    'get_pipeline_run',
    'Get a single pipeline run by ID',
    { id: z.string().uuid() },
    async ({ id }) => {
      const sb = getClient()
      const { data, error } = await sb.from('dn_pipeline_runs').select('*').eq('id', id).single()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )

  server.tool(
    'create_pipeline_run',
    'Create a new pipeline run with a topic',
    {
      topic: z.string(),
      trigger_type: z.enum(['manual', 'scheduled']),
      notes: z.string().optional(),
    },
    async ({ topic, trigger_type, notes }) => {
      const sb = getClient()
      const { data, error } = await sb
        .from('dn_pipeline_runs')
        .insert({ topic, trigger_type, notes, status: 'topic_selection' })
        .select()
        .single()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )

  server.tool(
    'update_pipeline_status',
    'Update a pipeline run status (validates allowed transitions)',
    {
      id: z.string().uuid(),
      status: z.string(),
      notes: z.string().optional(),
    },
    async ({ id, status, notes }) => {
      const sb = getClient()

      // Validate transition
      const { data: current, error: fetchErr } = await sb
        .from('dn_pipeline_runs')
        .select('status')
        .eq('id', id)
        .single()
      if (fetchErr) return { content: [{ type: 'text' as const, text: `Error: ${fetchErr.message}` }] }

      const currentStatus = current.status as PipelineRunStatus
      const newStatus = status as PipelineRunStatus
      const allowed = VALID_STATUS_TRANSITIONS[currentStatus]
      if (!allowed?.includes(newStatus)) {
        return {
          content: [{
            type: 'text' as const,
            text: `Invalid transition: ${currentStatus} → ${newStatus}. Allowed: ${allowed?.join(', ') ?? 'none'}`,
          }],
        }
      }

      const updates: Record<string, unknown> = { status: newStatus }
      if (notes) updates.notes = notes
      if (newStatus === 'posted' || newStatus === 'cancelled') {
        updates.completed_at = new Date().toISOString()
      }

      const { data, error } = await sb
        .from('dn_pipeline_runs')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )
}
