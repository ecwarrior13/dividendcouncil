import { createServiceClient } from '../client'
import type { WorkflowRow, WorkflowInsert, WorkflowStepRow, WorkflowStepInsert } from '../types'

const WORKFLOWS = 'dn_council_workflows'
const STEPS = 'dn_council_workflow_steps'

export async function getDefaultWorkflow(
  sessionType = 'topic_selection',
): Promise<{ workflow: WorkflowRow; steps: WorkflowStepRow[] }> {
  const sb = createServiceClient()
  const { data: workflow, error } = await sb
    .from(WORKFLOWS)
    .select('*')
    .eq('session_type', sessionType)
    .eq('is_default', true)
    .eq('is_active', true)
    .single()
  if (error) throw new Error(`No default workflow for ${sessionType}: ${error.message}`)

  const { data: steps, error: stepsErr } = await sb
    .from(STEPS)
    .select('*')
    .eq('workflow_id', workflow.id)
    .order('round_number', { ascending: true })
    .order('step_order', { ascending: true })
  if (stepsErr) throw stepsErr

  return { workflow: workflow as WorkflowRow, steps: (steps ?? []) as WorkflowStepRow[] }
}

export async function getWorkflow(id: string): Promise<WorkflowRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(WORKFLOWS).select('*').eq('id', id).single()
  if (error) throw error
  return data as WorkflowRow
}

export async function getWorkflowWithSteps(
  id: string,
): Promise<{ workflow: WorkflowRow; steps: WorkflowStepRow[] }> {
  const sb = createServiceClient()
  const { data: workflow, error } = await sb.from(WORKFLOWS).select('*').eq('id', id).single()
  if (error) throw error

  const { data: steps, error: stepsErr } = await sb
    .from(STEPS)
    .select('*')
    .eq('workflow_id', id)
    .order('round_number', { ascending: true })
    .order('step_order', { ascending: true })
  if (stepsErr) throw stepsErr

  return { workflow: workflow as WorkflowRow, steps: (steps ?? []) as WorkflowStepRow[] }
}

export async function listWorkflows(): Promise<WorkflowRow[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(WORKFLOWS)
    .select('*')
    .eq('is_active', true)
    .order('name')
  if (error) throw error
  return data as WorkflowRow[]
}

export async function createWorkflow(input: WorkflowInsert): Promise<WorkflowRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(WORKFLOWS).insert(input).select().single()
  if (error) throw error
  return data as WorkflowRow
}

export async function updateWorkflow(id: string, updates: Partial<WorkflowInsert>): Promise<WorkflowRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(WORKFLOWS).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as WorkflowRow
}

export async function createWorkflowStep(input: WorkflowStepInsert): Promise<WorkflowStepRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(STEPS).insert(input).select().single()
  if (error) throw error
  return data as WorkflowStepRow
}

export async function updateWorkflowStep(
  id: string,
  updates: Partial<WorkflowStepInsert>,
): Promise<WorkflowStepRow> {
  const sb = createServiceClient()
  const { data, error } = await sb.from(STEPS).update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as WorkflowStepRow
}

export async function deleteWorkflowStep(id: string): Promise<void> {
  const sb = createServiceClient()
  const { error } = await sb.from(STEPS).delete().eq('id', id)
  if (error) throw error
}

export async function setDefaultWorkflow(id: string, sessionType: string): Promise<void> {
  const sb = createServiceClient()
  // Unset all defaults for this session type
  await sb.from(WORKFLOWS).update({ is_default: false }).eq('session_type', sessionType)
  // Set the new default
  await sb.from(WORKFLOWS).update({ is_default: true }).eq('id', id)
}

// --- Workflow Agent Roster ---

const ROSTER = 'dn_workflow_agents'

export async function getWorkflowRoster(workflowId: string): Promise<string[]> {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from(ROSTER)
    .select('agent_id')
    .eq('workflow_id', workflowId)
  if (error) throw error
  return (data ?? []).map((r) => r.agent_id)
}

export async function setWorkflowRoster(workflowId: string, agentIds: string[]): Promise<void> {
  const sb = createServiceClient()
  // Clear existing roster
  await sb.from(ROSTER).delete().eq('workflow_id', workflowId)
  // Insert new roster (if any)
  if (agentIds.length > 0) {
    const rows = agentIds.map((agent_id) => ({ workflow_id: workflowId, agent_id }))
    const { error } = await sb.from(ROSTER).insert(rows)
    if (error) throw error
  }
}
