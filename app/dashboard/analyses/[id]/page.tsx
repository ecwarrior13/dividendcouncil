import { createServiceClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

function scoreColor(score: number): string {
  if (score >= 75) return 'text-green-600'
  if (score >= 55) return 'text-yellow-600'
  return 'text-red-600'
}

const profileVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'premium fit': 'default',
  'defensive compounder': 'default',
  'safety focus': 'default',
  'growth focus': 'secondary',
  'moderate fit': 'secondary',
  'speculative grower': 'outline',
  'caution': 'outline',
  'weak fit': 'destructive',
}

const fitColor: Record<string, string> = {
  high: 'text-green-600',
  moderate: 'text-yellow-600',
  low: 'text-red-600',
}

function BucketScores({ buckets, labels }: { buckets: Record<string, number> | null; labels: Record<string, string> }) {
  if (!buckets) return null
  return (
    <div className="space-y-3">
      {Object.entries(labels).map(([key, label]) => {
        const val = buckets[key] ?? 0
        return (
          <div key={key}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">{label}</span>
              <span className={`font-medium ${scoreColor(val)}`}>{val}</span>
            </div>
            <Progress value={val} className="h-2" />
          </div>
        )
      })}
    </div>
  )
}

function FlagsList({ hardFlags, softFlags }: { hardFlags: string[] | null; softFlags: string[] | null }) {
  if (!hardFlags?.length && !softFlags?.length) return null
  return (
    <div className="space-y-2 mt-3">
      {hardFlags?.map((f, i) => (
        <div key={i} className="text-sm rounded-md border border-red-200 bg-red-50 px-3 py-1.5 dark:border-red-800 dark:bg-red-950">
          {f}
        </div>
      ))}
      {softFlags?.map((f, i) => (
        <div key={i} className="text-sm rounded-md border border-yellow-200 bg-yellow-50 px-3 py-1.5 dark:border-yellow-800 dark:bg-yellow-950">
          {f}
        </div>
      ))}
    </div>
  )
}

export default async function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sb = createServiceClient()

  const { data: analysis } = await sb
    .from('dn_stock_analyses')
    .select('*')
    .eq('id', id)
    .single()

  if (!analysis) {
    return <div className="text-muted-foreground">Analysis not found.</div>
  }

  const transcript = (analysis.debate_transcript ?? []) as Array<{ agent: string; phase: string; content: string }>

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-3xl font-bold">{analysis.ticker}</h2>
          {analysis.sector_profile && (
            <Badge variant="outline">{analysis.sector_profile}</Badge>
          )}
          {analysis.stock_profile && (
            <Badge variant={profileVariant[analysis.stock_profile] ?? 'outline'} className="text-sm px-3 py-1">
              {analysis.stock_profile.toUpperCase()}
            </Badge>
          )}
          {analysis.safety_fit && (
            <span className={`text-sm font-medium ${fitColor[analysis.safety_fit] ?? ''}`}>
              Safety: {analysis.safety_fit}
            </span>
          )}
          {analysis.growth_fit && (
            <span className={`text-sm font-medium ${fitColor[analysis.growth_fit] ?? ''}`}>
              Growth: {analysis.growth_fit}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Analyzed {new Date(analysis.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Joint Assessment */}
      {analysis.joint_rationale && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Joint Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{analysis.joint_rationale}</p>
          </CardContent>
        </Card>
      )}

      {/* Two-column: Aiden vs Lexa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aiden */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Aiden (Safety)</CardTitle>
              <span className={`text-2xl font-bold ${analysis.aiden_score ? scoreColor(analysis.aiden_score) : ''}`}>
                {analysis.aiden_score ?? '—'}
              </span>
            </div>
            {analysis.aiden_confidence != null && (
              <p className="text-xs text-muted-foreground">Confidence: {analysis.aiden_confidence}%</p>
            )}
          </CardHeader>
          <CardContent>
            <BucketScores
              buckets={analysis.aiden_buckets as Record<string, number> | null}
              labels={{
                dividend_coverage: 'Dividend Coverage (35%)',
                financial_strength: 'Financial Strength (25%)',
                business_quality: 'Business Quality (25%)',
                reliability_signals: 'Reliability Signals (15%)',
              }}
            />
            <FlagsList
              hardFlags={analysis.aiden_hard_flags as string[] | null}
              softFlags={analysis.aiden_soft_flags as string[] | null}
            />
            {analysis.aiden_rationale && (
              <p className="text-sm mt-4 text-muted-foreground">{analysis.aiden_rationale}</p>
            )}
          </CardContent>
        </Card>

        {/* Lexa */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Lexa (Growth)</CardTitle>
              <span className={`text-2xl font-bold ${analysis.lexa_score ? scoreColor(analysis.lexa_score) : ''}`}>
                {analysis.lexa_score ?? '—'}
              </span>
            </div>
            {analysis.lexa_confidence != null && (
              <p className="text-xs text-muted-foreground">Confidence: {analysis.lexa_confidence}%</p>
            )}
          </CardHeader>
          <CardContent>
            <BucketScores
              buckets={analysis.lexa_buckets as Record<string, number> | null}
              labels={{
                dividend_growth_power: 'Dividend Growth Power (30%)',
                growth_support: 'Growth Support (25%)',
                opportunity_valuation: 'Opportunity / Valuation (25%)',
                safety_floor: 'Safety Floor (20%)',
              }}
            />
            <FlagsList
              hardFlags={analysis.lexa_hard_flags as string[] | null}
              softFlags={analysis.lexa_soft_flags as string[] | null}
            />
            {analysis.lexa_rationale && (
              <p className="text-sm mt-4 text-muted-foreground">{analysis.lexa_rationale}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Debate Transcript */}
      {transcript.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-4">Debate Transcript</h3>
            <div className="space-y-4">
              {transcript
                .filter((t) => t.phase === 'respond')
                .map((entry, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <Badge variant="outline">{entry.agent} — Response</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
