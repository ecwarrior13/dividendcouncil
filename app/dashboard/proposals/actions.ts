'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/client'

export async function createProposalAction(formData: FormData) {
  const topic = formData.get('topic') as string
  if (!topic?.trim()) throw new Error('Topic is required')

  const pillarId = formData.get('pillar_id') as string

  const sb = createServiceClient()
  const { error } = await sb.from('dn_topic_proposals').insert({
    topic: topic.trim(),
    pillar_id: pillarId || null,
    proposed_by: 'human',
    status: 'queued',
  })
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/proposals')
}

export async function rejectProposalAction(id: string) {
  const sb = createServiceClient()
  const { error } = await sb
    .from('dn_topic_proposals')
    .update({ status: 'rejected' })
    .eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/proposals')
}
