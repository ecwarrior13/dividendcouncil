import { createServiceClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { WorkflowStepActions } from './step-actions'
import { RosterPicker } from './roster-picker'
import { addStepAction } from '../actions'

const roleBadgeColors: Record<string, string> = {
  framer: 'bg-blue-100 text-blue-800',
  proposer: 'bg-green-100 text-green-800',
  challenger: 'bg-red-100 text-red-800',
  decider: 'bg-purple-100 text-purple-800',
}

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sb = createServiceClient()

  const { data: workflow } = await sb
    .from('dn_council_workflows')
    .select('*')
    .eq('id', id)
    .single()

  const { data: steps } = await sb
    .from('dn_council_workflow_steps')
    .select('*')
    .eq('workflow_id', id)
    .order('round_number', { ascending: true })
    .order('step_order', { ascending: true })

  // Load council agents + roster for this workflow
  const { data: councilAgents } = await sb
    .from('dn_agents')
    .select('id, name, debate_role')
    .eq('is_active', true)
    .not('debate_role', 'is', null)
    .order('name')

  const { data: rosterRows } = await sb
    .from('dn_workflow_agents')
    .select('agent_id')
    .eq('workflow_id', id)

  const currentRoster = (rosterRows ?? []).map((r) => r.agent_id)

  if (!workflow) {
    return <div className="text-muted-foreground">Workflow not found.</div>
  }

  const allSteps = steps ?? []

  // Group steps by round
  const rounds = new Map<number, typeof allSteps>()
  for (const step of allSteps) {
    if (!rounds.has(step.round_number)) rounds.set(step.round_number, [])
    rounds.get(step.round_number)!.push(step)
  }
  const sortedRounds = [...rounds.entries()].sort(([a], [b]) => a - b)
  const nextRoundNumber = sortedRounds.length > 0 ? sortedRounds[sortedRounds.length - 1][0] + 1 : 1

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-2xl font-semibold">{workflow.name}</h2>
          {workflow.is_default && <Badge>Default</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">
          {workflow.description ?? 'No description'} &middot; {allSteps.length} steps across {sortedRounds.length} rounds
        </p>
      </div>

      <div className="flex items-center gap-3">
        {!workflow.is_default && (
          <WorkflowStepActions workflowId={id} action="set-default" />
        )}
        <WorkflowStepActions
          workflowId={id}
          action="toggle-active"
          isActive={workflow.is_active}
        />
      </div>

      {/* Agent Roster */}
      <RosterPicker
        workflowId={id}
        allAgents={(councilAgents ?? []) as Array<{ id: string; name: string; debate_role: string | null }>}
        currentRoster={currentRoster}
      />

      {/* Rounds */}
      {sortedRounds.map(([roundNum, roundSteps]) => (
        <Card key={roundNum}>
          <CardHeader>
            <CardTitle className="text-lg">
              Round {roundNum}: {roundSteps[0].round_label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {roundSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-start justify-between rounded-md border p-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={roleBadgeColors[step.debate_role] ?? ''} variant="outline">
                      {step.debate_role}
                    </Badge>
                    <Badge variant="secondary">{step.action_type}</Badge>
                    <span className="text-xs text-muted-foreground">Step {step.step_order}</span>
                  </div>
                  {step.prompt_hint && (
                    <p className="text-sm text-muted-foreground">{step.prompt_hint}</p>
                  )}
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    {step.include_vector && <Badge variant="outline">vector</Badge>}
                    {step.include_brand && <Badge variant="outline">brand</Badge>}
                    {step.include_pillars && <Badge variant="outline">pillars</Badge>}
                    {step.include_weights && <Badge variant="outline">weights</Badge>}
                  </div>
                </div>
                <WorkflowStepActions workflowId={id} stepId={step.id} action="delete" />
              </div>
            ))}

            {/* Add Step to this Round */}
            <Separator />
            <details className="text-sm">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                Add step to Round {roundNum}
              </summary>
              <form action={addStepAction} className="mt-3 space-y-3">
                <input type="hidden" name="workflow_id" value={id} />
                <input type="hidden" name="round_number" value={roundNum} />
                <input type="hidden" name="round_label" value={roundSteps[0].round_label} />
                <input
                  type="hidden"
                  name="step_order"
                  value={Math.max(...roundSteps.map((s) => s.step_order)) + 1}
                />
                <div className="flex gap-2">
                  <select name="debate_role" required className="rounded-md border px-2 py-1 text-sm">
                    <option value="framer">Framer</option>
                    <option value="proposer">Proposer</option>
                    <option value="challenger">Challenger</option>
                    <option value="decider">Decider</option>
                  </select>
                  <select name="action_type" required className="rounded-md border px-2 py-1 text-sm">
                    <option value="frame">Frame</option>
                    <option value="propose">Propose</option>
                    <option value="challenge">Challenge</option>
                    <option value="defend">Defend</option>
                    <option value="synthesize">Synthesize</option>
                    <option value="decide">Decide</option>
                  </select>
                </div>
                <input
                  name="prompt_hint"
                  type="text"
                  placeholder="Prompt hint (optional)..."
                  className="w-full rounded-md border px-2 py-1 text-sm"
                />
                <div className="flex gap-4 text-xs">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" name="include_vector" /> Vector
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" name="include_brand" /> Brand
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" name="include_pillars" /> Pillars
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" name="include_weights" /> Weights
                  </label>
                </div>
                <Button type="submit" size="sm">Add Step</Button>
              </form>
            </details>
          </CardContent>
        </Card>
      ))}

      {/* Add New Round */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Round {nextRoundNumber}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addStepAction} className="space-y-3">
            <input type="hidden" name="workflow_id" value={id} />
            <input type="hidden" name="round_number" value={nextRoundNumber} />
            <input type="hidden" name="step_order" value="1" />
            <div className="flex gap-2">
              <input
                name="round_label"
                type="text"
                required
                placeholder="Round label (e.g., 'Audience Perspective')..."
                className="flex-1 rounded-md border px-2 py-1 text-sm"
              />
              <select name="debate_role" required className="rounded-md border px-2 py-1 text-sm">
                <option value="framer">Framer</option>
                <option value="proposer">Proposer</option>
                <option value="challenger">Challenger</option>
                <option value="decider">Decider</option>
              </select>
              <select name="action_type" required className="rounded-md border px-2 py-1 text-sm">
                <option value="frame">Frame</option>
                <option value="propose">Propose</option>
                <option value="challenge">Challenge</option>
                <option value="defend">Defend</option>
                <option value="synthesize">Synthesize</option>
                <option value="decide">Decide</option>
              </select>
            </div>
            <input
              name="prompt_hint"
              type="text"
              placeholder="Prompt hint (optional)..."
              className="w-full rounded-md border px-2 py-1 text-sm"
            />
            <div className="flex gap-4 text-xs">
              <label className="flex items-center gap-1">
                <input type="checkbox" name="include_vector" /> Vector
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" name="include_brand" /> Brand
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" name="include_pillars" /> Pillars
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" name="include_weights" /> Weights
              </label>
            </div>
            <Button type="submit" size="sm">Add Round {nextRoundNumber}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
