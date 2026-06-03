'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/client'

// ============================================================
// SEC Form 13F — fetch, parse, store, compare.
//
// SEC EDGAR is the source of truth: the information-table XML
// of each 13F-HR filing. FMP only enriches holdings with a
// ticker symbol (cusip -> symbol) when available.
// ============================================================

const SEC_BASE = 'https://www.sec.gov'
const SEC_DATA_BASE = 'https://data.sec.gov'
const FMP_BASE = 'https://financialmodelingprep.com/stable'

// SEC requires a descriptive User-Agent with contact info and
// rate-limits to ~10 req/s. Set SEC_USER_AGENT in your env to a
// real value, e.g. "aisemble research you@example.com".
const SEC_USER_AGENT =
  process.env.SEC_USER_AGENT ?? 'aisemble-dashboard contact@example.com'

const FETCH_FILING_LIMIT = 8 // how many recent 13F-HR filings to pull

// ---------------------------------------------------------------
// Low-level fetch helpers
// ---------------------------------------------------------------

async function secFetch(url: string): Promise<Response> {
  return fetch(url, {
    headers: {
      'User-Agent': SEC_USER_AGENT,
      Accept: 'application/json, text/xml, */*',
    },
    cache: 'no-store',
  })
}

async function callFMP(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<unknown> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY
  if (!apiKey) throw new Error('FINANCIAL_MODELING_PREP_API_KEY not set')

  const url = new URL(`${FMP_BASE}/${endpoint}`)
  url.searchParams.set('apikey', apiKey)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) throw new Error(`FMP error ${res.status} on /${endpoint}`)
  return res.json()
}

// ---------------------------------------------------------------
// XML helpers — the 13F information table is regular enough to
// parse without a dependency. Tags may carry a namespace prefix.
// ---------------------------------------------------------------

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, '&')
}

/** Extract the inner text of the first <name>...</name> tag in a block. */
function tagIn(block: string, name: string): string | null {
  const re = new RegExp(
    `<(?:[\\w.-]+:)?${name}\\b[^>]*>([\\s\\S]*?)</(?:[\\w.-]+:)?${name}>`,
    'i',
  )
  const m = block.match(re)
  return m ? decodeEntities(m[1].trim()) : null
}

function numOrNull(s: string | null): number | null {
  if (s == null || s === '') return null
  const n = Number(s.replace(/[, ]/g, ''))
  return Number.isFinite(n) ? n : null
}

export interface ParsedHolding {
  nameOfIssuer: string | null
  titleOfClass: string | null
  cusip: string
  figi: string | null
  value: number | null
  shares: number | null
  shareType: string | null
  putCall: string | null
  investmentDiscretion: string | null
  otherManagers: string | null
  votingSole: number | null
  votingShared: number | null
  votingNone: number | null
}

/**
 * Parse the <infoTable> rows of a 13F information table.
 * `valueInThousands` scales pre-2023 filings (which reported
 * holding value in $thousands) up to whole dollars.
 */
function parseInfoTable(xml: string, valueInThousands: boolean): ParsedHolding[] {
  const blocks =
    xml.match(
      /<(?:[\w.-]+:)?infoTable\b[^>]*>[\s\S]*?<\/(?:[\w.-]+:)?infoTable>/gi,
    ) ?? []

  const holdings: ParsedHolding[] = []
  for (const block of blocks) {
    const cusip = tagIn(block, 'cusip')
    if (!cusip) continue

    const shrsBlock = tagIn(block, 'shrsOrPrnAmt') ?? block
    const votingBlock = tagIn(block, 'votingAuthority') ?? block

    let value = numOrNull(tagIn(block, 'value'))
    if (value != null && valueInThousands) value = value * 1000

    holdings.push({
      nameOfIssuer: tagIn(block, 'nameOfIssuer'),
      titleOfClass: tagIn(block, 'titleOfClass'),
      cusip: cusip.toUpperCase(),
      figi: tagIn(block, 'figi'),
      value,
      shares: numOrNull(tagIn(shrsBlock, 'sshPrnamt')),
      shareType: tagIn(shrsBlock, 'sshPrnamtType'),
      putCall: tagIn(block, 'putCall'),
      investmentDiscretion: tagIn(block, 'investmentDiscretion'),
      otherManagers: tagIn(block, 'otherManager'),
      votingSole: numOrNull(tagIn(votingBlock, 'Sole')),
      votingShared: numOrNull(tagIn(votingBlock, 'Shared')),
      votingNone: numOrNull(tagIn(votingBlock, 'None')),
    })
  }
  return holdings
}

