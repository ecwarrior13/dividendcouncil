'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { updateAgentAction } from '../actions'

interface Agent {
  id: string
  name: string
  role: string
  system_prompt: string
  backstory: string | null
  personality: string | null
  voice_profile: { tone: string; style: string; avoid: string[]; prefer: string[] } | null
  is_active: boolean
  influence_weight: number
  debate_role: string | null
}

export function AgentEditForm({ agent }: { agent: Agent }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await updateAgentAction(agent.id, formData)
      router.push('/dashboard/agents')
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* System Prompt */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            name="system_prompt"
            defaultValue={agent.system_prompt}
            rows={10}
            className="font-mono text-sm"
          />
        </CardContent>
      </Card>

      {/* Personality & Backstory */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personality</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="personality">Personality</Label>
            <Textarea
              id="personality"
              name="personality"
              defaultValue={agent.personality ?? ''}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="backstory">Backstory</Label>
            <Textarea
              id="backstory"
              name="backstory"
              defaultValue={agent.backstory ?? ''}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Voice Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Voice Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="vp_tone">Tone</Label>
            <Input id="vp_tone" name="vp_tone" defaultValue={agent.voice_profile?.tone ?? ''} />
          </div>
          <div>
            <Label htmlFor="vp_style">Style</Label>
            <Input id="vp_style" name="vp_style" defaultValue={agent.voice_profile?.style ?? ''} />
          </div>
          <div>
            <Label htmlFor="vp_avoid">Avoid (comma-separated)</Label>
            <Input
              id="vp_avoid"
              name="vp_avoid"
              defaultValue={agent.voice_profile?.avoid?.join(', ') ?? ''}
            />
          </div>
          <div>
            <Label htmlFor="vp_prefer">Prefer (comma-separated)</Label>
            <Input
              id="vp_prefer"
              name="vp_prefer"
              defaultValue={agent.voice_profile?.prefer?.join(', ') ?? ''}
            />
          </div>
        </CardContent>
      </Card>

      {/* Influence Weight + Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Council Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Influence Weight</Label>
            <p className="text-xs text-muted-foreground mb-3">
              Controls how much this agent dominates debate. Low = brief contributions. High = full voice.
            </p>
            <InfluenceSlider defaultValue={Math.round(agent.influence_weight * 100)} />
          </div>

          <Separator />

          <div>
            <Label htmlFor="debate_role">Debate Role</Label>
            <select
              id="debate_role"
              name="debate_role"
              defaultValue={agent.debate_role ?? ''}
              className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">None (not in council)</option>
              <option value="framer">Framer (sets landscape)</option>
              <option value="proposer">Proposer (proposes topics)</option>
              <option value="challenger">Challenger (challenges proposals)</option>
              <option value="decider">Decider (makes final call)</option>
            </select>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Switch id="is_active" name="is_active" defaultChecked={agent.is_active} />
            <Label htmlFor="is_active">Active</Label>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}

function InfluenceSlider({ defaultValue }: { defaultValue: number }) {
  return (
    <div className="flex items-center gap-4">
      <input type="hidden" name="influence_weight" id="influence_weight_input" defaultValue={defaultValue} />
      <Slider
        defaultValue={[defaultValue]}
        min={0}
        max={100}
        step={5}
        className="flex-1"
        onValueChange={(val: number[]) => {
          const input = document.getElementById('influence_weight_input') as HTMLInputElement
          if (input) input.value = String(val[0])
          const label = document.getElementById('influence_weight_label')
          if (label) label.textContent = `${val[0]}%`
        }}
      />
      <span id="influence_weight_label" className="text-sm font-medium w-10 text-right">
        {defaultValue}%
      </span>
    </div>
  )
}
