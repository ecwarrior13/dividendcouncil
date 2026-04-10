import { z } from 'zod'
import crypto from 'node:crypto'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getClient } from '../atlas.js'

// OAuth 1.0a signature for X API v2
function generateOAuthHeader(
  method: string,
  url: string,
  params: Record<string, string>,
): string {
  const apiKey = process.env.X_API_KEY!
  const apiSecret = process.env.X_API_SECRET!
  const accessToken = process.env.X_ACCESS_TOKEN!
  const accessSecret = process.env.X_ACCESS_SECRET!

  const oauthParams: Record<string, string> = {
    oauth_consumer_key: apiKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: '1.0',
  }

  const allParams = { ...params, ...oauthParams }
  const paramString = Object.keys(allParams)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(allParams[k])}`)
    .join('&')

  const baseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(paramString),
  ].join('&')

  const signingKey = `${encodeURIComponent(apiSecret)}&${encodeURIComponent(accessSecret)}`
  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64')

  oauthParams['oauth_signature'] = signature

  const header = Object.keys(oauthParams)
    .sort()
    .map((k) => `${encodeURIComponent(k)}="${encodeURIComponent(oauthParams[k])}"`)
    .join(', ')

  return `OAuth ${header}`
}

async function postTweet(text: string, replyToId?: string): Promise<{ id: string; text: string }> {
  const url = 'https://api.twitter.com/2/tweets'
  const body: Record<string, unknown> = { text }
  if (replyToId) {
    body.reply = { in_reply_to_tweet_id: replyToId }
  }

  const authHeader = generateOAuthHeader('POST', url, {})

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errBody = await response.text()
    throw new Error(`X API error ${response.status}: ${errBody}`)
  }

  const result = (await response.json()) as { data: { id: string; text: string } }
  return result.data
}

export function registerTwitterTools(server: McpServer) {
  server.tool(
    'post_thread',
    'Post an approved thread draft to X. Only works if draft status is approved.',
    { draft_id: z.string().uuid() },
    async ({ draft_id }) => {
      const requiredKeys = ['X_API_KEY', 'X_API_SECRET', 'X_ACCESS_TOKEN', 'X_ACCESS_SECRET']
      const missing = requiredKeys.filter((k) => !process.env[k])
      if (missing.length > 0) {
        return { content: [{ type: 'text' as const, text: `Error: Missing env vars: ${missing.join(', ')}` }] }
      }

      const sb = getClient()

      // Get the draft and verify it's approved
      const { data: draft, error: fetchErr } = await sb
        .from('dn_thread_drafts')
        .select('*')
        .eq('id', draft_id)
        .single()
      if (fetchErr) return { content: [{ type: 'text' as const, text: `Error: ${fetchErr.message}` }] }
      if (draft.status !== 'approved') {
        return { content: [{ type: 'text' as const, text: `Draft status is "${draft.status}", must be "approved" to post.` }] }
      }

      const tweets = draft.tweets as string[]
      if (!tweets || tweets.length === 0) {
        return { content: [{ type: 'text' as const, text: 'Draft has no tweets.' }] }
      }

      try {
        // Post thread: first tweet, then replies
        const postedIds: string[] = []
        let replyToId: string | undefined

        for (const tweetText of tweets) {
          const posted = await postTweet(tweetText, replyToId)
          postedIds.push(posted.id)
          replyToId = posted.id
        }

        // Record in posted_threads
        const { data: postedThread } = await sb
          .from('dn_posted_threads')
          .insert({
            draft_id,
            pipeline_run_id: draft.pipeline_run_id,
            x_post_id: postedIds[0],
            content_snapshot: tweets,
          })
          .select()
          .single()

        // Update draft and pipeline status
        await sb.from('dn_thread_drafts').update({ status: 'posted' }).eq('id', draft_id)
        await sb.from('dn_pipeline_runs').update({
          status: 'posted',
          completed_at: new Date().toISOString(),
        }).eq('id', draft.pipeline_run_id)

        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify({
              success: true,
              thread_url: `https://x.com/i/status/${postedIds[0]}`,
              tweet_ids: postedIds,
              posted_thread_id: postedThread?.id,
            }, null, 2),
          }],
        }
      } catch (err) {
        return { content: [{ type: 'text' as const, text: `Error posting to X: ${(err as Error).message}` }] }
      }
    },
  )
}