// ---------------------------------------------------------------
// Misc helpers
// ---------------------------------------------------------------

function normalizeCik(raw: string): string {
  return raw.replace(/\D/g, '').padStart(10, '0')
}

/** "2024-12-31" -> "2024-Q4" */
function quarterLabel(reportDate: string): string {
  const [y, m] = reportDate.split('-')
  const month = Number(m)
  const q = month <= 3 ? 1 : month <= 6 ? 2 : month <= 9 ? 3 : 4
  return `${y}-Q${q}`
}

// ---------------------------------------------------------------
// fetch13fAction — main entry point
// ---------------------------------------------------------------

export interface Fetch13fResult {
  success: boolean
  cik: string
  managerName?: string
  filingsStored?: number
  message?: string
  diagnostics?: Array<{ source: string; status: string; detail?: string }>
}

export async function fetch13fAction(formData: FormData): Promise<Fetch13fResult> {
  const rawCik = (formData.get('cik') as string | null)?.trim() ?? ''
  if (!rawCik) {
    return { success: false, cik: '', message: 'CIK is required' }
  }
  const cik = normalizeCik(rawCik)
  const diagnostics: Array<{ source: string; status: string; detail?: string }> = []

  if (!/^[0-9]{10}$/.test(cik) || cik === '0000000000') {
    return { success: false, cik, message: `Invalid CIK: "${rawCik}"` }
  }

  try {
    // ---- SEC submissions: manager identity + filing history ----
    const subRes = await secFetch(`${SEC_DATA_BASE}/submissions/CIK${cik}.json`)
    if (!subRes.ok) {
      return {
        success: false,
        cik,
        message:
          subRes.status === 404
            ? `No SEC filer found for CIK ${cik}`
            : `SEC submissions error ${subRes.status}`,
        diagnostics: [{ source: 'SEC submissions', status: `http_${subRes.status}` }],
      }
    }
    const sub = await subRes.json()
    const managerName: string = sub.name ?? `CIK ${cik}`
    diagnostics.push({ source: 'SEC submissions', status: 'ok', detail: managerName })

    const recent = sub.filings?.recent ?? {}
    const forms: string[] = recent.form ?? []
    const accessions: string[] = recent.accessionNumber ?? []
    const filingDates: string[] = recent.filingDate ?? []
    const reportDates: string[] = recent.reportDate ?? []

    type FilingRef = {
      accession: string
      form: string
      filingDate: string
      reportDate: string
    }
    const all13f: FilingRef[] = []
    for (let i = 0; i < forms.length; i++) {
      if (forms[i] === '13F-HR' || forms[i] === '13F-HR/A') {
        if (!reportDates[i]) continue
        all13f.push({
          accession: accessions[i],
          form: forms[i],
          filingDate: filingDates[i] ?? '',
          reportDate: reportDates[i],
        })
      }
    }

    if (all13f.length === 0) {
      return {
        success: false,
        cik,
        managerName,
        message: `${managerName} has no 13F-HR filings in EDGAR's recent index`,
        diagnostics,
      }
    }

    // Keep the latest-filed record per reporting period (an
    // amendment supersedes the original), then take the newest N.
    all13f.sort((a, b) => (a.filingDate < b.filingDate ? 1 : -1))
    const byPeriod = new Map<string, FilingRef>()
    for (const f of all13f) {
      if (!byPeriod.has(f.reportDate)) byPeriod.set(f.reportDate, f)
    }
    const selected = Array.from(byPeriod.values())
      .sort((a, b) => (a.reportDate < b.reportDate ? 1 : -1))
      .slice(0, FETCH_FILING_LIMIT)

    diagnostics.push({
      source: 'SEC 13F index',
      status: 'ok',
      detail: `${all13f.length} filings found, fetching ${selected.length}`,
    })

    const sb = createServiceClient()

    // ---- Upsert manager ----
    const addr = sub.addresses?.business ?? {}
    const { data: manager, error: mgrErr } = await sb
      .from('sec_13f_managers')
      .upsert(
        {
          cik,
          manager_name: managerName,
          sec_entity_type: sub.entityType ?? null,
          state_of_incorporation: sub.stateOfIncorporation ?? null,
          business_city: addr.city ?? null,
          business_state: addr.stateOrCountry ?? null,
          last_fetched_at: new Date().toISOString(),
        },
        { onConflict: 'cik' },
      )
      .select()
      .single()
    if (mgrErr) throw new Error(`sec_13f_managers upsert: ${mgrErr.message}`)

    // ---- Each filing: parse XML, store filing + holdings ----
    let stored = 0
    for (const ref of selected) {
      const accNoDash = ref.accession.replace(/-/g, '')
      const folder = `${SEC_BASE}/Archives/edgar/data/${Number(cik)}/${accNoDash}/`

      // Locate the information-table XML via the filing folder index.
      let infoUrl: string | null = null
      try {
        const idxRes = await secFetch(`${folder}index.json`)
        if (idxRes.ok) {
          const idx = await idxRes.json()
          const items: Array<{ name: string }> = idx.directory?.item ?? []
          const xmls = items
            .map((it) => it.name)
            .filter(
              (n) => /\.xml$/i.test(n) && n.toLowerCase() !== 'primary_doc.xml',
            )
          // Probe candidates for an <infoTable> element.
          for (const name of xmls) {
            const probe = await secFetch(`${folder}${name}`)
            if (!probe.ok) continue
            const text = await probe.text()
            if (/<(?:[\w.-]+:)?infoTable\b/i.test(text)) {
              infoUrl = `${folder}${name}`
              // parse inline to avoid a second download
              const valueInThousands = (ref.filingDate || ref.reportDate) < '2023-01-01'
              const holdings = parseInfoTable(text, valueInThousands)
              await storeFiling(sb, manager.id, ref, infoUrl, holdings)
              stored++
              break
            }
          }
        }
      } catch (err) {
        diagnostics.push({
          source: `filing ${ref.reportDate}`,
          status: 'error',
          detail: (err as Error).message,
        })
        continue
      }

      if (!infoUrl) {
        diagnostics.push({
          source: `filing ${ref.reportDate}`,
          status: 'no_info_table',
          detail: 'no information-table XML located in filing folder',
        })
      }
    }

    diagnostics.push({
      source: 'SEC holdings',
      status: stored > 0 ? 'ok' : 'empty',
      detail: `${stored} filing(s) stored`,
    })

    // ---- FMP enrichment: cusip -> ticker for the stored filings ----
    try {
      const enriched = await enrichWithFmp(sb, cik, manager.id)
      diagnostics.push({
        source: 'FMP institutional-ownership',
        status: enriched >= 0 ? 'ok' : 'skipped',
        detail: enriched >= 0 ? `${enriched} holdings matched to a ticker` : undefined,
      })
    } catch (err) {
      diagnostics.push({
        source: 'FMP institutional-ownership',
        status: 'error',
        detail: (err as Error).message,
      })
    }

    revalidatePath('/dashboard/13f')
    return {
      success: stored > 0,
      cik,
      managerName,
      filingsStored: stored,
      message:
        stored > 0
          ? undefined
          : 'No information tables could be parsed for this filer',
      diagnostics,
    }
  } catch (err) {
    return { success: false, cik, message: (err as Error).message, diagnostics }
  }
}

