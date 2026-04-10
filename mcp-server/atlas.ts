// Self-contained Supabase client + types for the MCP server.
// Inlined to avoid CJS/ESM mismatch with the root project's lib/ files.

import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient<any> | null = null

export function getClient(): SupabaseClient<any> {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }

  client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return client
}

// --- Types (inlined from lib/supabase/types.ts) ---

export type PipelineRunStatus =
  | 'topic_selection'
  | 'topic_approved'
  | 'researching'
  | 'report_ready'
  | 'report_approved'
  | 'drafting'
  | 'draft_ready'
  | 'draft_approved'
  | 'posted'
  | 'cancelled'

export const VALID_STATUS_TRANSITIONS: Record<PipelineRunStatus, PipelineRunStatus[]> = {
  topic_selection: ['topic_approved', 'cancelled'],
  topic_approved: ['researching', 'cancelled'],
  researching: ['report_ready', 'cancelled'],
  report_ready: ['report_approved', 'cancelled'],
  report_approved: ['drafting', 'cancelled'],
  drafting: ['draft_ready', 'cancelled'],
  draft_ready: ['draft_approved', 'cancelled'],
  draft_approved: ['posted', 'cancelled'],
  posted: [],
  cancelled: [],
}
