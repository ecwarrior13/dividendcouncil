import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PipelineStatusBadge } from '@/components/dashboard/pipeline-status-badge'
import { ScoreDisplay } from '@/components/dashboard/score-display'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import type { PipelineRunStatus } from '@/lib/supabase/types'

const STAGES: PipelineRunStatus[] = [
  'topic_selection',
  'topic_approved',
  'researching',
  'report_ready',
  'report_approved',
  'drafting',
  'draft_ready',
  'draft_approved',
  'posted',
]

function stageIndex(status: PipelineRunStatus): number {
  const i = STAGES.indexOf(status)
  return i === -1 ? 0 : i
}

export default async function PipelineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sb = createServiceClient()

  // Core pipeline run
  const { data: pipeline } = await sb
    .from('dn_pipeline_runs')
    .select('*, dn_content_pillars(name)')
    .eq('id', id)
    .single()

  if (!pipeline) {
    return <div className="text-muted-foreground">Pipeline run not found.</div>
  }

  // Council session linked to this pipeline (if any)
  const { data: councilSession } = await sb
    .from('dn_council_sessions')
    .select('*')
    .eq('pipeline_run_id', id)
    .maybeSingle()

  // Research runs + sources + reports
  const { data: researchRuns } = await sb
    .from('dn_research_runs')
    .select('*, dn_research_sources(*), dn_research_reports(*)')
    .eq('pipeline_run_id', id)
    .order('created_at', { ascending: false })

  const research = researchRuns?.[0]
  const sources = (research?.dn_research_sources ?? []).sort(
    (a: any, b: any) => (b.credibility ?? 0) - (a.credibility ?? 0),
  )
  const reports = (research?.dn_research_reports ?? []).sort(
    (a: any, b: any) => a.rank - b.rank,
  )

  // Thread drafts + revisions
  const { data: drafts } = await sb
    .from('dn_thread_drafts')
    .select('*, dn_thread_revisions(*)')
    .eq('pipeline_run_id', id)
    .order('version', { ascending: false })

  const latestDraft = drafts?.[0]

  // Posted thread (if any)
  const { data: postedThread } = await sb
    .from('dn_posted_threads')
    .select('*')
    .eq('pipeline_run_id', id)
    .maybeSingle()

  // Activity feed
  const { data: activityEntries } = await sb
    .from('dn_agent_activity')
    .select('*')
    .eq('pipeline_run_id', id)
    .order('created_at', { ascending: true })

  const currentStage = stageIndex(pipeline.status as PipelineRunStatus)

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-semibold">{pipeline.topic ?? 'Untitled'}</h2>
          <PipelineStatusBadge status={pipeline.status as PipelineRunStatus} />
          {pipeline.dn_content_pillars?.name && (
            <Badge variant="outline">{pipeline.dn_content_pillars.name}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Created {new Date(pipeline.created_at).toLocaleDateString()} &middot; {pipeline.trigger_type}
          {pipeline.notes && ` • ${pipeline.notes.slice(0, 100)}${pipeline.notes.length > 100 ? '...' : ''}`}
        </p>
      </div>

      {/* Stage progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            {STAGES.map((stage, i) => {
              const done = i < currentStage
              const current = i === currentStage
              const isCancelled = pipeline.status === 'cancelled'
              return (
                <div key={stage} className="flex items-center gap-2 shrink-0">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                      isCancelled ? 'bg-destructive/20 text-destructive' :
                      done ? 'bg-primary text-primary-foreground' :
                      current ? 'bg-primary text-primary-foreground ring-2 ring-primary/30' :
                      'bg-muted text-muted-foreground'
                    }`}
                  >
                    {done ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs ${current ? 'font-medium' : 'text-muted-foreground'}`}>
                    {stage.replace('_', ' ')}
                  </span>
                  {i < STAGES.length - 1 && <span className="text-muted-foreground">→</span>}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Council section */}
      {councilSession && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Council Decision</CardTitle>
              <Link
                href={`/dashboard/council/${councilSession.id}`}
                className="text-sm text-primary underline"
              >
                View full debate →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Session type: {councilSession.session_type}
            </p>
            {councilSession.decision && (
              <p className="text-sm whitespace-pre-wrap">{councilSession.decision.slice(0, 400)}{councilSession.decision.length > 400 ? '...' : ''}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Research section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Clark&apos;s Research {reports.length > 0 && `(${reports.length} reports)`}
            </CardTitle>
            {research && (
              <Link
                href={`/dashboard/research/${id}`}
                className="text-sm text-primary underline"
              >
                Full review →
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!research ? (
            <p className="text-sm text-muted-foreground">
              {currentStage < stageIndex('researching')
                ? 'Waiting for research to start. Run: npm run clark'
                : currentStage === stageIndex('researching')
                  ? 'Clark is researching...'
                  : 'No research data yet.'}
            </p>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {sources.length} sources · {reports.length} ranked reports · Status: {research.status}
              </p>
              {reports.map((report: any) => (
                <div key={report.id} className="rounded-md border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">#{report.rank}</Badge>
                    <h4 className="font-medium text-sm">{report.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.summary?.slice(0, 200)}{report.summary?.length > 200 ? '...' : ''}</p>
                  {report.recommendation && (
                    <p className="text-sm mt-2"><strong>Recommendation:</strong> {report.recommendation.slice(0, 150)}{report.recommendation.length > 150 ? '...' : ''}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Drafts section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Kelly&apos;s Drafts {drafts && drafts.length > 0 && `(v${latestDraft?.version})`}
            </CardTitle>
            {latestDraft && (
              <Link
                href={`/dashboard/drafts/${id}`}
                className="text-sm text-primary underline"
              >
                Full review →
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!latestDraft ? (
            <p className="text-sm text-muted-foreground">
              {currentStage < stageIndex('drafting')
                ? 'Waiting for research approval before Kelly can draft.'
                : currentStage === stageIndex('drafting')
                  ? 'Kelly is drafting...'
                  : 'No drafts yet.'}
            </p>
          ) : (
            <div className="space-y-4">
              <ScoreDisplay
                authenticity={latestDraft.authenticity_score}
                voice={latestDraft.voice_score}
                overall={latestDraft.overall_score}
              />
              <Separator />
              <div className="space-y-2">
                {(latestDraft.tweets as string[]).slice(0, 3).map((tweet: string, i: number) => (
                  <div key={i} className="rounded-md border p-3 text-sm">
                    <Badge variant="outline" className="text-xs mb-1">
                      {i + 1}/{(latestDraft.tweets as string[]).length}
                    </Badge>
                    <p className="whitespace-pre-wrap">{tweet.slice(0, 200)}{tweet.length > 200 ? '...' : ''}</p>
                  </div>
                ))}
                {(latestDraft.tweets as string[]).length > 3 && (
                  <p className="text-xs text-muted-foreground">
                    + {(latestDraft.tweets as string[]).length - 3} more tweets
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Posted thread */}
      {postedThread && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Posted to X</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Posted {new Date(postedThread.posted_at).toLocaleDateString()}
              {postedThread.x_post_id && (
                <>
                  {' '}·{' '}
                  <a
                    href={`https://x.com/i/status/${postedThread.x_post_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    View on X →
                  </a>
                </>
              )}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Activity feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed pipelineRunId={id} initialEntries={activityEntries ?? []} />
        </CardContent>
      </Card>
    </div>
  )
}
