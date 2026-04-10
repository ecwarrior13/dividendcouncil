'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { submitAgentFeedback } from '../../actions'

interface AgentForRating {
  id: string
  name: string
}

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-lg ${star <= value ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export function AgentRatings({
  sessionId,
  agents,
  existingRatings,
}: {
  sessionId: string
  agents: AgentForRating[]
  existingRatings?: Record<string, { rating: number; notes: string | null }>
}) {
  const [ratings, setRatings] = useState<Record<string, { rating: number; notes: string }>>(
    () => {
      const initial: Record<string, { rating: number; notes: string }> = {}
      for (const agent of agents) {
        const existing = existingRatings?.[agent.id]
        initial[agent.id] = {
          rating: existing?.rating ?? 3,
          notes: existing?.notes ?? '',
        }
      }
      return initial
    },
  )
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(!!existingRatings && Object.keys(existingRatings).length > 0)

  const handleSubmit = () => {
    const feedbackArray = agents.map((a) => ({
      agentId: a.id,
      rating: ratings[a.id].rating,
      notes: ratings[a.id].notes || undefined,
    }))

    startTransition(async () => {
      await submitAgentFeedback(sessionId, feedbackArray)
      setSubmitted(true)
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {submitted ? 'Agent Ratings (Submitted)' : 'Rate Each Agent'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-start gap-4 rounded-md border p-3">
            <span className="font-medium w-32 shrink-0 pt-0.5">{agent.name}</span>
            <div className="flex-1 space-y-2">
              <StarRating
                value={ratings[agent.id].rating}
                onChange={(v) =>
                  setRatings((prev) => ({
                    ...prev,
                    [agent.id]: { ...prev[agent.id], rating: v },
                  }))
                }
              />
              <Input
                placeholder="Optional feedback note..."
                value={ratings[agent.id].notes}
                onChange={(e) =>
                  setRatings((prev) => ({
                    ...prev,
                    [agent.id]: { ...prev[agent.id], notes: e.target.value },
                  }))
                }
                className="text-sm"
              />
            </div>
          </div>
        ))}
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Saving...' : submitted ? 'Update Ratings' : 'Submit Ratings'}
        </Button>
      </CardContent>
    </Card>
  )
}
