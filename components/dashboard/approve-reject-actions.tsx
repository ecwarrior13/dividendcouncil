'use client'

import { useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'

export function ApproveRejectActions({
  onApprove,
  onReject,
  approveLabel = 'Approve',
  rejectLabel = 'Reject',
}: {
  onApprove: () => Promise<void>
  onReject: (notes: string) => Promise<void>
  approveLabel?: string
  rejectLabel?: string
}) {
  const [isPending, startTransition] = useTransition()
  const [showRejectInput, setShowRejectInput] = useState(false)
  const [rejectNotes, setRejectNotes] = useState('')

  return (
    <div className="flex items-center gap-3">
      <Button
        disabled={isPending}
        onClick={() => startTransition(() => onApprove())}
      >
        {isPending ? 'Processing...' : approveLabel}
      </Button>

      {showRejectInput ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={rejectNotes}
            onChange={(e) => setRejectNotes(e.target.value)}
            placeholder="Reason for rejection..."
            className="rounded-md border px-3 py-1.5 text-sm"
          />
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => startTransition(() => onReject(rejectNotes))}
          >
            Confirm
          </Button>
          <Button variant="outline" onClick={() => setShowRejectInput(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          disabled={isPending}
          onClick={() => setShowRejectInput(true)}
        >
          {rejectLabel}
        </Button>
      )}
    </div>
  )
}
