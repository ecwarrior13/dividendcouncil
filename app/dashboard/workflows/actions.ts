'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/client'

export async function createWorkflowAction(formData: FormData) {
  const name = formData.get('name') as string
  if (!name?.trim()) throw new Error('Name is required')

  const sb = createServiceClient()
  const { data, error } = await sb
    .from('dn_council_workflows')
    .insert({
      name: name.trim(),
      description: (formData.get('description') as string) || null,
      session_type: 'topic_selection',
    })
    .select()
    .single()
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/workflows')
  return data.id
}

export async function addStepAction(formData: FormData) {
  const sb = createServiceClient()
  const { error } = await sb.from('dn_council_workflow_steps').insert({
    workflow_id: formData.get('workflow_id') as string,
    round_number: parseInt(formData.get('round_number') as string),
    round_label: formData.get('round_label') as string,
    step_order: parseInt(formData.get('step_order') as string),
    debate_role: formData.get('debate_role') as string,
    action_type: formData.get('action_type') as string,
    prompt_hint: (formData.get('prompt_hint') as string) || null,
    include_vector: formData.get('include_vector') === 'on',
    include_brand: formData.get('include_brand') === 'on',
    include_pillars: formData.get('include_pillars') === 'on',
    include_weights: formData.get('include_weights') === 'on',
  })
  if (error) throw new Error(error.message)

  const workflowId = formData.get('workflow_id') as string
  revalidatePath(`/dashboard/workflows/${workflowId}`)
}

export async function deleteStepAction(stepId: string, workflowId: string) {
  const sb = createServiceClient()
  const { error } = await sb.from('dn_council_workflow_steps').delete().eq('id', stepId)
  if (error) throw new Error(error.message)

  revalidatePath(`/dashboard/workflows/${workflowId}`)
}

export async function toggleActiveAction(workflowId: string, isActive: boolean) {
  const sb = createServiceClient()
  const { error } = await sb
    .from('dn_council_workflows')
    .update({ is_active: isActive })
    .eq('id', workflowId)
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/workflows')
  revalidatePath(`/dashboard/workflows/${workflowId}`)
}

export async function updateRosterAction(workflowId: string, agentIds: string[]) {
  const sb = createServiceClient()
  // Clear existing roster
  await sb.from('dn_workflow_agents').delete().eq('workflow_id', workflowId)
  // Insert new roster (if any selected)
  if (agentIds.length > 0) {
    const rows = agentIds.map((agent_id) => ({ workflow_id: workflowId, agent_id }))
    const { error } = await sb.from('dn_workflow_agents').insert(rows)
    if (error) throw new Error(error.message)
  }

  revalidatePath(`/dashboard/workflows/${workflowId}`)
}

export async function setDefaultAction(workflowId: string) {
  const sb = createServiceClient()
  // Unset all defaults
  await sb.from('dn_council_workflows').update({ is_default: false }).eq('session_type', 'topic_selection')
  // Set new default
  await sb.from('dn_council_workflows').update({ is_default: true }).eq('id', workflowId)

  revalidatePath('/dashboard/workflows')
}
