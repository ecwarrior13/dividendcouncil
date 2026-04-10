'use client'

import { Badge } from '@/components/ui/badge'
import type { CouncilSessionStatus } from '@/lib/supabase/types'

const statusConfig: Record<CouncilSessionStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  active: { label: 'In Progress', variant: 'default' },
  complete: { label: 'Complete', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
}

export function CouncilStatusBadge({ status }: { status: CouncilSessionStatus }) {
  const config = statusConfig[status] ?? { label: status, variant: 'outline' as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
