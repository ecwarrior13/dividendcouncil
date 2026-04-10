import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { runTopicSelection } from '../lib/council/orchestrate'

// Parse args: --workflow "name" and remaining args as seeded topics
const args = process.argv.slice(2)
let workflowId: string | undefined
const seededTopics: string[] = []

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--workflow' && args[i + 1]) {
    workflowId = args[++i]
  } else {
    seededTopics.push(args[i])
  }
}

console.log('Starting Council topic selection...')
if (workflowId) console.log(`Workflow: ${workflowId}`)
if (seededTopics.length) console.log(`Seeded topics: ${seededTopics.join(', ')}`)

runTopicSelection({
  seededTopics: seededTopics.length ? seededTopics : undefined,
  workflowId,
})
  .then((result) => {
    console.log(`\n✓ Council selected: ${result.topic}`)
    console.log(`  Session: ${result.sessionId}`)
    console.log(`  Decision: ${result.decision}`)
    console.log('\nReview and approve at /dashboard/council')
  })
  .catch((err) => {
    console.error('\nCouncil session failed:', err)
    process.exit(1)
  })
