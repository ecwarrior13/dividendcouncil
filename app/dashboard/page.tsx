import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/client'
import { PipelineStatusBadge } from '@/components/dashboard/pipeline-status-badge'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { PipelineRunStatus } from '@/lib/supabase/types'
import { createNewPipelineRun } from './actions'

function actionLink(run: { id: string; status: PipelineRunStatus }) {
  switch (run.status) {
    case 'report_ready':
      return <Link href={`/dashboard/research/${run.id}`} className="text-sm text-primary underline">Review Research</Link>
    case 'draft_ready':
      return <Link href={`/dashboard/drafts/${run.id}`} className="text-sm text-primary underline">Review Draft</Link>
    case 'report_approved':
      return <span className="text-sm text-muted-foreground">Waiting for Kelly</span>
    case 'topic_approved':
      return <span className="text-sm text-muted-foreground">Waiting for Clark</span>
    case 'researching':
      return <span className="text-sm text-muted-foreground">Clark researching...</span>
    case 'drafting':
      return <span className="text-sm text-muted-foreground">Kelly drafting...</span>
    default:
      return null
  }
}

export default async function DashboardPage() {
  const sb = createServiceClient()
  const { data: runs } = await sb
    .from('dn_pipeline_runs')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: pillars } = await sb
    .from('dn_content_pillars')
    .select('*')
    .eq('is_active', true)
    .order('name')

  const { data: recentActivity } = await sb
    .from('dn_agent_activity')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(30)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Pipeline</h2>
        <form action={createNewPipelineRun}>
          <div className="flex items-center gap-2">
            <input
              name="topic"
              type="text"
              placeholder="Enter topic..."
              required
              className="rounded-md border px-3 py-1.5 text-sm w-64"
            />
            <select name="pillar_id" className="rounded-md border px-3 py-1.5 text-sm">
              <option value="">Pillar</option>
              {(pillars ?? []).map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <Button type="submit" size="sm">
              New Run
            </Button>
          </div>
        </form>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Topic</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Trigger</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(runs ?? []).map((run) => (
            <TableRow key={run.id}>
              <TableCell className="font-medium max-w-xs truncate">
                {run.topic ?? '—'}
              </TableCell>
              <TableCell>
                <PipelineStatusBadge status={run.status as PipelineRunStatus} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {run.trigger_type}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(run.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {actionLink({ id: run.id, status: run.status as PipelineRunStatus })}
              </TableCell>
            </TableRow>
          ))}
          {(!runs || runs.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No pipeline runs yet. Create one above.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Live Agent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed initialEntries={(recentActivity ?? []).reverse()} />
        </CardContent>
      </Card>
    </div>
  )
}
