--
-- PostgreSQL database dump
--

\restrict aSwoJBVCOXrDL3Y4bzer5gdage2tQcAV1qYFHVsUreXeGgYAbSbLj7WITM6cbrY

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
-- Name: alpha_cash_flow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alpha_cash_flow (
    id bigint NOT NULL,
    symbol text NOT NULL,
    fiscal_date_ending date NOT NULL,
    report_type text NOT NULL,
    reported_currency text,
    operating_cashflow bigint,
    payments_for_operating_activities bigint,
    proceeds_from_operating_activities bigint,
    change_in_operating_liabilities bigint,
    change_in_operating_assets bigint,
    depreciation_depletion_and_amortization bigint,
    capital_expenditures bigint,
    change_in_receivables bigint,
    change_in_inventory bigint,
    profit_loss bigint,
    cashflow_from_investment bigint,
    cashflow_from_financing bigint,
    proceeds_from_repayments_of_short_term_debt bigint,
    payments_for_repurchase_of_common_stock bigint,
    payments_for_repurchase_of_equity bigint,
    payments_for_repurchase_of_preferred_stock bigint,
    dividend_payout bigint,
    dividend_payout_common_stock bigint,
    dividend_payout_preferred_stock bigint,
    proceeds_from_issuance_of_common_stock bigint,
    proceeds_from_issuance_of_long_term_debt_and_capital_securities bigint,
    proceeds_from_issuance_of_preferred_stock bigint,
    proceeds_from_repurchase_of_equity bigint,
    proceeds_from_sale_of_treasury_stock bigint,
    change_in_cash_and_cash_equivalents bigint,
    change_in_exchange_rate bigint,
    net_income bigint,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT alpha_cash_flow_report_type_check CHECK ((report_type = ANY (ARRAY['annual'::text, 'quarterly'::text])))
);


ALTER TABLE public.alpha_cash_flow OWNER TO postgres;

--
-- Name: alpha_cash_flow_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alpha_cash_flow_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alpha_cash_flow_id_seq OWNER TO postgres;

--
-- Name: alpha_cash_flow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alpha_cash_flow_id_seq OWNED BY public.alpha_cash_flow.id;


--
-- Name: alpha_cash_flow id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_cash_flow ALTER COLUMN id SET DEFAULT nextval('public.alpha_cash_flow_id_seq'::regclass);


--
-- Name: alpha_cash_flow alpha_cash_flow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_cash_flow
    ADD CONSTRAINT alpha_cash_flow_pkey PRIMARY KEY (id);


--
-- Name: alpha_cash_flow alpha_cash_flow_symbol_fiscal_date_ending_report_type_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_cash_flow
    ADD CONSTRAINT alpha_cash_flow_symbol_fiscal_date_ending_report_type_key UNIQUE (symbol, fiscal_date_ending, report_type);


--
-- Name: idx_alpha_cash_flow_fiscal_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_cash_flow_fiscal_date ON public.alpha_cash_flow USING btree (fiscal_date_ending DESC);


--
-- Name: idx_alpha_cash_flow_report_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_cash_flow_report_type ON public.alpha_cash_flow USING btree (report_type);


--
-- Name: idx_alpha_cash_flow_symbol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_cash_flow_symbol ON public.alpha_cash_flow USING btree (symbol);


--
-- Name: idx_alpha_cash_flow_symbol_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_cash_flow_symbol_date ON public.alpha_cash_flow USING btree (symbol, fiscal_date_ending DESC);


--
-- Name: alpha_cash_flow update_alpha_cash_flow_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_alpha_cash_flow_updated_at BEFORE UPDATE ON public.alpha_cash_flow FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: alpha_cash_flow Allow authenticated users to insert cash flow data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to insert cash flow data" ON public.alpha_cash_flow FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: alpha_cash_flow Allow authenticated users to read cash flow data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to read cash flow data" ON public.alpha_cash_flow FOR SELECT TO authenticated USING (true);


--
-- Name: alpha_cash_flow Allow authenticated users to upsert cash flow data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to upsert cash flow data" ON public.alpha_cash_flow FOR UPDATE TO authenticated WITH CHECK (true);


--
-- Name: alpha_cash_flow; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.alpha_cash_flow ENABLE ROW LEVEL SECURITY;

--
-- Name: TABLE alpha_cash_flow; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_cash_flow TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_cash_flow TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_cash_flow TO service_role;


--
-- Name: SEQUENCE alpha_cash_flow_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.alpha_cash_flow_id_seq TO anon;
GRANT ALL ON SEQUENCE public.alpha_cash_flow_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.alpha_cash_flow_id_seq TO service_role;


--
-- PostgreSQL database dump complete
--

\unrestrict aSwoJBVCOXrDL3Y4bzer5gdage2tQcAV1qYFHVsUreXeGgYAbSbLj7WITM6cbrY

