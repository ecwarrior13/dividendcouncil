'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteStepAction, setDefaultAction, toggleActiveAction } from '../actions'

export function WorkflowStepActions({
  workflowId,
  stepId,
  action,
  isActive,
}: {
  workflowId: string
  stepId?: string
  action: 'delete' | 'set-default' | 'toggle-active'
  isActive?: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if (action === 'delete' && stepId) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await deleteStepAction(stepId, workflowId)
            router.refresh()
          })
        }
      >
        {isPending ? '...' : 'Remove'}
      </Button>
    )
  }

  if (action === 'set-default') {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await setDefaultAction(workflowId)
            router.refresh()
          })
        }
      >
        {isPending ? '...' : 'Set as Default'}
      </Button>
    )
  }

  if (action === 'toggle-active') {
    return (
      <Button
        variant={isActive ? 'destructive' : 'default'}
        size="sm"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await toggleActiveAction(workflowId, !isActive)
            router.refresh()
          })
        }
      >
        {isPending ? '...' : isActive ? 'Deactivate' : 'Activate'}
      </Button>
    )
  }

  return null
}
