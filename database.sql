--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: entry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE entry (
    id integer NOT NULL,
    user_id bigint NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    distance_in_meters integer NOT NULL,
    duration_in_secs integer NOT NULL,
    location text
);


--
-- Name: entry_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE entry_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE entry_id_seq OWNED BY entry.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "user" (
    id bigint NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    activation_code_generator text NOT NULL
);


--
-- Name: user_activation_code; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_activation_code (
    id integer NOT NULL,
    user_id bigint NOT NULL,
    activation_code text NOT NULL,
    expiration_time timestamp without time zone NOT NULL
);


--
-- Name: user_activation_code_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_activation_code_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_activation_code_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_activation_code_id_seq OWNED BY user_activation_code.id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- Name: user_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_session (
    id integer NOT NULL,
    user_id bigint NOT NULL,
    session_id text NOT NULL,
    expiration_time timestamp without time zone NOT NULL,
    is_invalidated boolean DEFAULT false NOT NULL
);


--
-- Name: user_session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_session_id_seq OWNED BY user_session.id;


--
-- Name: entry id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY entry ALTER COLUMN id SET DEFAULT nextval('entry_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: user_activation_code id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_activation_code ALTER COLUMN id SET DEFAULT nextval('user_activation_code_id_seq'::regclass);


--
-- Name: user_session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_session ALTER COLUMN id SET DEFAULT nextval('user_session_id_seq'::regclass);


--
-- Data for Name: entry; Type: TABLE DATA; Schema: public; Owner: -
--

COPY entry (id, user_id, "timestamp", distance_in_meters, duration_in_secs, location) FROM stdin;
\.


--
-- Name: entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('entry_id_seq', 1, false);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "user" (id, username, password, is_active, activation_code_generator) FROM stdin;
\.


--
-- Data for Name: user_activation_code; Type: TABLE DATA; Schema: public; Owner: -
--

COPY user_activation_code (id, user_id, activation_code, expiration_time) FROM stdin;
\.


--
-- Name: user_activation_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_activation_code_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_id_seq', 1, false);


--
-- Data for Name: user_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY user_session (id, user_id, session_id, expiration_time, is_invalidated) FROM stdin;
\.


--
-- Name: user_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_session_id_seq', 1, false);


--
-- Name: entry entry_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY entry
    ADD CONSTRAINT entry_id PRIMARY KEY (id);


--
-- Name: user_activation_code user_activation_code_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_activation_code
    ADD CONSTRAINT user_activation_code_id PRIMARY KEY (id);


--
-- Name: user user_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_id PRIMARY KEY (id);


--
-- Name: user_session user_session_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_session
    ADD CONSTRAINT user_session_id PRIMARY KEY (id);


--
-- Name: entry entry_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY entry
    ADD CONSTRAINT entry_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_activation_code user_activation_code_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_activation_code
    ADD CONSTRAINT user_activation_code_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_session user_session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_session
    ADD CONSTRAINT user_session_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