// ---------------------------------------------------------------
// Store one filing and its holdings (delete-then-insert so a
// re-fetch is idempotent even though CUSIPs repeat within a filing).
// ---------------------------------------------------------------

type SupabaseClient = ReturnType<typeof createServiceClient>

async function storeFiling(
  sb: SupabaseClient,
  managerId: string,
  ref: { accession: string; form: string; filingDate: string; reportDate: string },
  infoUrl: string,
  holdings: ParsedHolding[],
): Promise<void> {
  const distinctCusips = new Set(holdings.map((h) => h.cusip)).size
  const totalValue = holdings.reduce((sum, h) => sum + (h.value ?? 0), 0)

  const { data: filing, error: fErr } = await sb
    .from('sec_13f_filings')
    .upsert(
      {
        manager_id: managerId,
        accession_number: ref.accession,
        form_type: ref.form,
        is_amendment: ref.form.endsWith('/A'),
        report_period: ref.reportDate,
        report_quarter: quarterLabel(ref.reportDate),
        filing_date: ref.filingDate || null,
        total_value: totalValue,
        total_holdings: holdings.length,
        total_issuers: distinctCusips,
        info_table_url: infoUrl,
      },
      { onConflict: 'manager_id,accession_number' },
    )
    .select()
    .single()
  if (fErr) throw new Error(`sec_13f_filings upsert: ${fErr.message}`)

  // Replace holdings for this filing.
  await sb.from('sec_13f_holdings').delete().eq('filing_id', filing.id)

  if (holdings.length > 0) {
    const rows = holdings.map((h) => ({
      filing_id: filing.id,
      manager_id: managerId,
      name_of_issuer: h.nameOfIssuer,
      title_of_class: h.titleOfClass,
      cusip: h.cusip,
      figi: h.figi,
      value: h.value,
      shares: h.shares,
      share_type: h.shareType,
      put_call: h.putCall,
      is_option: h.putCall != null && h.putCall !== '',
      investment_discretion: h.investmentDiscretion,
      other_managers: h.otherManagers,
      voting_sole: h.votingSole,
      voting_shared: h.votingShared,
      voting_none: h.votingNone,
      ticker: null as string | null,
    }))
    // Insert in chunks — large managers report thousands of lines.
    for (let i = 0; i < rows.length; i += 500) {
      const { error } = await sb
        .from('sec_13f_holdings')
        .insert(rows.slice(i, i + 500))
      if (error) throw new Error(`sec_13f_holdings insert: ${error.message}`)
    }
  }
}

