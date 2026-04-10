--
-- PostgreSQL database dump
--

\restrict t1l7HZ7LOuIPmmHYLfODqEPHdHEPdFp1zRGSaAgEBRIVHxFJ89OCbs6DYFtvLaR

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
-- Name: alpha_dividends; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alpha_dividends (
    id bigint NOT NULL,
    symbol text NOT NULL,
    ex_dividend_date date NOT NULL,
    declaration_date date,
    record_date date,
    payment_date date,
    amount numeric(10,4) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.alpha_dividends OWNER TO postgres;

--
-- Name: alpha_dividends_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alpha_dividends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alpha_dividends_id_seq OWNER TO postgres;

--
-- Name: alpha_dividends_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alpha_dividends_id_seq OWNED BY public.alpha_dividends.id;


--
-- Name: alpha_dividends id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_dividends ALTER COLUMN id SET DEFAULT nextval('public.alpha_dividends_id_seq'::regclass);


--
-- Name: alpha_dividends alpha_dividends_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_dividends
    ADD CONSTRAINT alpha_dividends_pkey PRIMARY KEY (id);


--
-- Name: alpha_dividends alpha_dividends_symbol_ex_dividend_date_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alpha_dividends
    ADD CONSTRAINT alpha_dividends_symbol_ex_dividend_date_key UNIQUE (symbol, ex_dividend_date);


--
-- Name: idx_alpha_dividends_ex_dividend_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_dividends_ex_dividend_date ON public.alpha_dividends USING btree (ex_dividend_date DESC);


--
-- Name: idx_alpha_dividends_payment_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_dividends_payment_date ON public.alpha_dividends USING btree (payment_date DESC);


--
-- Name: idx_alpha_dividends_symbol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_dividends_symbol ON public.alpha_dividends USING btree (symbol);


--
-- Name: idx_alpha_dividends_symbol_ex_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alpha_dividends_symbol_ex_date ON public.alpha_dividends USING btree (symbol, ex_dividend_date DESC);


--
-- Name: alpha_dividends update_alpha_dividends_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_alpha_dividends_updated_at BEFORE UPDATE ON public.alpha_dividends FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: alpha_dividends Allow authenticated users to UPDATE dividends data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to UPDATE dividends data" ON public.alpha_dividends FOR UPDATE TO authenticated WITH CHECK (true);


--
-- Name: alpha_dividends Allow authenticated users to insert dividends data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to insert dividends data" ON public.alpha_dividends FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: alpha_dividends Allow authenticated users to read dividends data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to read dividends data" ON public.alpha_dividends FOR SELECT TO authenticated USING (true);


--
-- Name: alpha_dividends; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.alpha_dividends ENABLE ROW LEVEL SECURITY;

--
-- Name: TABLE alpha_dividends; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_dividends TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_dividends TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alpha_dividends TO service_role;


--
-- Name: SEQUENCE alpha_dividends_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.alpha_dividends_id_seq TO anon;
GRANT ALL ON SEQUENCE public.alpha_dividends_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.alpha_dividends_id_seq TO service_role;


--
-- PostgreSQL database dump complete
--

\unrestrict t1l7HZ7LOuIPmmHYLfODqEPHdHEPdFp1zRGSaAgEBRIVHxFJ89OCbs6DYFtvLaR

