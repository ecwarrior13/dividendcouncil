import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createWorkflowAction } from './actions'

export default async function WorkflowsPage() {
  const sb = createServiceClient()

  const { data: workflows } = await sb
    .from('dn_council_workflows')
    .select('*, dn_council_workflow_steps(id)')
    .order('is_active', { ascending: false })
    .order('name')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Workflows</h2>
          <p className="text-sm text-muted-foreground">
            Define the round and step structure for council debates
          </p>
        </div>
      </div>

      {/* New Workflow */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">New Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createWorkflowAction} className="flex items-end gap-3">
            <div>
              <input
                name="name"
                type="text"
                required
                placeholder="Workflow name..."
                className="rounded-md border px-3 py-1.5 text-sm w-48"
              />
            </div>
            <div className="flex-1">
              <input
                name="description"
                type="text"
                placeholder="Description (optional)..."
                className="w-full rounded-md border px-3 py-1.5 text-sm"
              />
            </div>
            <Button type="submit" size="sm">Create</Button>
          </form>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Steps</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(workflows ?? []).map((wf: any) => (
            <TableRow key={wf.id}>
              <TableCell className="font-medium">{wf.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{wf.session_type}</TableCell>
              <TableCell>{wf.dn_council_workflow_steps?.length ?? 0} steps</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {wf.is_default && <Badge>Default</Badge>}
                  {!wf.is_active && <Badge variant="destructive">Inactive</Badge>}
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/workflows/${wf.id}`} className="text-sm text-primary underline">
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {(!workflows || workflows.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No workflows yet. Run the v007 migration to seed the default.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
