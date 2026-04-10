'use client'

import { approveCouncilTopic, rejectCouncilTopic } from '../../actions'
import { ApproveRejectActions } from '@/components/dashboard/approve-reject-actions'
import { useRouter } from 'next/navigation'

export function CouncilApprovalActions({ sessionId }: { sessionId: string }) {
  const router = useRouter()

  return (
    <ApproveRejectActions
      approveLabel="Approve Topic"
      rejectLabel="Reject"
      onApprove={async () => {
        await approveCouncilTopic(sessionId)
        router.push('/dashboard')
      }}
      onReject={async (notes) => {
        await rejectCouncilTopic(sessionId, notes)
        router.push('/dashboard/council')
      }}
    />
  )
}
