'use client'

import { approveDraft, rejectDraft } from '../../actions'
import { ApproveRejectActions } from '@/components/dashboard/approve-reject-actions'
import { useRouter } from 'next/navigation'

export function DraftApprovalActions({ pipelineRunId }: { pipelineRunId: string }) {
  const router = useRouter()

  return (
    <ApproveRejectActions
      approveLabel="Approve Thread"
      rejectLabel="Reject"
      onApprove={async () => {
        await approveDraft(pipelineRunId)
        router.push('/dashboard')
      }}
      onReject={async (notes) => {
        await rejectDraft(pipelineRunId, notes)
        router.push('/dashboard')
      }}
    />
  )
}
