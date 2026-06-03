'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { markSeededAction } from './actions'

export function SendToCouncilButton({
  proposalId,
  topic,
  status,
}: {
  proposalId: string
  topic: string
  status: string
}) {
  const [isPending, startTransition] = useTransition()
  const [justSent, setJustSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const command = `npm run council -- "${topic.replace(/"/g, '\\"')}"`

  // If it was already seeded (from a previous session), show the command too
  // so the user can still grab it
  const showCommand = justSent || status === 'seeded'

  const handleSend = () => {
    startTransition(async () => {
      await markSeededAction(proposalId)
      setJustSent(true)
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (status !== 'queued' && status !== 'seeded') {
    return null
  }

  if (showCommand) {
    return (
      <div className="flex items-center gap-2">
        <code className="text-xs bg-muted px-2 py-1 rounded max-w-xs truncate" title={command}>
          {command}
        </code>
        <Button size="sm" variant="outline" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    )
  }

  return (
    <Button size="sm" variant="outline" disabled={isPending} onClick={handleSend}>
      {isPending ? '...' : 'Send to Council'}
    </Button>
  )
}
