-- ============================================================
-- FMP ETF SCHEMA
-- ETF master + market/income/options/holdings/lifecycle data.
-- Fed primarily by Financial Modeling Prep API.
-- Naming follows the fmp_ prefix used by other FMP-fed tables.
-- ============================================================

create extension if not exists pgcrypto;

-- =========================================================
-- 1) ETF MASTER TABLE
-- Static identity + classification fields
-- =========================================================

create table if not exists public.fmp_etfs (
  id uuid primary key default gen_random_uuid(),

  symbol text not null,
  fund_name text not null,
  issuer text not null,

  cusip text,
  isin text,

  asset_class text not null,
  category text,
  strategy_type text,
  active_passive text,
  benchmark_index text,

  primary_exchange text,
  currency text not null default 'USD',
  domicile text,

  inception_date date,

  is_covered_call_etf boolean not null default false,
  is_options_based boolean not null default false,
  is_leveraged boolean not null default false,
  is_inverse boolean not null default false,

  status text not null default 'active',

  website_url text,
  fact_sheet_url text,
  prospectus_url text,

  data_source text not null default 'fmp',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint fmp_etfs_symbol_unique unique (symbol),

  constraint fmp_etfs_asset_class_check check (
    asset_class in (
      'equity',
      'fixed_income',
      'commodity',
      'multi_asset',
      'alternative',
      'currency',
      'volatility',
      'digital_assets',
      'other'
    )
  ),

  constraint fmp_etfs_active_passive_check check (
    active_passive is null or active_passive in ('active', 'passive')
  ),

  constraint fmp_etfs_currency_check check (
    currency ~ '^[A-Z]{3}$'
  ),

  constraint fmp_etfs_status_check check (
    status in ('active', 'liquidated', 'merged', 'closed')
  )
);

create index if not exists fmp_etfs_symbol_idx on public.fmp_etfs (symbol);
create index if not exists fmp_etfs_issuer_idx on public.fmp_etfs (issuer);
create index if not exists fmp_etfs_asset_class_idx on public.fmp_etfs (asset_class);
create index if not exists fmp_etfs_category_idx on public.fmp_etfs (category);
create index if not exists fmp_etfs_strategy_type_idx on public.fmp_etfs (strategy_type);
create index if not exists fmp_etfs_is_covered_call_idx on public.fmp_etfs (is_covered_call_etf);
create index if not exists fmp_etfs_is_options_based_idx on public.fmp_etfs (is_options_based);
create index if not exists fmp_etfs_is_leveraged_idx on public.fmp_etfs (is_leveraged);


-- =========================================================
-- 2) ETF MARKET SNAPSHOTS
-- Time-series market + screening metrics
-- =========================================================

create table if not exists public.fmp_etf_market_stats (
  id bigserial primary key,
  etf_id uuid not null references public.fmp_etfs(id) on delete cascade,
  as_of_date date not null,

  aum numeric(20,2),
  nav numeric(18,6),
  market_price numeric(18,6),
  premium_discount_pct numeric(10,4),

  expense_ratio_pct numeric(8,4),

  avg_daily_volume_30d bigint,
  bid_ask_spread_bps numeric(10,4),
  shares_outstanding bigint,

  total_return_1y_pct numeric(10,4),
  total_return_3y_ann_pct numeric(10,4),
  total_return_5y_ann_pct numeric(10,4),

  tracking_difference_1y_pct numeric(10,4),
  tracking_error_1y_pct numeric(10,4),

  nav_return_since_inception_pct numeric(10,4),

  sector_allocations jsonb,

  created_at timestamptz not null default now(),

  constraint fmp_etf_market_stats_unique unique (etf_id, as_of_date)
);

create index if not exists fmp_etf_market_stats_etf_id_idx
  on public.fmp_etf_market_stats (etf_id);

create index if not exists fmp_etf_market_stats_as_of_date_idx
  on public.fmp_etf_market_stats (as_of_date desc);

create index if not exists fmp_etf_market_stats_etf_date_idx
  on public.fmp_etf_market_stats (etf_id, as_of_date desc);


-- =========================================================
-- 3) ETF INCOME SNAPSHOTS
-- Yield/distribution data, separate from market stats
-- =========================================================

