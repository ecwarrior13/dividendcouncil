--
-- PostgreSQL database dump
--

\restrict w95tT5M65oL5C4oLZ9M3AXAObILFcgOuxfwPDfuG6z824f2YSvOgCHc6jA7ffwI

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
-- Name: alpha_income_statement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alpha_income_statement (
    id bigint NOT NULL,
    symbol text NOT NULL,
    fiscal_date_ending date NOT NULL,
    report_type text NOT NULL,
    reported_currency text,
    gross_profit bigint,
    total_revenue bigint,
    cost_of_revenue bigint,
    cost_of_goods_and_services_sold bigint,
    operating_income bigint,
    selling_general_and_administrative bigint,
    research_and_development numeric(20,4),
    operating_expenses bigint,
    investment_income_net bigint,
    net_interest_income bigint,
    interest_income bigint,
    interest_expense bigint,
    non_interest_income bigint,
    other_non_operating_income bigint,
    depreciation bigint,
    depreciation_and_amortization bigint,
    income_before_tax bigint,
    income_tax_expense bigint,
    interest_and_debt_expense bigint,
    net_income_from_continuing_operations bigint,
    comprehensive_income_net_of_tax bigint,
    ebit bigint,
    ebitda bigint,
    net_income bigint,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT alpha_income_statement_report_type_check CHECK ((report_type = ANY (ARRAY['annual'::text, 'quarterly'::text])))
);


ALTER TABLE public.alpha_income_statement OWNER TO postgres;

--
-- Name: alpha_income_statement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alpha_income_statement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alpha_income_statement_id_seq OWNER TO postgres;

--
-- Name: alpha_income_statement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alpha_income_statement_id_seq OWNED BY public.alpha_income_statement.id;


--
-- Name: alpha_income_statement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_income_statement ALTER COLUMN id SET DEFAULT nextval('public.alpha_income_statement_id_seq'::regclass);


--
-- Name: alpha_income_statement alpha_income_statement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_income_statement
    ADD CONSTRAINT alpha_income_statement_pkey PRIMARY KEY (id);


--
-- Name: alpha_income_statement alpha_income_statement_symbol_fiscal_date_ending_report_typ_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_income_statement
    ADD CONSTRAINT alpha_income_statement_symbol_fiscal_date_ending_report_typ_key UNIQUE (symbol, fiscal_date_ending, report_type);


--
-- Name: idx_alpha_income_statement_fiscal_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_income_statement_fiscal_date ON public.alpha_income_statement USING btree (fiscal_date_ending DESC);


--
-- Name: idx_alpha_income_statement_report_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_income_statement_report_type ON public.alpha_income_statement USING btree (report_type);


--
-- Name: idx_alpha_income_statement_symbol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_income_statement_symbol ON public.alpha_income_statement USING btree (symbol);


--
-- Name: idx_alpha_income_statement_symbol_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_income_statement_symbol_date ON public.alpha_income_statement USING btree (symbol, fiscal_date_ending DESC);


--
-- Name: alpha_income_statement update_alpha_income_statement_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_alpha_income_statement_updated_at BEFORE UPDATE ON public.alpha_income_statement FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: alpha_income_statement Allow authenticated users to insert income statement data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to insert income statement data" ON public.alpha_income_statement FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: alpha_income_statement Allow authenticated users to read income statement data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to read income statement data" ON public.alpha_income_statement FOR SELECT TO authenticated USING (true);


--
-- Name: alpha_income_statement Allow authenticated users to update earnings data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to update earnings data" ON public.alpha_income_statement FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- Name: alpha_income_statement; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.alpha_income_statement ENABLE ROW LEVEL SECURITY;

--
-- Name: TABLE alpha_income_statement; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_income_statement TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_income_statement TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_income_statement TO service_role;


--
-- Name: SEQUENCE alpha_income_statement_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.alpha_income_statement_id_seq TO anon;
GRANT ALL ON SEQUENCE public.alpha_income_statement_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.alpha_income_statement_id_seq TO service_role;


--
-- PostgreSQL database dump complete
--

\unrestrict w95tT5M65oL5C4oLZ9M3AXAObILFcgOuxfwPDfuG6z824f2YSvOgCHc6jA7ffwI

