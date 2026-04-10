@AGENTS.md

## Project: aisemble — AI Agent Content Engine

Dividend investing content pipeline powered by AI agents with human-in-the-loop approval.

### Architecture
- **Atlas Library** (`lib/supabase/atlas/`): Typed Supabase CRUD functions. All agents access data through here.
- **MCP Server** (`mcp-server/`): 19 tools wrapping Atlas + Alpha Vantage + Brave Search + X API. Agents connect via stdio.
- **Clark** (`agents/clark/`): Research agent (Claude Code CLI). Picks up topics, researches, writes reports.
- **Kelly** (`agents/kelly/`): Social media agent (Claude Code CLI). Reads research, drafts X threads with authenticity scoring.
- **Dashboard** (`app/dashboard/`): Next.js approval UI for reviewing research and drafts.

### Key Rules
- All database access uses service role key — internal agents only, never exposed to client.
- Pipeline status transitions are validated (see `VALID_STATUS_TRANSITIONS` in `lib/supabase/types.ts`).
- Kelly's authenticity audit rules are in `lib/skills/social-media-authenticity.md`.
- Content domain: dividend investing ONLY.

### Commands
- `npm run dev` — Start dashboard
- `npm run mcp:build` — Rebuild MCP server after changes
- `npm run clark` — Run Clark on next pending research task
- `npm run kelly` — Run Kelly on next pending draft task