create table if not exists public.fmp_etf_income_stats (
  id bigserial primary key,
  etf_id uuid not null references public.fmp_etfs(id) on delete cascade,
  as_of_date date not null,

  distribution_frequency text,
  distribution_yield_ttm_pct numeric(10,4),
  dividend_yield_ttm_pct numeric(10,4),
  sec_yield_30d_pct numeric(10,4),

  annual_distribution_rate numeric(18,6),
  ttm_distributions_per_share numeric(18,6),

  distribution_growth_1y_pct numeric(10,4),
  distribution_growth_3y_pct numeric(10,4),
  distribution_growth_5y_pct numeric(10,4),

  distribution_tax_character text,
  distribution_roc_pct numeric(10,4),

  created_at timestamptz not null default now(),

  constraint fmp_etf_income_stats_unique unique (etf_id, as_of_date),

  constraint fmp_etf_income_stats_distribution_frequency_check check (
    distribution_frequency is null or distribution_frequency in (
      'monthly',
      'quarterly',
      'semiannual',
      'annual',
      'irregular'
    )
  ),

  constraint fmp_etf_income_stats_tax_character_check check (
    distribution_tax_character is null or distribution_tax_character in (
      'ordinary_income',
      'qualified_dividend',
      'capital_gains',
      'return_of_capital',
      'mixed',
      'unknown'
    )
  )
);

create index if not exists fmp_etf_income_stats_etf_id_idx
  on public.fmp_etf_income_stats (etf_id);

create index if not exists fmp_etf_income_stats_as_of_date_idx
  on public.fmp_etf_income_stats (as_of_date desc);

create index if not exists fmp_etf_income_stats_etf_date_idx
  on public.fmp_etf_income_stats (etf_id, as_of_date desc);


-- =========================================================
-- 4) ETF OPTIONS OVERLAY SNAPSHOTS
-- Only populated for covered call / options-based ETFs
-- =========================================================

create table if not exists public.fmp_etf_options_overlay (
  id bigserial primary key,
  etf_id uuid not null references public.fmp_etfs(id) on delete cascade,
  as_of_date date not null,

  options_overlay_type text not null default 'none',
  option_underlying_type text,
  call_write_frequency text,

  option_tenor_days integer,
  target_moneyness_pct numeric(10,4),
  portfolio_options_coverage_pct numeric(10,4),

  uses_0dte boolean not null default false,
  upside_cap_characteristic text,
  strategy_notes text,

  created_at timestamptz not null default now(),

  constraint fmp_etf_options_overlay_unique unique (etf_id, as_of_date),

  constraint fmp_etf_options_overlay_type_check check (
    options_overlay_type in (
      'none',
      'covered_call',
      'buy_write',
      'put_write',
      'collar',
      'buffer',
      'defined_outcome',
      'synthetic_income',
      'other'
    )
  ),

  constraint fmp_etf_options_overlay_underlying_type_check check (
    option_underlying_type is null or option_underlying_type in (
      'portfolio_holdings',
      'index',
      'single_stock',
      'mixed',
      'other'
    )
  ),

  constraint fmp_etf_options_overlay_call_write_frequency_check check (
    call_write_frequency is null or call_write_frequency in (
      'daily',
      'weekly',
      'monthly',
      'quarterly',
      'opportunistic'
    )
  ),

  constraint fmp_etf_options_overlay_tenor_check check (
    option_tenor_days is null or option_tenor_days >= 0
  ),

  constraint fmp_etf_options_overlay_moneyness_check check (
    target_moneyness_pct is null or target_moneyness_pct >= 0
  ),

  constraint fmp_etf_options_overlay_coverage_check check (
    portfolio_options_coverage_pct is null
    or (
      portfolio_options_coverage_pct >= 0
      and portfolio_options_coverage_pct <= 100
    )
  )
);

create index if not exists fmp_etf_options_overlay_etf_id_idx
  on public.fmp_etf_options_overlay (etf_id);

create index if not exists fmp_etf_options_overlay_as_of_date_idx
  on public.fmp_etf_options_overlay (as_of_date desc);

create index if not exists fmp_etf_options_overlay_etf_date_idx
  on public.fmp_etf_options_overlay (etf_id, as_of_date desc);

create index if not exists fmp_etf_options_overlay_type_idx
  on public.fmp_etf_options_overlay (options_overlay_type);


-- =========================================================
-- 5) ETF HOLDINGS
-- What the ETF actually owns. Critical for dividend analysis.
-- Fed by FMP /etf-holder endpoint.
-- =========================================================

