-- ============================================================
-- EMA WATCHLIST
-- Daily moving-average setup tracker for stocks and ETFs.
-- FMP remains the source for prices/profiles; this schema stores
-- user watchlist metadata plus the latest and historical computed
-- technical snapshots.
-- ============================================================

create extension if not exists pgcrypto;

create table if not exists public.ema_watchlist_items (
  id uuid primary key default gen_random_uuid(),

  symbol text not null,
  notes text,

  buy_mode text not null default 'any'
    check (buy_mode in ('any', '62_ema', '79_ema', '200_sma')),
  alert_threshold_pct numeric(8,4) not null default 3.0000,
  approaching_threshold_pct numeric(8,4) not null default 8.0000,

  is_active boolean not null default true,
  sort_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint ema_watchlist_items_symbol_unique unique (symbol),
  constraint ema_watchlist_items_symbol_format
    check (symbol = upper(symbol) and symbol ~ '^[A-Z][A-Z0-9.-]{0,9}$'),
  constraint ema_watchlist_items_alert_threshold_nonnegative
    check (alert_threshold_pct >= 0),
  constraint ema_watchlist_items_approaching_threshold_nonnegative
    check (approaching_threshold_pct >= 0)
);

create index if not exists ema_watchlist_items_active_idx
  on public.ema_watchlist_items (is_active, sort_order, symbol);

create table if not exists public.ema_watchlist_latest (
  watchlist_item_id uuid primary key
    references public.ema_watchlist_items(id) on delete cascade,

  symbol text not null,
  company_name text,

  latest_price numeric(18,6),
  latest_date date,

  ema_62 numeric(18,6),
  ema_79 numeric(18,6),
  sma_200 numeric(18,6),

  pct_to_62_ema numeric(10,4),
  pct_to_79_ema numeric(10,4),
  pct_to_200_sma numeric(10,4),

  nearest_level text,
  nearest_level_price numeric(18,6),
  nearest_distance_pct numeric(10,4),

  status text not null default 'Needs refresh',

  raw_source text not null default 'fmp',
  computed_at timestamptz not null default now(),

  constraint ema_watchlist_latest_symbol_unique unique (symbol)
);

create index if not exists ema_watchlist_latest_symbol_idx
  on public.ema_watchlist_latest (symbol);

create table if not exists public.ema_watchlist_snapshots (
  id bigserial primary key,
  watchlist_item_id uuid not null
    references public.ema_watchlist_items(id) on delete cascade,

  symbol text not null,
  as_of_date date not null,

  latest_price numeric(18,6),
  ema_62 numeric(18,6),
  ema_79 numeric(18,6),
  sma_200 numeric(18,6),

  pct_to_62_ema numeric(10,4),
  pct_to_79_ema numeric(10,4),
  pct_to_200_sma numeric(10,4),

  nearest_level text,
  nearest_level_price numeric(18,6),
  nearest_distance_pct numeric(10,4),

  buy_mode text not null
    check (buy_mode in ('any', '62_ema', '79_ema', '200_sma')),
  alert_threshold_pct numeric(8,4) not null,
  approaching_threshold_pct numeric(8,4) not null,
  status text not null,

  raw_source text not null default 'fmp',
  computed_at timestamptz not null default now(),

  constraint ema_watchlist_snapshots_item_date_unique
    unique (watchlist_item_id, as_of_date)
);

create index if not exists ema_watchlist_snapshots_symbol_date_idx
  on public.ema_watchlist_snapshots (symbol, as_of_date desc);

drop trigger if exists set_ema_watchlist_items_updated_at
  on public.ema_watchlist_items;

create trigger set_ema_watchlist_items_updated_at
  before update on public.ema_watchlist_items
  for each row
  execute function public.set_updated_at();

alter table public.ema_watchlist_items enable row level security;
alter table public.ema_watchlist_latest enable row level security;
alter table public.ema_watchlist_snapshots enable row level security;
