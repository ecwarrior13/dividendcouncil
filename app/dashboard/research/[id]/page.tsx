import { createServiceClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PipelineStatusBadge } from '@/components/dashboard/pipeline-status-badge'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { ResearchApprovalActions } from './approval-actions'
import type { PipelineRunStatus } from '@/lib/supabase/types'

export default async function ResearchReviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sb = createServiceClient()

  const { data: pipeline } = await sb
    .from('dn_pipeline_runs')
    .select('*')
    .eq('id', id)
    .single()

  const { data: researchRuns } = await sb
    .from('dn_research_runs')
    .select('*, dn_research_sources(*), dn_research_reports(*)')
    .eq('pipeline_run_id', id)
    .order('created_at', { ascending: false })
    .limit(1)

  const { data: activityEntries } = await sb
    .from('dn_agent_activity')
    .select('*')
    .eq('pipeline_run_id', id)
    .order('created_at', { ascending: true })

  const research = researchRuns?.[0]
  const sources = (research?.dn_research_sources ?? []).sort(
    (a: any, b: any) => (b.credibility ?? 0) - (a.credibility ?? 0),
  )
  const reports = (research?.dn_research_reports ?? []).sort(
    (a: any, b: any) => a.rank - b.rank,
  )

  if (!pipeline) {
    return <div className="text-muted-foreground">Pipeline run not found.</div>
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-2xl font-semibold">{pipeline.topic}</h2>
          <PipelineStatusBadge status={pipeline.status as PipelineRunStatus} />
        </div>
        <p className="text-sm text-muted-foreground">
          Research by Clark &middot; {research?.status ?? 'not started'}
        </p>
      </div>

      {reports.map((report: any) => (
        <Card key={report.id}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">#{report.rank}</Badge>
              <CardTitle className="text-lg">{report.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{report.summary}</p>

            {report.key_points && (
              <div>
                <h4 className="text-sm font-medium mb-2">Key Points</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {(report.key_points as string[]).map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {report.recommendation && (
              <div>
                <h4 className="text-sm font-medium mb-1">Recommendation</h4>
                <p className="text-sm text-muted-foreground">{report.recommendation}</p>
              </div>
            )}

            {report.contradictions && (
              <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950">
                <h4 className="text-sm font-medium mb-1">Contradictions Found</h4>
                <p className="text-sm">{report.contradictions}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {reports.length === 0 && (
        <p className="text-muted-foreground">No research reports yet.</p>
      )}

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-3">Sources ({sources.length})</h3>
        <div className="space-y-2">
          {sources.map((source: any) => (
            <div
              key={source.id}
              className="flex items-center justify-between rounded-md border p-3 text-sm"
            >
              <div>
                <span className="font-medium">{source.title ?? source.url ?? 'Untitled'}</span>
                <span className="ml-2 text-muted-foreground">({source.source_type})</span>
              </div>
              <Badge variant="outline">Credibility: {source.credibility}/10</Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Clark's Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed
            pipelineRunId={id}
            initialEntries={activityEntries ?? []}
          />
        </CardContent>
      </Card>

      {pipeline.status === 'report_ready' && (
        <>
          <Separator />
          <ResearchApprovalActions pipelineRunId={id} />
        </>
      )}
    </div>
  )
}