create table if not exists public.fmp_etf_holdings (
  id bigserial primary key,
  etf_id uuid not null references public.fmp_etfs(id) on delete cascade,
  as_of_date date not null,

  symbol text not null,
  asset_name text,
  cusip text,
  isin text,

  weight_pct numeric(10,6),
  shares_held bigint,
  market_value numeric(20,2),

  asset_type text,

  created_at timestamptz not null default now(),

  constraint fmp_etf_holdings_unique unique (etf_id, as_of_date, symbol),

  constraint fmp_etf_holdings_weight_check check (
    weight_pct is null or (weight_pct >= 0 and weight_pct <= 100)
  )
);

create index if not exists fmp_etf_holdings_etf_id_idx
  on public.fmp_etf_holdings (etf_id);

create index if not exists fmp_etf_holdings_as_of_date_idx
  on public.fmp_etf_holdings (as_of_date desc);

create index if not exists fmp_etf_holdings_etf_date_idx
  on public.fmp_etf_holdings (etf_id, as_of_date desc);

create index if not exists fmp_etf_holdings_symbol_idx
  on public.fmp_etf_holdings (symbol);


-- =========================================================
-- 6) ETF LIFECYCLE EVENTS
-- Mergers, liquidations, reverse splits, ticker changes
-- =========================================================

create table if not exists public.fmp_etf_lifecycle_events (
  id bigserial primary key,
  etf_id uuid not null references public.fmp_etfs(id) on delete cascade,
  event_date date not null,
  event_type text not null,

  old_symbol text,
  new_symbol text,

  old_cusip text,
  new_cusip text,

  split_ratio numeric(18,6),
  successor_etf_id uuid references public.fmp_etfs(id) on delete set null,

  notes text,
  source_url text,

  created_at timestamptz not null default now(),

  constraint fmp_etf_lifecycle_events_type_check check (
    event_type in (
      'ticker_change',
      'cusip_change',
      'reverse_split',
      'split',
      'merger',
      'liquidation',
      'closure',
      'rebrand',
      'other'
    )
  )
);

create index if not exists fmp_etf_lifecycle_events_etf_id_idx
  on public.fmp_etf_lifecycle_events (etf_id);

create index if not exists fmp_etf_lifecycle_events_event_date_idx
  on public.fmp_etf_lifecycle_events (event_date desc);

create index if not exists fmp_etf_lifecycle_events_successor_idx
  on public.fmp_etf_lifecycle_events (successor_etf_id);


-- =========================================================
-- 7) TICKER HISTORY
-- Track symbol changes over time. Safer than assuming
-- symbol is permanent.
-- =========================================================

create table if not exists public.fmp_etf_ticker_history (
  id bigserial primary key,
  etf_id uuid not null references public.fmp_etfs(id) on delete cascade,

  symbol text not null,
  exchange text,
  valid_from date not null,
  valid_to date,

  created_at timestamptz not null default now(),

  constraint fmp_etf_ticker_history_valid_range_check check (
    valid_to is null or valid_to >= valid_from
  )
);

create index if not exists fmp_etf_ticker_history_etf_id_idx
  on public.fmp_etf_ticker_history (etf_id);

create index if not exists fmp_etf_ticker_history_symbol_idx
  on public.fmp_etf_ticker_history (symbol);

create index if not exists fmp_etf_ticker_history_symbol_validity_idx
  on public.fmp_etf_ticker_history (symbol, valid_from);


-- =========================================================
-- 8) UPDATED_AT TRIGGER
-- Reuses the existing public.set_updated_at() function
-- defined in v001-migration.sql. Do not redefine.
-- =========================================================

drop trigger if exists set_fmp_etfs_updated_at on public.fmp_etfs;

create trigger set_fmp_etfs_updated_at
  before update on public.fmp_etfs
  for each row
  execute function public.set_updated_at();


-- =========================================================
-- 9) ROW LEVEL SECURITY
-- Consistency with rest of the database. Service role bypasses
-- RLS for internal agent access.
-- =========================================================

alter table public.fmp_etfs enable row level security;
alter table public.fmp_etf_market_stats enable row level security;
alter table public.fmp_etf_income_stats enable row level security;
alter table public.fmp_etf_options_overlay enable row level security;
alter table public.fmp_etf_holdings enable row level security;
alter table public.fmp_etf_lifecycle_events enable row level security;
alter table public.fmp_etf_ticker_history enable row level security;
