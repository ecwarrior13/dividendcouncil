'use client'

import { approveResearch, rejectResearch } from '../../actions'
import { ApproveRejectActions } from '@/components/dashboard/approve-reject-actions'
import { useRouter } from 'next/navigation'

export function ResearchApprovalActions({ pipelineRunId }: { pipelineRunId: string }) {
  const router = useRouter()

  return (
    <ApproveRejectActions
      approveLabel="Approve Research"
      rejectLabel="Reject"
      onApprove={async () => {
        await approveResearch(pipelineRunId)
        router.push('/dashboard')
      }}
      onReject={async (notes) => {
        await rejectResearch(pipelineRunId, notes)
        router.push('/dashboard')
      }}
    />
  )
}
