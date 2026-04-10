import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Load .env.local from project root (2 levels up from dist/index.js)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..', '..')
dotenv.config({ path: path.join(projectRoot, '.env.local') })
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { registerPipelineTools } from './tools/pipeline.js'
import { registerResearchTools } from './tools/research.js'
import { registerDraftTools } from './tools/drafts.js'
import { registerAgentTools } from './tools/agents.js'
import { registerAlphaVantageTools } from './tools/alpha-vantage.js'
import { registerWebSearchTools } from './tools/web-search.js'
import { registerTwitterTools } from './tools/twitter.js'
import { registerActivityTools } from './tools/activity.js'

const server = new McpServer({
  name: 'aisemble',
  version: '0.1.0',
})

registerPipelineTools(server)
registerResearchTools(server)
registerDraftTools(server)
registerAgentTools(server)
registerAlphaVantageTools(server)
registerWebSearchTools(server)
registerTwitterTools(server)
registerActivityTools(server)

const transport = new StdioServerTransport()
await server.connect(transport)
