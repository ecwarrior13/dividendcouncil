import { createServiceClient } from '@/lib/supabase/client'
import { AgentEditForm } from './agent-edit-form'

export default async function AgentEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sb = createServiceClient()

  const { data: agent } = await sb
    .from('dn_agents')
    .select('*')
    .eq('id', id)
    .single()

  if (!agent) {
    return <div className="text-muted-foreground">Agent not found.</div>
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{agent.name}</h2>
        <p className="text-sm text-muted-foreground">
          {agent.role} &middot; {agent.debate_role ?? 'no debate role'}
        </p>
      </div>
      <AgentEditForm agent={agent} />
    </div>
  )
}
