import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getClient } from '../atlas.js'

export function registerResearchTools(server: McpServer) {
  server.tool(
    'create_research_run',
    'Create a research run for a pipeline and set status to researching',
    {
      pipeline_run_id: z.string().uuid(),
      topic: z.string(),
    },
    async ({ pipeline_run_id, topic }) => {
      const sb = getClient()

      // Create the research run
      const { data: run, error: runErr } = await sb
        .from('dn_research_runs')
        .insert({ pipeline_run_id, topic, status: 'running' })
        .select()
        .single()
      if (runErr) return { content: [{ type: 'text' as const, text: `Error: ${runErr.message}` }] }

      // Update pipeline status to researching
      await sb.from('dn_pipeline_runs').update({ status: 'researching' }).eq('id', pipeline_run_id)

      return { content: [{ type: 'text' as const, text: JSON.stringify(run, null, 2) }] }
    },
  )

  server.tool(
    'add_research_source',
    'Add a source to a research run with credibility rating',
    {
      research_run_id: z.string().uuid(),
      url: z.string().optional(),
      source_type: z.enum(['web', 'sec_filing', 'finance_site', 'youtube_transcript', 'pdf', 'other']),
      title: z.string().optional(),
      credibility: z.number().min(1).max(10),
      summary: z.string().optional(),
      raw_content: z.string().optional(),
    },
    async (input) => {
      const sb = getClient()
      const { data, error } = await sb.from('dn_research_sources').insert(input).select().single()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )

  server.tool(
    'write_research_report',
    'Write a ranked research report item (rank 1, 2, or 3)',
    {
      research_run_id: z.string().uuid(),
      rank: z.number().min(1).max(3),
      title: z.string(),
      summary: z.string(),
      key_points: z.array(z.string()),
      recommendation: z.string().optional(),
      contradictions: z.string().optional(),
    },
    async (input) => {
      const sb = getClient()
      const { data, error } = await sb
        .from('dn_research_reports')
        .insert({ ...input, key_points: input.key_points })
        .select()
        .single()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )

  server.tool(
    'complete_research',
    'Mark a research run as complete and set pipeline to report_ready',
    { research_run_id: z.string().uuid() },
    async ({ research_run_id }) => {
      const sb = getClient()

      const { error: runErr } = await sb
        .from('dn_research_runs')
        .update({ status: 'complete', completed_at: new Date().toISOString() })
        .eq('id', research_run_id)
      if (runErr) return { content: [{ type: 'text' as const, text: `Error: ${runErr.message}` }] }

      // Get pipeline_run_id from the research run
      const { data: run } = await sb
        .from('dn_research_runs')
        .select('pipeline_run_id')
        .eq('id', research_run_id)
        .single()

      if (run) {
        await sb
          .from('dn_pipeline_runs')
          .update({ status: 'report_ready' })
          .eq('id', run.pipeline_run_id)
      }

      return { content: [{ type: 'text' as const, text: `Research run ${research_run_id} completed. Pipeline moved to report_ready.` }] }
    },
  )

  server.tool(
    'get_research_for_pipeline',
    'Get full research for a pipeline run: run, sources, and reports',
    { pipeline_run_id: z.string().uuid() },
    async ({ pipeline_run_id }) => {
      const sb = getClient()

      const { data: runs, error: runErr } = await sb
        .from('dn_research_runs')
        .select('*, dn_research_sources(*), dn_research_reports(*)')
        .eq('pipeline_run_id', pipeline_run_id)
        .order('created_at', { ascending: false })
        .limit(1)
      if (runErr) return { content: [{ type: 'text' as const, text: `Error: ${runErr.message}` }] }

      if (!runs || runs.length === 0) {
        return { content: [{ type: 'text' as const, text: 'No research found for this pipeline run.' }] }
      }

      const run = runs[0] as any
      const result = {
        research_run: {
          id: run.id,
          topic: run.topic,
          status: run.status,
          human_approved: run.human_approved,
          created_at: run.created_at,
          completed_at: run.completed_at,
        },
        sources: (run.dn_research_sources ?? []).sort(
          (a: any, b: any) => (b.credibility ?? 0) - (a.credibility ?? 0),
        ),
        reports: (run.dn_research_reports ?? []).sort(
          (a: any, b: any) => a.rank - b.rank,
        ),
      }

      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] }
    },
  )
}
