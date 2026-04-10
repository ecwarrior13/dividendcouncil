import { createServiceClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { TopicProposalStatus } from '@/lib/supabase/types'
import { createProposalAction } from './actions'

const statusVariant: Record<TopicProposalStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  queued: 'default',
  seeded: 'secondary',
  approved: 'secondary',
  rejected: 'destructive',
}

export default async function ProposalsPage() {
  const sb = createServiceClient()

  const { data: proposals } = await sb
    .from('dn_topic_proposals')
    .select('*, dn_content_pillars(name)')
    .order('created_at', { ascending: false })

  const { data: pillars } = await sb
    .from('dn_content_pillars')
    .select('*')
    .eq('is_active', true)
    .order('name')

  // Pillar distribution: count completed pipeline runs per pillar
  const { data: pipelineRuns } = await sb
    .from('dn_pipeline_runs')
    .select('pillar_id')
    .not('pillar_id', 'is', null)
    .in('status', ['posted', 'draft_approved', 'draft_ready', 'report_approved', 'report_ready'])

  const pillarCounts: Record<string, number> = {}
  for (const run of pipelineRuns ?? []) {
    pillarCounts[run.pillar_id] = (pillarCounts[run.pillar_id] ?? 0) + 1
  }
  const maxCount = Math.max(1, ...Object.values(pillarCounts))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Topic Proposals</h2>
          <p className="text-sm text-muted-foreground">
            Queue topic ideas for the Council to debate
          </p>
        </div>
      </div>

      {/* New Proposal Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">New Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProposalAction} className="flex items-end gap-3">
            <div className="flex-1">
              <input
                name="topic"
                type="text"
                required
                placeholder="Enter a topic idea..."
                className="w-full rounded-md border px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <select
                name="pillar_id"
                className="rounded-md border px-3 py-1.5 text-sm"
              >
                <option value="">No pillar</option>
                {(pillars ?? []).map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <Button type="submit" size="sm">
              Add to Queue
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Pillar Distribution */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Pillar Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(pillars ?? []).map((pillar) => {
            const count = pillarCounts[pillar.id] ?? 0
            return (
              <div key={pillar.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{pillar.name}</span>
                  <span className="text-muted-foreground">{count} topics</span>
                </div>
                <Progress value={(count / maxCount) * 100} className="h-2" />
              </div>
            )
          })}
          {(!pillars || pillars.length === 0) && (
            <p className="text-sm text-muted-foreground">No pillars yet. Run the v006 migration.</p>
          )}
        </CardContent>
      </Card>

      {/* Proposals Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Topic</TableHead>
            <TableHead>Pillar</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Proposed By</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(proposals ?? []).map((proposal: any) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium max-w-sm">
                {proposal.topic}
              </TableCell>
              <TableCell>
                {proposal.dn_content_pillars?.name ? (
                  <Badge variant="outline">{proposal.dn_content_pillars.name}</Badge>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant[proposal.status as TopicProposalStatus] ?? 'outline'}>
                  {proposal.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {proposal.proposed_by}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(proposal.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
          {(!proposals || proposals.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No proposals yet. Add one above.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
