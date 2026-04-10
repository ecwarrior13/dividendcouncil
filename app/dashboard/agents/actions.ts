'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/client'

export async function updateAgentAction(id: string, formData: FormData) {
  const sb = createServiceClient()

  const voiceProfile = {
    tone: (formData.get('vp_tone') as string) || '',
    style: (formData.get('vp_style') as string) || '',
    avoid: (formData.get('vp_avoid') as string).split(',').map((s) => s.trim()).filter(Boolean),
    prefer: (formData.get('vp_prefer') as string).split(',').map((s) => s.trim()).filter(Boolean),
  }

  const updates: Record<string, unknown> = {
    system_prompt: formData.get('system_prompt') as string,
    personality: (formData.get('personality') as string) || null,
    backstory: (formData.get('backstory') as string) || null,
    influence_weight: parseFloat(formData.get('influence_weight') as string) / 100,
    voice_profile: voiceProfile,
  }

  const debateRole = formData.get('debate_role') as string
  updates.debate_role = debateRole || null

  const isActive = formData.get('is_active')
  updates.is_active = isActive === 'on'

  const { error } = await sb.from('dn_agents').update(updates).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/agents')
  revalidatePath(`/dashboard/agents/${id}`)
}

export async function createAgentAction(formData: FormData) {
  const sb = createServiceClient()

  const voiceProfile = {
    tone: (formData.get('vp_tone') as string) || '',
    style: (formData.get('vp_style') as string) || '',
    avoid: (formData.get('vp_avoid') as string).split(',').map((s) => s.trim()).filter(Boolean),
    prefer: (formData.get('vp_prefer') as string).split(',').map((s) => s.trim()).filter(Boolean),
  }

  const debateRole = formData.get('debate_role') as string

  const { error } = await sb.from('dn_agents').insert({
    name: formData.get('name') as string,
    role: formData.get('role') as string,
    system_prompt: formData.get('system_prompt') as string,
    personality: (formData.get('personality') as string) || null,
    backstory: (formData.get('backstory') as string) || null,
    influence_weight: parseFloat(formData.get('influence_weight') as string) / 100,
    voice_profile: voiceProfile,
    debate_role: debateRole || null,
    is_active: formData.get('is_active') === 'on',
  })
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/agents')
}
