-- ============================================================
-- FINANCIAL MODELING PREP (FMP) TABLES
-- Clean split from Alpha Vantage tables.
-- FMP uses camelCase in responses, we store as snake_case.
-- ============================================================

-- Company profile / metadata
CREATE TABLE fmp_company_profile (
  id                        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  symbol                    VARCHAR(10) NOT NULL UNIQUE,
  company_name              VARCHAR(255),
  description               TEXT,
  cik                       VARCHAR(20),
  exchange                  VARCHAR(20),
  currency                  VARCHAR(10),
  country                   VARCHAR(100),
  sector                    VARCHAR(100),
  industry                  VARCHAR(255),
  website                   VARCHAR(255),
  ceo                       VARCHAR(255),
  full_time_employees       INTEGER,
  ipo_date                  DATE,
  -- Price & Market
  price                     NUMERIC(12,2),
  market_cap                NUMERIC(20,2),
  beta                      NUMERIC(10,3),
  vol_avg                   BIGINT,
  last_div                  NUMERIC(10,4),
  week_52_high              NUMERIC(12,2),
  week_52_low               NUMERIC(12,2),
  -- Valuation
  pe                        NUMERIC(10,2),
  eps                       NUMERIC(10,2),
  -- Dividend
  dividend_yield            NUMERIC(10,6),
  ex_dividend_date          DATE,
  -- ETF specific
  is_etf                    BOOLEAN NOT NULL DEFAULT false,
  is_actively_trading       BOOLEAN NOT NULL DEFAULT true,
  -- Meta
  created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_fmp_profile_symbol ON fmp_company_profile(symbol);

-- Income statements
CREATE TABLE fmp_income_statement (
  id                              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  symbol                          TEXT NOT NULL,
  date                            DATE NOT NULL,
  period                          TEXT NOT NULL,           -- FY, Q1, Q2, Q3, Q4
  reported_currency               TEXT,
  -- Revenue
  revenue                         BIGINT,
  cost_of_revenue                 BIGINT,
  gross_profit                    BIGINT,
  gross_profit_ratio              NUMERIC(10,6),
  -- Operating
  operating_expenses              BIGINT,
  selling_general_and_administrative BIGINT,
  research_and_development        BIGINT,
  depreciation_and_amortization   BIGINT,
  operating_income                BIGINT,
  operating_income_ratio          NUMERIC(10,6),
  -- Non-operating
  interest_income                 BIGINT,
  interest_expense                BIGINT,
  total_other_income_expenses_net BIGINT,
  -- Tax & Net
  income_before_tax               BIGINT,
  income_before_tax_ratio         NUMERIC(10,6),
  income_tax_expense              BIGINT,
  net_income                      BIGINT,
  net_income_ratio                NUMERIC(10,6),
  -- Per share
  eps                             NUMERIC(10,4),
  eps_diluted                     NUMERIC(10,4),
  weighted_average_shares         BIGINT,
  weighted_average_shares_diluted BIGINT,
  -- Profitability
  ebitda                          BIGINT,
  ebitda_ratio                    NUMERIC(10,6),
  -- Meta
  calendar_year                   TEXT,
  filling_date                    DATE,
  accepted_date                   TEXT,
  created_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(symbol, date, period)
);

CREATE INDEX idx_fmp_income_symbol ON fmp_income_statement(symbol, date DESC);

-- Balance sheet
CREATE TABLE fmp_balance_sheet (
  id                              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  symbol                          TEXT NOT NULL,
  date                            DATE NOT NULL,
  period                          TEXT NOT NULL,
  reported_currency               TEXT,
  -- Assets
  cash_and_cash_equivalents       BIGINT,
  short_term_investments          BIGINT,
  cash_and_short_term_investments BIGINT,
  net_receivables                 BIGINT,
  inventory                       BIGINT,
  other_current_assets            BIGINT,
  total_current_assets            BIGINT,
  property_plant_equipment_net    BIGINT,
  goodwill                        BIGINT,
  intangible_assets               BIGINT,
  long_term_investments           BIGINT,
  other_non_current_assets        BIGINT,
  total_non_current_assets        BIGINT,
  total_assets                    BIGINT,
  -- Liabilities
  account_payables                BIGINT,
  short_term_debt                 BIGINT,
  deferred_revenue                BIGINT,
  other_current_liabilities       BIGINT,
  total_current_liabilities       BIGINT,
  long_term_debt                  BIGINT,
  other_non_current_liabilities   BIGINT,
  total_non_current_liabilities   BIGINT,
  total_liabilities               BIGINT,
  -- Equity
  common_stock                    BIGINT,
  retained_earnings               BIGINT,
  total_stockholders_equity       BIGINT,
  total_equity                    BIGINT,
  total_liabilities_and_equity    BIGINT,
  -- Meta
  calendar_year                   TEXT,
  filling_date                    DATE,
  accepted_date                   TEXT,
  created_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(symbol, date, period)
);

CREATE INDEX idx_fmp_balance_symbol ON fmp_balance_sheet(symbol, date DESC);

-- Cash flow statement
CREATE TABLE fmp_cash_flow (
  id                              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  symbol                          TEXT NOT NULL,
  date                            DATE NOT NULL,
  period                          TEXT NOT NULL,
  reported_currency               TEXT,
  -- Operating
  net_income                      BIGINT,
  depreciation_and_amortization   BIGINT,
  stock_based_compensation        BIGINT,
  change_in_working_capital       BIGINT,
  accounts_receivables            BIGINT,
  inventory                       BIGINT,
  accounts_payables               BIGINT,
  other_working_capital           BIGINT,
  other_non_cash_items            BIGINT,
  operating_cash_flow             BIGINT,
  -- Investing
  investments_in_property         BIGINT,
  acquisitions_net                BIGINT,
  purchases_of_investments        BIGINT,
  sales_maturities_of_investments BIGINT,
  other_investing_activities      BIGINT,
  net_cash_used_for_investing     BIGINT,
  -- Financing
  debt_repayment                  BIGINT,
  common_stock_issued             BIGINT,
  common_stock_repurchased        BIGINT,
  dividends_paid                  BIGINT,
  other_financing_activities      BIGINT,
  net_cash_used_for_financing     BIGINT,
  -- Summary
  net_change_in_cash              BIGINT,
  cash_at_end_of_period           BIGINT,
  cash_at_beginning_of_period     BIGINT,
  capital_expenditure             BIGINT,
  free_cash_flow                  BIGINT,
  -- Meta
  calendar_year                   TEXT,
  filling_date                    DATE,
  accepted_date                   TEXT,
  created_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(symbol, date, period)
);

CREATE INDEX idx_fmp_cashflow_symbol ON fmp_cash_flow(symbol, date DESC);

-- Dividend history
CREATE TABLE fmp_dividends (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  symbol            TEXT NOT NULL,
  date              DATE NOT NULL,
  adj_dividend      NUMERIC(10,6),
  dividend          NUMERIC(10,6),
  record_date       DATE,
  payment_date      DATE,
  declaration_date  DATE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(symbol, date)
);

CREATE INDEX idx_fmp_dividends_symbol ON fmp_dividends(symbol, date DESC);

-- Enable RLS on all tables
ALTER TABLE fmp_company_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE fmp_income_statement ENABLE ROW LEVEL SECURITY;
ALTER TABLE fmp_balance_sheet ENABLE ROW LEVEL SECURITY;
ALTER TABLE fmp_cash_flow ENABLE ROW LEVEL SECURITY;
ALTER TABLE fmp_dividends ENABLE ROW LEVEL SECURITY;

-- Auto-update timestamps
CREATE TRIGGER fmp_company_profile_updated_at
  BEFORE UPDATE ON fmp_company_profile
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER fmp_income_statement_updated_at
  BEFORE UPDATE ON fmp_income_statement
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER fmp_balance_sheet_updated_at
  BEFORE UPDATE ON fmp_balance_sheet
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER fmp_cash_flow_updated_at
  BEFORE UPDATE ON fmp_cash_flow
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
