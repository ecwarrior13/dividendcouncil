-- ============================================================
-- SEC FORM 13F SCHEMA
-- Institutional manager quarterly holdings from SEC EDGAR.
--
-- Source of truth: the SEC information-table XML for each
-- 13F-HR filing. FMP is used only to enrich holdings with a
-- current ticker symbol (cusip -> symbol). Increase / decrease /
-- new / exit comparisons are derived from these rows, not stored.
--
-- Naming uses the sec_13f_ prefix; FMP-fed tables keep fmp_.
-- ============================================================

create extension if not exists pgcrypto;

-- =========================================================
-- 1) MANAGER MASTER
-- One institutional investment manager, keyed by SEC CIK.
-- =========================================================
create table if not exists public.sec_13f_managers (
  id uuid primary key default gen_random_uuid(),

  cik text not null,                        -- zero-padded 10-digit CIK
  manager_name text not null,
  sec_entity_type text,                     -- from EDGAR submissions json
  state_of_incorporation text,
  business_city text,
  business_state text,

  last_fetched_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint sec_13f_managers_cik_unique unique (cik),
  constraint sec_13f_managers_cik_format check (cik ~ '^[0-9]{10}$')
);

create index if not exists sec_13f_managers_cik_idx
  on public.sec_13f_managers (cik);
create index if not exists sec_13f_managers_name_idx
  on public.sec_13f_managers (manager_name);


-- =========================================================
-- 2) FILINGS
-- One 13F-HR (or amendment) filing == one reporting quarter.
-- =========================================================
create table if not exists public.sec_13f_filings (
  id uuid primary key default gen_random_uuid(),
  manager_id uuid not null references public.sec_13f_managers(id) on delete cascade,

  accession_number text not null,           -- e.g. 0001067983-25-000012
  form_type text not null,                  -- 13F-HR or 13F-HR/A
  is_amendment boolean not null default false,

  report_period date not null,              -- quarter end (period of report)
  report_quarter text not null,             -- e.g. 2024-Q4 (derived, for UI)
  filing_date date,

  total_value numeric(22,2),                -- sum of holding values, whole USD
  total_holdings integer,                   -- count of position lines
  total_issuers integer,                    -- distinct CUSIPs

  info_table_url text,                      -- the parsed XML document url

  created_at timestamptz not null default now(),

  constraint sec_13f_filings_accession_unique unique (manager_id, accession_number)
);

create index if not exists sec_13f_filings_manager_idx
  on public.sec_13f_filings (manager_id);
create index if not exists sec_13f_filings_manager_period_idx
  on public.sec_13f_filings (manager_id, report_period desc);


-- =========================================================
-- 3) HOLDINGS
-- One row per <infoTable> entry in the SEC information table.
-- A filing may carry several rows for the same CUSIP (different
-- discretion / other managers / option type); rows are NOT
-- de-duplicated here -- aggregation happens at read time.
-- On re-fetch, all rows for a filing are deleted then reinserted.
-- =========================================================
create table if not exists public.sec_13f_holdings (
  id bigserial primary key,
  filing_id uuid not null references public.sec_13f_filings(id) on delete cascade,
  manager_id uuid not null references public.sec_13f_managers(id) on delete cascade,

  name_of_issuer text,
  title_of_class text,
  cusip text not null,
  figi text,

  value numeric(22,2),                      -- normalized to whole USD
  shares numeric(20,2),                     -- sshPrnamt
  share_type text,                          -- SH or PRN (sshPrnamtType)
  put_call text,                            -- Put / Call / null
  is_option boolean not null default false, -- derived: put_call is not null

  investment_discretion text,
  other_managers text,
  voting_sole bigint,
  voting_shared bigint,
  voting_none bigint,

  ticker text,                              -- FMP enrichment, best-effort

  created_at timestamptz not null default now()
);

create index if not exists sec_13f_holdings_filing_idx
  on public.sec_13f_holdings (filing_id);
create index if not exists sec_13f_holdings_filing_cusip_idx
  on public.sec_13f_holdings (filing_id, cusip);
create index if not exists sec_13f_holdings_manager_cusip_idx
  on public.sec_13f_holdings (manager_id, cusip);


-- =========================================================
-- 4) UPDATED_AT TRIGGER
-- Reuses public.set_updated_at() defined in v001-migration.sql.
-- =========================================================
drop trigger if exists set_sec_13f_managers_updated_at on public.sec_13f_managers;

create trigger set_sec_13f_managers_updated_at
  before update on public.sec_13f_managers
  for each row
  execute function public.set_updated_at();


-- =========================================================
-- 5) ROW LEVEL SECURITY
-- Consistency with the rest of the database. The service role
-- bypasses RLS for internal access.
-- =========================================================
alter table public.sec_13f_managers enable row level security;
alter table public.sec_13f_filings enable row level security;
alter table public.sec_13f_holdings enable row level security;
