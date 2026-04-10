import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function AgentsPage() {
  const sb = createServiceClient()
  const { data: agents } = await sb
    .from('dn_agents')
    .select('*')
    .order('name')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Agents</h2>
          <p className="text-sm text-muted-foreground">
            Manage system prompts, influence weights, and debate roles
          </p>
        </div>
        <Link href="/dashboard/agents/new">
          <Button size="sm">New Agent</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Debate Role</TableHead>
            <TableHead>Influence</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(agents ?? []).map((agent) => (
            <TableRow key={agent.id}>
              <TableCell className="font-medium">{agent.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{agent.role}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {agent.debate_role ?? '—'}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 w-32">
                  <Progress value={(agent.influence_weight ?? 1) * 100} className="h-2" />
                  <span className="text-xs text-muted-foreground w-8">
                    {Math.round((agent.influence_weight ?? 1) * 100)}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={agent.is_active ? 'default' : 'destructive'}>
                  {agent.is_active ? 'Yes' : 'No'}
                </Badge>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/agents/${agent.id}`}
                  className="text-sm text-primary underline"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
