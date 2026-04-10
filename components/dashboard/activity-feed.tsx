'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

interface ActivityEntry {
  id: string
  pipeline_run_id: string | null
  agent_name: string
  activity_type: string
  message: string
  metadata: Record<string, unknown> | null
  created_at: string
}

const activityIcons: Record<string, string> = {
  started: '▶',
  searching: '🔍',
  found: '📄',
  evaluating: '⚖',
  writing: '✏',
  scoring: '📊',
  revising: '🔄',
  completed: '✓',
  error: '✗',
  info: '→',
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function ActivityFeed({
  pipelineRunId,
  initialEntries = [],
}: {
  pipelineRunId?: string
  initialEntries?: ActivityEntry[]
}) {
  const [entries, setEntries] = useState<ActivityEntry[]>(initialEntries)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return

    const sb = createClient(url, key)

    let channel = sb
      .channel('agent-activity')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'dn_agent_activity',
          ...(pipelineRunId ? { filter: `pipeline_run_id=eq.${pipelineRunId}` } : {}),
        },
        (payload) => {
          const newEntry = payload.new as ActivityEntry
          setEntries((prev) => [...prev, newEntry])
        },
      )
      .subscribe()

    return () => {
      sb.removeChannel(channel)
    }
  }, [pipelineRunId])

  if (entries.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-4">
        No activity yet. Waiting for agent updates...
      </div>
    )
  }

  return (
    <div className="space-y-1.5 max-h-96 overflow-y-auto">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex items-start gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-muted/50"
        >
          <span className="shrink-0 w-4 text-center" title={entry.activity_type}>
            {activityIcons[entry.activity_type] ?? '·'}
          </span>
          <span className="font-medium shrink-0 w-12 text-muted-foreground">
            {entry.agent_name}
          </span>
          <span className="flex-1">{entry.message}</span>
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {formatTime(entry.created_at)}
          </span>
        </div>
      ))}
    </div>
  )
}
