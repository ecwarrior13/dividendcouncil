<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Content Engine Agents

| Agent | Type | Location | Role |
|---|---|---|---|
| Atlas | Library (not an agent) | `lib/supabase/atlas/` | Typed Supabase CRUD for all 13 tables |
| Clark | Claude Code CLI | `agents/clark/` | Research analyst — sources, credibility, top-3 reports |
| Kelly | Claude Code CLI | `agents/kelly/` | Social media — X threads, authenticity audit, scoring |
| Aiden | API route (future) | — | Safety-focused dividend podcast co-host |
| Lexa | API route (future) | — | Growth-focused dividend podcast co-host |
| Council | Future | — | Topic selection, quality review, debate |

## Pipeline Flow

1. Human creates topic → `topic_approved`
2. Clark researches → `report_ready`
3. Human approves → `report_approved`
4. Kelly drafts → `draft_ready`
5. Human approves → `draft_approved`
6. Manual post to X → `posted`

## MCP Server

Located at `mcp-server/`. Build with `npm run mcp:build`. 19 tools across 7 files.
Agents connect via `.mcp.json` in their directories.
