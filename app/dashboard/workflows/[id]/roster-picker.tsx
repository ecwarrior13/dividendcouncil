'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { updateRosterAction } from '../actions'

interface Agent {
  id: string
  name: string
  debate_role: string | null
}

const roleBadgeColors: Record<string, string> = {
  framer: 'bg-blue-100 text-blue-800',
  proposer: 'bg-green-100 text-green-800',
  challenger: 'bg-red-100 text-red-800',
  decider: 'bg-purple-100 text-purple-800',
}

export function RosterPicker({
  workflowId,
  allAgents,
  currentRoster,
}: {
  workflowId: string
  allAgents: Agent[]
  currentRoster: string[]
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set(currentRoster))
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const toggle = (agentId: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(agentId)) next.delete(agentId)
      else next.add(agentId)
      return next
    })
  }

  const handleSave = () => {
    startTransition(async () => {
      await updateRosterAction(workflowId, [...selected])
      router.refresh()
    })
  }

  const handleClearAll = () => setSelected(new Set())

  const hasChanges =
    selected.size !== currentRoster.length ||
    [...selected].some((id) => !currentRoster.includes(id))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Agent Roster</CardTitle>
          <span className="text-xs text-muted-foreground">
            {selected.size === 0
              ? 'All council agents participate'
              : `${selected.size} agent${selected.size === 1 ? '' : 's'} selected`}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Select which agents participate in this workflow. Leave empty for all active council agents.
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {allAgents.map((agent) => (
          <label
            key={agent.id}
            className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
              selected.has(agent.id) ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.has(agent.id)}
              onChange={() => toggle(agent.id)}
              className="rounded"
            />
            <span className="font-medium text-sm">{agent.name}</span>
            {agent.debate_role && (
              <Badge className={roleBadgeColors[agent.debate_role] ?? ''} variant="outline">
                {agent.debate_role}
              </Badge>
            )}
          </label>
        ))}

        <div className="flex items-center gap-2 pt-2">
          <Button onClick={handleSave} disabled={isPending || !hasChanges} size="sm">
            {isPending ? 'Saving...' : 'Save Roster'}
          </Button>
          {selected.size > 0 && (
            <Button onClick={handleClearAll} variant="outline" size="sm">
              Clear (use all agents)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
