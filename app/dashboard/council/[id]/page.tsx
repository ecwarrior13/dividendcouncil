import { createServiceClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CouncilStatusBadge } from '@/components/dashboard/council-status-badge'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { CouncilApprovalActions } from './approval-actions'
import { AgentRatings } from './agent-ratings'
import type { CouncilSessionStatus } from '@/lib/supabase/types'

// Dynamic color palette — hashes agent name to pick a color
const colorPalette = [
  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
]

function getAgentColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
  return colorPalette[Math.abs(hash) % colorPalette.length]
}

function detectRoundLabels(turns: Array<{ agent_name: string; turn_order: number }>, agentRoles: Record<string, string>): Record<number, string> {
  const labels: Record<number, string> = {}
  let currentPhase = ''
  for (const turn of turns) {
    const role = agentRoles[turn.agent_name] ?? 'unknown'
    let phase = ''
    if (role === 'framer' || role === 'proposer') phase = turns.indexOf(turn) < turns.length / 2 ? 'proposals' : 'synthesis'
    if (role === 'challenger') phase = 'challenge'
    if (role === 'decider') phase = 'decision'

    if (phase && phase !== currentPhase) {
      currentPhase = phase
      if (phase === 'proposals' && turn.turn_order === turns[0].turn_order) labels[turn.turn_order] = 'Round 1 — Proposals'
      else if (phase === 'challenge') labels[turn.turn_order] = 'Round 2 — Challenge & Defend'
      else if (phase === 'decision') labels[turn.turn_order] = 'Round 3 — Decision'
    }
  }
  return labels
}

export default async function CouncilSessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sb = createServiceClient()

  const { data: session } = await sb
    .from('dn_council_sessions')
    .select('*')
    .eq('id', id)
    .single()

  const { data: turns } = await sb
    .from('dn_council_turns')
    .select('*')
    .eq('session_id', id)
    .order('turn_order', { ascending: true })

  // Activity entries filtered by metadata.council_session_id
  const { data: activityEntries } = await sb
    .from('dn_agent_activity')
    .select('*')
    .contains('metadata', { council_session_id: id })
    .order('created_at', { ascending: true })

  // Load agent debate roles for round labels
  const { data: allAgents } = await sb.from('dn_agents').select('name, debate_role')
  const agentRoles: Record<string, string> = {}
  for (const a of allAgents ?? []) {
    if (a.debate_role) agentRoles[a.name] = a.debate_role
  }

  // Load existing feedback for this session
  const { data: feedbackRows } = await sb
    .from('dn_agent_feedback')
    .select('*')
    .eq('session_id', id)

  const existingRatings: Record<string, { rating: number; notes: string | null }> = {}
  for (const fb of feedbackRows ?? []) {
    existingRatings[fb.agent_id] = { rating: fb.rating, notes: fb.notes }
  }

  if (!session) {
    return <div className="text-muted-foreground">Council session not found.</div>
  }

  const allTurns = turns ?? []

  // Unique agents from turns for rating
  const agentsInSession = Array.from(
    new Map(allTurns.filter((t) => t.agent_id).map((t) => [t.agent_id, { id: t.agent_id!, name: t.agent_name }])).values(),
  )

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-2xl font-semibold">
            {session.topic ?? 'Topic Selection'}
          </h2>
          <CouncilStatusBadge status={session.status as CouncilSessionStatus} />
        </div>
        <p className="text-sm text-muted-foreground">
          Council {session.session_type} &middot; {allTurns.length} turns
        </p>
      </div>

      {/* Decision summary */}
      {session.decision && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Decision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{session.decision}</p>
          </CardContent>
        </Card>
      )}

      {/* Debate transcript */}
      {allTurns.length > 0 ? (
        <div className="space-y-4">
          {(() => {
            const roundLabels = detectRoundLabels(allTurns, agentRoles)
            return allTurns.map((turn) => (
              <div key={turn.id}>
                {roundLabels[turn.turn_order] && (
                  <div className="flex items-center gap-3 my-4">
                    <Separator className="flex-1" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {roundLabels[turn.turn_order]}
                    </span>
                    <Separator className="flex-1" />
                  </div>
                )}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getAgentColor(turn.agent_name)} variant="outline">
                        {turn.agent_name}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Turn {turn.turn_order}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{turn.content}</p>
                  </CardContent>
                </Card>
              </div>
            ))
          })()}
        </div>
      ) : (
        <p className="text-muted-foreground">Session in progress — waiting for agent turns...</p>
      )}

      {/* Activity feed */}
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Session Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed initialEntries={activityEntries ?? []} />
        </CardContent>
      </Card>

      {/* Agent ratings */}
      {session.status === 'complete' && agentsInSession.length > 0 && (
        <>
          <Separator />
          <AgentRatings
            sessionId={id}
            agents={agentsInSession}
            existingRatings={Object.keys(existingRatings).length > 0 ? existingRatings : undefined}
          />
        </>
      )}

      {/* Approval actions */}
      {session.status === 'complete' && (
        <>
          <Separator />
          <CouncilApprovalActions sessionId={id} />
        </>
      )}
    </div>
  )
}
