'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/client'
import { VALID_STATUS_TRANSITIONS } from '@/lib/supabase/types'
import type { PipelineRunStatus } from '@/lib/supabase/types'

async function transitionPipeline(id: string, newStatus: PipelineRunStatus, extras?: Record<string, unknown>) {
  const sb = createServiceClient()
  const { data: current, error: fetchErr } = await sb
    .from('dn_pipeline_runs')
    .select('status')
    .eq('id', id)
    .single()
  if (fetchErr) throw new Error(fetchErr.message)

  const allowed = VALID_STATUS_TRANSITIONS[current.status as PipelineRunStatus]
  if (!allowed.includes(newStatus)) {
    throw new Error(`Cannot transition from ${current.status} to ${newStatus}`)
  }

  const updates: Record<string, unknown> = { status: newStatus, ...extras }
  if (newStatus === 'posted' || newStatus === 'cancelled') {
    updates.completed_at = new Date().toISOString()
  }

  const { error } = await sb.from('dn_pipeline_runs').update(updates).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
}

export async function createNewPipelineRun(formData: FormData) {
  const topic = formData.get('topic') as string
  if (!topic?.trim()) throw new Error('Topic is required')
  const pillarId = formData.get('pillar_id') as string

  const sb = createServiceClient()
  const { error } = await sb.from('dn_pipeline_runs').insert({
    topic: topic.trim(),
    trigger_type: 'manual',
    status: 'topic_approved',
    pillar_id: pillarId || null,
  })
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
}

export async function approveResearch(pipelineRunId: string) {
  const sb = createServiceClient()
  // Mark research run as human_approved
  const { data: runs } = await sb
    .from('dn_research_runs')
    .select('id')
    .eq('pipeline_run_id', pipelineRunId)
    .order('created_at', { ascending: false })
    .limit(1)
  if (runs?.[0]) {
    await sb.from('dn_research_runs').update({ human_approved: true }).eq('id', runs[0].id)
  }
  await transitionPipeline(pipelineRunId, 'report_approved')
}

export async function rejectResearch(pipelineRunId: string, notes: string) {
  await transitionPipeline(pipelineRunId, 'cancelled', { notes })
}

export async function approveDraft(pipelineRunId: string) {
  const sb = createServiceClient()
  // Mark latest draft as approved
  const { data: drafts } = await sb
    .from('dn_thread_drafts')
    .select('id')
    .eq('pipeline_run_id', pipelineRunId)
    .order('version', { ascending: false })
    .limit(1)
  if (drafts?.[0]) {
    await sb.from('dn_thread_drafts').update({ status: 'approved' }).eq('id', drafts[0].id)
  }
  await transitionPipeline(pipelineRunId, 'draft_approved')
}

export async function rejectDraft(pipelineRunId: string, notes: string) {
  await transitionPipeline(pipelineRunId, 'cancelled', { notes })
}

// --- Council Actions ---

export async function approveCouncilTopic(sessionId: string) {
  const sb = createServiceClient()

  const { data: session, error: fetchErr } = await sb
    .from('dn_council_sessions')
    .select('topic, decision')
    .eq('id', sessionId)
    .single()
  if (fetchErr) throw new Error(fetchErr.message)
  if (!session.topic) throw new Error('Council session has no topic')

  // Create pipeline run from council decision
  const { data: run, error: runErr } = await sb
    .from('dn_pipeline_runs')
    .insert({
      topic: session.topic,
      trigger_type: 'manual',
      status: 'topic_approved',
      notes: `Council decision: ${session.decision?.slice(0, 200) ?? ''}`,
    })
    .select()
    .single()
  if (runErr) throw new Error(runErr.message)

  // Link session to the pipeline run
  await sb
    .from('dn_council_sessions')
    .update({ pipeline_run_id: run.id })
    .eq('id', sessionId)

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/council')
}

export async function rejectCouncilTopic(sessionId: string, notes: string) {
  const sb = createServiceClient()
  await sb
    .from('dn_council_sessions')
    .update({ status: 'cancelled' })
    .eq('id', sessionId)

  revalidatePath('/dashboard/council')
}

// --- Feedback Actions ---

export async function submitAgentFeedback(
  sessionId: string,
  ratings: Array<{ agentId: string; rating: number; notes?: string }>,
) {
  const sb = createServiceClient()
  for (const r of ratings) {
    await sb.from('dn_agent_feedback').upsert(
      {
        session_id: sessionId,
        agent_id: r.agentId,
        rating: r.rating,
        notes: r.notes ?? null,
      },
      { onConflict: 'session_id,agent_id' },
    )
  }
  revalidatePath(`/dashboard/council/${sessionId}`)
}
