'use client'

import { Badge } from '@/components/ui/badge'
import type { PipelineRunStatus } from '@/lib/supabase/types'

const statusConfig: Record<PipelineRunStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  topic_selection: { label: 'Topic Selection', variant: 'outline' },
  topic_approved: { label: 'Topic Approved', variant: 'secondary' },
  researching: { label: 'Researching', variant: 'default' },
  report_ready: { label: 'Report Ready', variant: 'secondary' },
  report_approved: { label: 'Report Approved', variant: 'secondary' },
  drafting: { label: 'Drafting', variant: 'default' },
  draft_ready: { label: 'Draft Ready', variant: 'secondary' },
  draft_approved: { label: 'Draft Approved', variant: 'secondary' },
  posted: { label: 'Posted', variant: 'default' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
}

export function PipelineStatusBadge({ status }: { status: PipelineRunStatus }) {
  const config = statusConfig[status] ?? { label: status, variant: 'outline' as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
