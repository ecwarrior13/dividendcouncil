'use client'

import { Progress } from '@/components/ui/progress'

function scoreColor(score: number): string {
  if (score >= 70) return 'text-green-600'
  if (score >= 40) return 'text-yellow-600'
  return 'text-red-600'
}

export function ScoreDisplay({
  authenticity,
  voice,
  overall,
}: {
  authenticity: number | null
  voice: number | null
  overall: number | null
}) {
  const scores = [
    { label: 'Authenticity', value: authenticity },
    { label: 'Voice', value: voice },
    { label: 'Overall', value: overall },
  ]

  return (
    <div className="space-y-3">
      {scores.map(({ label, value }) => (
        <div key={label}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">{label}</span>
            <span className={`font-medium ${value != null ? scoreColor(value) : ''}`}>
              {value ?? '—'}
            </span>
          </div>
          <Progress value={value ?? 0} className="h-2" />
        </div>
      ))}
    </div>
  )
}