// ---------------------------------------------------------------
// FMP enrichment — build a cusip -> ticker map from FMP's
// institutional-ownership extract and apply it to stored holdings.
// Returns the number of holdings updated, or -1 if FMP is skipped.
// ---------------------------------------------------------------

async function enrichWithFmp(
  sb: SupabaseClient,
  cik: string,
  managerId: string,
): Promise<number> {
  if (!process.env.FINANCIAL_MODELING_PREP_API_KEY) return -1

  // Filings we just stored, to know which year/quarter to pull.
  const { data: filings } = await sb
    .from('sec_13f_filings')
    .select('id, report_period')
    .eq('manager_id', managerId)
  if (!filings || filings.length === 0) return 0

  const cusipToTicker = new Map<string, string>()
  for (const f of filings) {
    const period = f.report_period as string
    const year = period.slice(0, 4)
    const month = Number(period.slice(5, 7))
    const quarter = String(month <= 3 ? 1 : month <= 6 ? 2 : month <= 9 ? 3 : 4)
    try {
      const data = await callFMP('institutional-ownership/extract', {
        cik,
        year,
        quarter,
      })
      if (Array.isArray(data)) {
        for (const row of data as Array<Record<string, unknown>>) {
          const c = (row.cusip as string | undefined)?.toUpperCase()
          const symbol = row.symbol as string | undefined
          if (c && symbol && !cusipToTicker.has(c)) cusipToTicker.set(c, symbol)
        }
      }
    } catch {
      // best-effort per quarter
    }
  }

  if (cusipToTicker.size === 0) return 0

  let updated = 0
  for (const [cusip, ticker] of cusipToTicker) {
    const { count } = await sb
      .from('sec_13f_holdings')
      .update({ ticker }, { count: 'exact' })
      .eq('manager_id', managerId)
      .eq('cusip', cusip)
    updated += count ?? 0
  }
  return updated
}

// ---------------------------------------------------------------
// compareFilingsAction — diff up to 4 filings of one manager.
// Aggregates holdings by CUSIP; classifies new/exit/increase/
// decrease between the earliest and latest selected filing.
// ---------------------------------------------------------------

export type ChangeClass =
  | 'new'
  | 'exited'
  | 'increased'
  | 'decreased'
  | 'unchanged'

export interface ComparisonCell {
  shares: number
  value: number
}

export interface ComparisonRow {
  cusip: string
  name: string
  ticker: string | null
  cells: Array<ComparisonCell | null> // one per filing, chronological
  changeClass: ChangeClass
  sharesDeltaPct: number | null // earliest -> latest
}

export interface ComparisonFiling {
  id: string
  reportQuarter: string
  reportPeriod: string
  totalValue: number | null
}

export interface ComparisonResult {
  success: boolean
  message?: string
  filings: ComparisonFiling[]
  stockRows: ComparisonRow[]
  optionRows: ComparisonRow[]
  summary: Record<ChangeClass, number>
}

function classify(
  first: ComparisonCell | null,
  last: ComparisonCell | null,
): { cls: ChangeClass; deltaPct: number | null } {
  if (!first && last) return { cls: 'new', deltaPct: null }
  if (first && !last) return { cls: 'exited', deltaPct: null }
  if (first && last) {
    const deltaPct =
      first.shares > 0 ? ((last.shares - first.shares) / first.shares) * 100 : null
    if (last.shares > first.shares) return { cls: 'increased', deltaPct }
    if (last.shares < first.shares) return { cls: 'decreased', deltaPct }
    return { cls: 'unchanged', deltaPct: 0 }
  }
  return { cls: 'unchanged', deltaPct: null }
}

