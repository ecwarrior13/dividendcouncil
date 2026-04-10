import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/client'
import { CouncilStatusBadge } from '@/components/dashboard/council-status-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { CouncilSessionStatus } from '@/lib/supabase/types'

export default async function CouncilPage() {
  const sb = createServiceClient()
  const { data: sessions } = await sb
    .from('dn_council_sessions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Council</h2>
          <p className="text-sm text-muted-foreground">
            Topic selection sessions — run <code className="text-xs bg-muted px-1 py-0.5 rounded">npm run council</code> to start a new debate
          </p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Topic</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(sessions ?? []).map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium max-w-xs truncate">
                {session.topic ?? 'Pending...'}
              </TableCell>
              <TableCell>
                <CouncilStatusBadge status={session.status as CouncilSessionStatus} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {session.session_type}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(session.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/council/${session.id}`}
                  className="text-sm text-primary underline"
                >
                  {session.status === 'complete' ? 'Review' : 'View'}
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {(!sessions || sessions.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No council sessions yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
