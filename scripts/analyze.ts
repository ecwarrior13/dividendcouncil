import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { runStockDebate } from '../lib/debate/run'

const args = process.argv.slice(2)
let ticker: string | undefined
let pipelineRunId: string | undefined

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--pipeline-run' && args[i + 1]) {
    pipelineRunId = args[++i]
  } else if (!ticker) {
    ticker = args[i]
  }
}

if (!ticker) {
  console.error('Usage: npm run analyze -- <TICKER> [--pipeline-run <id>]')
  console.error('Example: npm run analyze -- JNJ')
  process.exit(1)
}

console.log(`\nStarting stock debate for ${ticker.toUpperCase()}...`)

runStockDebate(ticker, { pipelineRunId })
  .then((result) => {
    console.log(`\n${'='.repeat(50)}`)
    console.log(`RESULT: ${result.ticker}`)
    console.log(`${'='.repeat(50)}`)
    console.log(`Profile:     ${result.profile.toUpperCase()}`)
    console.log(`Safety:      ${result.safetyFit} (Aiden: ${result.aidenScore}/100)`)
    console.log(`Growth:      ${result.growthFit} (Lexa: ${result.lexaScore}/100)`)
    console.log(`\n${result.rationale}`)
    console.log(`\nAnalysis ID: ${result.analysisId}`)
    console.log('View at /dashboard/analyses')
  })
  .catch((err) => {
    console.error('\nStock debate failed:', err)
    process.exit(1)
  })