export async function compareFilingsAction(
  filingIds: string[],
): Promise<ComparisonResult> {
  const empty: ComparisonResult = {
    success: false,
    filings: [],
    stockRows: [],
    optionRows: [],
    summary: { new: 0, exited: 0, increased: 0, decreased: 0, unchanged: 0 },
  }

  const ids = Array.from(new Set(filingIds)).slice(0, 4)
  if (ids.length < 2) {
    return { ...empty, message: 'Select at least 2 filings to compare' }
  }

  const sb = createServiceClient()

  const { data: filingRows, error: fErr } = await sb
    .from('sec_13f_filings')
    .select('id, report_quarter, report_period, total_value')
    .in('id', ids)
  if (fErr) return { ...empty, message: fErr.message }
  if (!filingRows || filingRows.length < 2) {
    return { ...empty, message: 'Filings not found' }
  }

  // Chronological order (oldest -> newest).
  const filings: ComparisonFiling[] = filingRows
    .map((f) => ({
      id: f.id as string,
      reportQuarter: f.report_quarter as string,
      reportPeriod: f.report_period as string,
      totalValue: f.total_value as number | null,
    }))
    .sort((a, b) => (a.reportPeriod < b.reportPeriod ? -1 : 1))

  const { data: holdings, error: hErr } = await sb
    .from('sec_13f_holdings')
    .select(
      'filing_id, cusip, name_of_issuer, ticker, shares, value, share_type, put_call, is_option',
    )
    .in('filing_id', ids)
  if (hErr) return { ...empty, message: hErr.message }

  const filingIndex = new Map(filings.map((f, i) => [f.id, i]))
  const n = filings.length

  // Aggregate by CUSIP per filing. Stock and option positions are
  // tracked separately; option rows are keyed by cusip + put/call.
  type Agg = {
    cusip: string
    name: string
    ticker: string | null
    cells: Array<ComparisonCell | null>
    putCall?: string
  }
  const stocks = new Map<string, Agg>()
  const options = new Map<string, Agg>()

  for (const h of holdings ?? []) {
    const fi = filingIndex.get(h.filing_id as string)
    if (fi == null) continue
    const isOption = Boolean(h.is_option) || (h.put_call != null && h.put_call !== '')
    const shares = Number(h.shares ?? 0)
    const value = Number(h.value ?? 0)

    if (isOption) {
      const key = `${h.cusip}|${h.put_call ?? ''}`
      let agg = options.get(key)
      if (!agg) {
        agg = {
          cusip: h.cusip as string,
          name: `${h.name_of_issuer ?? h.cusip} (${h.put_call ?? 'OPT'})`,
          ticker: (h.ticker as string | null) ?? null,
          cells: Array(n).fill(null),
        }
        options.set(key, agg)
      }
      const cell = agg.cells[fi] ?? { shares: 0, value: 0 }
      cell.shares += shares
      cell.value += value
      agg.cells[fi] = cell
      if (!agg.ticker && h.ticker) agg.ticker = h.ticker as string
    } else {
      // Common-stock comparison: SH share type (or unspecified).
      const st = (h.share_type as string | null) ?? ''
      if (st && st.toUpperCase() !== 'SH') continue
      const key = h.cusip as string
      let agg = stocks.get(key)
      if (!agg) {
        agg = {
          cusip: key,
          name: (h.name_of_issuer as string | null) ?? key,
          ticker: (h.ticker as string | null) ?? null,
          cells: Array(n).fill(null),
        }
        stocks.set(key, agg)
      }
      const cell = agg.cells[fi] ?? { shares: 0, value: 0 }
      cell.shares += shares
      cell.value += value
      agg.cells[fi] = cell
      if (!agg.ticker && h.ticker) agg.ticker = h.ticker as string
    }
  }

  const summary: Record<ChangeClass, number> = {
    new: 0,
    exited: 0,
    increased: 0,
    decreased: 0,
    unchanged: 0,
  }

  function finalize(map: Map<string, Agg>, countSummary: boolean): ComparisonRow[] {
    const rows: ComparisonRow[] = []
    for (const agg of map.values()) {
      const first = agg.cells[0]
      const last = agg.cells[n - 1]
      const { cls, deltaPct } = classify(first, last)
      if (countSummary) summary[cls]++
      rows.push({
        cusip: agg.cusip,
        name: agg.name,
        ticker: agg.ticker,
        cells: agg.cells,
        changeClass: cls,
        sharesDeltaPct: deltaPct,
      })
    }
    // Largest last-known position first.
    const lastKnownValue = (cells: Array<ComparisonCell | null>): number => {
      for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i]) return cells[i]!.value
      }
      return 0
    }
    rows.sort((a, b) => lastKnownValue(b.cells) - lastKnownValue(a.cells))
    return rows
  }

  const stockRows = finalize(stocks, true)
  const optionRows = finalize(options, false)

  return {
    success: true,
    filings,
    stockRows,
    optionRows,
    summary,
  }
}
