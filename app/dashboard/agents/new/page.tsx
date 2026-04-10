'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createAgentAction } from '../actions'

export default function NewAgentPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await createAgentAction(formData)
      router.push('/dashboard/agents')
    })
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">New Agent</h2>
      <form action={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="e.g. Chuck" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
                defaultValue="council"
              >
                <option value="council">Council</option>
                <option value="talent">Talent (podcast co-host)</option>
                <option value="editor">Editor</option>
                <option value="researcher">Researcher</option>
                <option value="social_media">Social Media</option>
              </select>
            </div>
            <div>
              <Label htmlFor="debate_role">Debate Role</Label>
              <select
                id="debate_role"
                name="debate_role"
                className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
              >
                <option value="">None</option>
                <option value="framer">Framer</option>
                <option value="proposer">Proposer</option>
                <option value="challenger">Challenger</option>
                <option value="decider">Decider</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea name="system_prompt" required rows={8} className="font-mono text-sm" placeholder="Define this agent's core instructions..." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="personality">Personality</Label>
              <Textarea id="personality" name="personality" rows={2} />
            </div>
            <div>
              <Label htmlFor="backstory">Backstory</Label>
              <Textarea id="backstory" name="backstory" rows={2} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Voice Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="vp_tone">Tone</Label>
              <Input id="vp_tone" name="vp_tone" />
            </div>
            <div>
              <Label htmlFor="vp_style">Style</Label>
              <Input id="vp_style" name="vp_style" />
            </div>
            <div>
              <Label htmlFor="vp_avoid">Avoid (comma-separated)</Label>
              <Input id="vp_avoid" name="vp_avoid" />
            </div>
            <div>
              <Label htmlFor="vp_prefer">Prefer (comma-separated)</Label>
              <Input id="vp_prefer" name="vp_prefer" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Influence Weight (%)</Label>
              <Input name="influence_weight" type="number" min="0" max="100" defaultValue="100" />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="is_active" name="is_active" defaultChecked />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Agent'}
        </Button>
      </form>
    </div>
  )
}
