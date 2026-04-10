--
-- PostgreSQL database dump
--

\restrict nEVGGEiNhmLJUDmuTiPWQVVs0X0euIbh1wMRW1MM8XcDEFybNbvguG5RsRypWhD

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alpha_balance_sheet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alpha_balance_sheet (
    id bigint NOT NULL,
    symbol text NOT NULL,
    fiscal_date_ending date NOT NULL,
    report_type text NOT NULL,
    reported_currency text,
    total_assets bigint,
    total_current_assets bigint,
    cash_and_cash_equivalents_at_carrying_value bigint,
    cash_and_short_term_investments bigint,
    inventory bigint,
    current_net_receivables bigint,
    total_non_current_assets bigint,
    property_plant_equipment bigint,
    accumulated_depreciation_amortization_ppe bigint,
    intangible_assets bigint,
    intangible_assets_excluding_goodwill bigint,
    goodwill bigint,
    investments bigint,
    long_term_investments bigint,
    short_term_investments bigint,
    other_current_assets bigint,
    other_non_current_assets bigint,
    total_liabilities bigint,
    total_current_liabilities bigint,
    current_accounts_payable bigint,
    deferred_revenue bigint,
    current_debt bigint,
    short_term_debt bigint,
    total_non_current_liabilities bigint,
    capital_lease_obligations bigint,
    long_term_debt bigint,
    current_long_term_debt bigint,
    long_term_debt_noncurrent bigint,
    short_long_term_debt_total bigint,
    other_current_liabilities bigint,
    other_non_current_liabilities bigint,
    total_shareholder_equity bigint,
    treasury_stock bigint,
    retained_earnings bigint,
    common_stock bigint,
    common_stock_shares_outstanding bigint,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT alpha_balance_sheet_report_type_check CHECK ((report_type = ANY (ARRAY['annual'::text, 'quarterly'::text])))
);


ALTER TABLE public.alpha_balance_sheet OWNER TO postgres;

--
-- Name: alpha_balance_sheet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alpha_balance_sheet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alpha_balance_sheet_id_seq OWNER TO postgres;

--
-- Name: alpha_balance_sheet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alpha_balance_sheet_id_seq OWNED BY public.alpha_balance_sheet.id;


--
-- Name: alpha_balance_sheet id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_balance_sheet ALTER COLUMN id SET DEFAULT nextval('public.alpha_balance_sheet_id_seq'::regclass);


--
-- Name: alpha_balance_sheet alpha_balance_sheet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_balance_sheet
    ADD CONSTRAINT alpha_balance_sheet_pkey PRIMARY KEY (id);


--
-- Name: alpha_balance_sheet alpha_balance_sheet_symbol_fiscal_date_ending_report_type_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_balance_sheet
    ADD CONSTRAINT alpha_balance_sheet_symbol_fiscal_date_ending_report_type_key UNIQUE (symbol, fiscal_date_ending, report_type);


--
-- Name: idx_alpha_balance_sheet_fiscal_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_balance_sheet_fiscal_date ON public.alpha_balance_sheet USING btree (fiscal_date_ending DESC);


--
-- Name: idx_alpha_balance_sheet_report_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_balance_sheet_report_type ON public.alpha_balance_sheet USING btree (report_type);


--
-- Name: idx_alpha_balance_sheet_symbol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_balance_sheet_symbol ON public.alpha_balance_sheet USING btree (symbol);


--
-- Name: idx_alpha_balance_sheet_symbol_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_balance_sheet_symbol_date ON public.alpha_balance_sheet USING btree (symbol, fiscal_date_ending DESC);


--
-- Name: alpha_balance_sheet update_alpha_balance_sheet_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_alpha_balance_sheet_updated_at BEFORE UPDATE ON public.alpha_balance_sheet FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: alpha_balance_sheet Allow authenticated users to insert balance sheet data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to insert balance sheet data" ON public.alpha_balance_sheet FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: alpha_balance_sheet Allow authenticated users to read balance sheet data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to read balance sheet data" ON public.alpha_balance_sheet FOR SELECT TO authenticated USING (true);


--
-- Name: alpha_balance_sheet Allow authenticated users to update balance sheet data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to update balance sheet data" ON public.alpha_balance_sheet FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- Name: alpha_balance_sheet; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.alpha_balance_sheet ENABLE ROW LEVEL SECURITY;

--
-- Name: TABLE alpha_balance_sheet; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_balance_sheet TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_balance_sheet TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_balance_sheet TO service_role;


--
-- Name: SEQUENCE alpha_balance_sheet_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.alpha_balance_sheet_id_seq TO anon;
GRANT ALL ON SEQUENCE public.alpha_balance_sheet_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.alpha_balance_sheet_id_seq TO service_role;


--
-- PostgreSQL database dump complete
--

\unrestrict nEVGGEiNhmLJUDmuTiPWQVVs0X0euIbh1wMRW1MM8XcDEFybNbvguG5RsRypWhD

