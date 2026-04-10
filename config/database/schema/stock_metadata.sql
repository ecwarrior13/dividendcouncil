--
-- PostgreSQL database dump
--

\restrict Js6fE7hfzBtGGTw597Ua0a2IF478Z4xLcKosBO7AikB1JzyqMuknmOnfc5X3joT

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
-- Name: alph_stock_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alph_stock_metadata (
    id bigint NOT NULL,
    symbol character varying(10) NOT NULL,
    asset_type character varying(50),
    name character varying(255),
    description text,
    cik character varying(20),
    exchange character varying(20),
    currency character varying(10),
    country character varying(100),
    sector character varying(100),
    industry character varying(255),
    address text,
    official_site character varying(255),
    fiscal_year_end character varying(20),
    latest_quarter date,
    market_capitalization numeric(20,2),
    ebitda numeric(20,2),
    pe_ratio numeric(10,2),
    peg_ratio numeric(10,3),
    book_value numeric(10,2),
    dividend_per_share numeric(10,2),
    dividend_yield numeric(10,4),
    eps numeric(10,2),
    revenue_per_share_ttm numeric(10,2),
    profit_margin numeric(10,4),
    operating_margin_ttm numeric(10,4),
    return_on_assets_ttm numeric(10,4),
    return_on_equity_ttm numeric(10,4),
    revenue_ttm numeric(20,2),
    gross_profit_ttm numeric(20,2),
    diluted_eps_ttm numeric(10,2),
    quarterly_earnings_growth_yoy numeric(10,4),
    quarterly_revenue_growth_yoy numeric(10,4),
    analyst_target_price numeric(10,2),
    analyst_rating_strong_buy integer,
    analyst_rating_buy integer,
    analyst_rating_hold integer,
    analyst_rating_sell integer,
    analyst_rating_strong_sell integer,
    trailing_pe numeric(10,2),
    forward_pe numeric(10,2),
    price_to_sales_ratio_ttm numeric(10,3),
    price_to_book_ratio numeric(10,2),
    ev_to_revenue numeric(10,3),
    ev_to_ebitda numeric(10,2),
    beta numeric(10,3),
    week_52_high numeric(10,2),
    week_52_low numeric(10,2),
    day_50_moving_average numeric(10,2),
    day_200_moving_average numeric(10,2),
    shares_outstanding numeric(20,0),
    shares_float numeric(20,0),
    percent_insiders numeric(10,4),
    percent_institutions numeric(10,4),
    dividend_date date,
    ex_dividend_date date,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.alph_stock_metadata OWNER TO postgres;

--
-- Name: alph_stock_metadata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alph_stock_metadata_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alph_stock_metadata_id_seq OWNER TO postgres;

--
-- Name: alph_stock_metadata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alph_stock_metadata_id_seq OWNED BY public.alph_stock_metadata.id;


--
-- Name: alph_stock_metadata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alph_stock_metadata ALTER COLUMN id SET DEFAULT nextval('public.alph_stock_metadata_id_seq'::regclass);


--
-- Name: alph_stock_metadata alph_stock_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alph_stock_metadata
    ADD CONSTRAINT alph_stock_metadata_pkey PRIMARY KEY (id);


--
-- Name: alph_stock_metadata unique_symbol; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alph_stock_metadata
    ADD CONSTRAINT unique_symbol UNIQUE (symbol);


--
-- Name: idx_alph_stock_metadata_symbol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alph_stock_metadata_symbol ON public.alph_stock_metadata USING btree (symbol);


--
-- Name: alph_stock_metadata update_alph_stock_metadata_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_alph_stock_metadata_updated_at BEFORE UPDATE ON public.alph_stock_metadata FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: alph_stock_metadata Allow authenticated users to insert income statement data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to insert income statement data" ON public.alph_stock_metadata FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: alph_stock_metadata Allow authenticated users to read income statement data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to read income statement data" ON public.alph_stock_metadata FOR SELECT TO authenticated USING (true);


--
-- Name: alph_stock_metadata Allow authenticated users to update earnings data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to update earnings data" ON public.alph_stock_metadata FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- Name: alph_stock_metadata; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.alph_stock_metadata ENABLE ROW LEVEL SECURITY;

--
-- Name: TABLE alph_stock_metadata; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alph_stock_metadata TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alph_stock_metadata TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alph_stock_metadata TO service_role;


--
-- Name: SEQUENCE alph_stock_metadata_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.alph_stock_metadata_id_seq TO anon;
GRANT ALL ON SEQUENCE public.alph_stock_metadata_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.alph_stock_metadata_id_seq TO service_role;


--
-- PostgreSQL database dump complete
--

\unrestrict Js6fE7hfzBtGGTw597Ua0a2IF478Z4xLcKosBO7AikB1JzyqMuknmOnfc5X3joT

