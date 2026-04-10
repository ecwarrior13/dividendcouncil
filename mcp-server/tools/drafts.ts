import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getClient } from '../atlas.js'

export function registerDraftTools(server: McpServer) {
  server.tool(
    'create_thread_draft',
    'Create a thread draft with tweets, scores, and audit results',
    {
      pipeline_run_id: z.string().uuid(),
      research_report_id: z.string().uuid().optional(),
      tweets: z.array(z.string()),
      authenticity_score: z.number().min(0).max(100),
      voice_score: z.number().min(0).max(100),
      overall_score: z.number().min(0).max(100),
      audit_notes: z.string(),
      ai_patterns_flagged: z.array(z.string()),
    },
    async (input) => {
      const sb = getClient()

      // Update pipeline status to drafting
      await sb.from('dn_pipeline_runs').update({ status: 'drafting' }).eq('id', input.pipeline_run_id)

      const { data, error } = await sb
        .from('dn_thread_drafts')
        .insert({
          pipeline_run_id: input.pipeline_run_id,
          research_report_id: input.research_report_id,
          version: 1,
          tweets: input.tweets,
          authenticity_score: input.authenticity_score,
          voice_score: input.voice_score,
          overall_score: input.overall_score,
          audit_notes: input.audit_notes,
          ai_patterns_flagged: input.ai_patterns_flagged,
          status: 'draft',
        })
        .select()
        .single()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )

  server.tool(
    'revise_thread_draft',
    'Create a revised version of a thread draft with reason and score delta',
    {
      draft_id: z.string().uuid(),
      tweets: z.array(z.string()),
      authenticity_score: z.number().min(0).max(100),
      voice_score: z.number().min(0).max(100),
      overall_score: z.number().min(0).max(100),
      audit_notes: z.string(),
      ai_patterns_flagged: z.array(z.string()),
      reason: z.string(),
    },
    async (input) => {
      const sb = getClient()

      // Get current draft to calculate delta
      const { data: current, error: fetchErr } = await sb
        .from('dn_thread_drafts')
        .select('*')
        .eq('id', input.draft_id)
        .single()
      if (fetchErr) return { content: [{ type: 'text' as const, text: `Error: ${fetchErr.message}` }] }

      const previousVersion = current.version as number
      const newVersion = previousVersion + 1
      const scoreDelta = input.overall_score - (current.overall_score ?? 0)

      // Update the draft with new content
      const { data: updated, error: updateErr } = await sb
        .from('dn_thread_drafts')
        .update({
          version: newVersion,
          tweets: input.tweets,
          authenticity_score: input.authenticity_score,
          voice_score: input.voice_score,
          overall_score: input.overall_score,
          audit_notes: input.audit_notes,
          ai_patterns_flagged: input.ai_patterns_flagged,
          status: 'revised',
        })
        .eq('id', input.draft_id)
        .select()
        .single()
      if (updateErr) return { content: [{ type: 'text' as const, text: `Error: ${updateErr.message}` }] }

      // Record the revision
      await sb.from('dn_thread_revisions').insert({
        draft_id: input.draft_id,
        previous_version: previousVersion,
        new_version: newVersion,
        reason: input.reason,
        score_delta: scoreDelta,
      })

      return { content: [{ type: 'text' as const, text: JSON.stringify({ ...updated, score_delta: scoreDelta }, null, 2) }] }
    },
  )

  server.tool(
    'get_thread_draft',
    'Get a thread draft with its revision history',
    { draft_id: z.string().uuid() },
    async ({ draft_id }) => {
      const sb = getClient()
      const { data, error } = await sb
        .from('dn_thread_drafts')
        .select('*, dn_thread_revisions(*)')
        .eq('id', draft_id)
        .single()
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
    },
  )

  server.tool(
    'complete_draft',
    'Mark drafting as complete and set pipeline to draft_ready',
    { pipeline_run_id: z.string().uuid() },
    async ({ pipeline_run_id }) => {
      const sb = getClient()
      const { error } = await sb
        .from('dn_pipeline_runs')
        .update({ status: 'draft_ready' })
        .eq('id', pipeline_run_id)
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }] }
      return { content: [{ type: 'text' as const, text: `Pipeline ${pipeline_run_id} moved to draft_ready.` }] }
    },
  )
}
