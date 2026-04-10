import { createServiceClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PipelineStatusBadge } from '@/components/dashboard/pipeline-status-badge'
import { ScoreDisplay } from '@/components/dashboard/score-display'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { DraftApprovalActions } from './approval-actions'
import type { PipelineRunStatus } from '@/lib/supabase/types'

export default async function DraftReviewPage({
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

  const { data: drafts } = await sb
    .from('dn_thread_drafts')
    .select('*, dn_thread_revisions(*)')
    .eq('pipeline_run_id', id)
    .order('version', { ascending: false })
    .limit(1)

  const { data: activityEntries } = await sb
    .from('dn_agent_activity')
    .select('*')
    .eq('pipeline_run_id', id)
    .order('created_at', { ascending: true })

  const draft = drafts?.[0]
  const revisions = (draft?.dn_thread_revisions ?? []).sort(
    (a: any, b: any) => a.new_version - b.new_version,
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
          Draft by Kelly &middot; Version {draft?.version ?? 0}
        </p>
      </div>

      {draft ? (
        <>
          {/* Thread Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thread Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(draft.tweets as string[]).map((tweet: string, i: number) => (
                <div key={i} className="rounded-md border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {i + 1}/{(draft.tweets as string[]).length}
                    </Badge>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{tweet}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Authenticity Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreDisplay
                authenticity={draft.authenticity_score}
                voice={draft.voice_score}
                overall={draft.overall_score}
              />
            </CardContent>
          </Card>

          {/* Audit Notes */}
          {draft.audit_notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Audit Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{draft.audit_notes}</p>
              </CardContent>
            </Card>
          )}

          {/* AI Patterns Flagged */}
          {draft.ai_patterns_flagged && (draft.ai_patterns_flagged as string[]).length > 0 && (
            <Alert>
              <AlertTitle>AI Patterns Caught & Fixed</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                  {(draft.ai_patterns_flagged as string[]).map((pattern: string, i: number) => (
                    <li key={i}>{pattern}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Revision History */}
          {revisions.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-3">Revision History</h3>
                <div className="space-y-2">
                  {revisions.map((rev: any) => (
                    <div key={rev.id} className="rounded-md border p-3 text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">
                          v{rev.previous_version} → v{rev.new_version}
                        </span>
                        <Badge variant={rev.score_delta > 0 ? 'default' : 'destructive'}>
                          {rev.score_delta > 0 ? '+' : ''}{rev.score_delta}
                        </Badge>
                      </div>
                      {rev.reason && (
                        <p className="text-muted-foreground">{rev.reason}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kelly's Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityFeed
                pipelineRunId={id}
                initialEntries={activityEntries ?? []}
              />
            </CardContent>
          </Card>

          {pipeline.status === 'draft_ready' && (
            <>
              <Separator />
              <DraftApprovalActions pipelineRunId={id} />
            </>
          )}
        </>
      ) : (
        <p className="text-muted-foreground">No draft yet.</p>
      )}
    </div>
  )
}
