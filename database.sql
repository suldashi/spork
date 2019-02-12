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
    location text,
    deleted boolean DEFAULT false NOT NULL
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
    activation_code_generator text NOT NULL,
    is_user_manager boolean DEFAULT false NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    is_admin boolean DEFAULT false NOT NULL
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

COPY entry (id, user_id, "timestamp", distance_in_meters, duration_in_secs, location, deleted) FROM stdin;
1	2	2018-03-08 08:10:07.364	5000	1500	\N	f
2	2	2018-03-01 08:15:11.956	4500	1800	\N	f
3	1	2018-03-08 08:19:15.082	1000	100	\N	f
\.


--
-- Name: entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('entry_id_seq', 3, true);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "user" (id, username, password, is_active, activation_code_generator, is_user_manager, is_deleted, is_admin) FROM stdin;
1	admin	$2a$12$DVKLqWqQTI0BkoE6ge1jSO8KDTVmhauCm7Zczg3KRPfwcvha60kby	t	295e0ca4bd8698e36757aa3807014b28	t	f	f
2	ermirsuldashi@gmail.com	$2a$12$WpCCCgRqcJ4Zq.J3AcEMDePyIjiYdyyQof0AnItE0Y.XzlgerWg2y	t	1ea0e09acd5a0d4e40100914d410c83c	t	f	t
3	6f71d13438f7900973eec453b9c2f4be	$2b$12$yoFr7WLZVkOemZEFE8YCLOS4Q5c9D2NSmDnWrzU6vW9PvSzR8Of9m	f	f02135bdbf736a3a96e63526a0ee7f4f	f	t	f
4	78c03a2dc3f74b6bdace290450438881	$2b$12$NBeZY/NAihbGrKCCdZ7yK.ecHySxNXw17ViV0VZ9LI7mxUG0mW.dq	f	3bcc74a9d0c41e0dfce0460351e930df	f	t	f
5	8eb7ba915fda746da90a4d948a11bf7f	$2b$12$jC7tU1/0CXdiC3qPohb2uuP.Yuhk397svjmDNLhiR7R8p1TlzIICi	t	a3e10d972b1ed02159fdd8d9a8f93e06	f	t	f
6	75edac952dd4faf9c960230a4b3aa6d7	$2b$12$zelnSx91qXD1dKo1xVv.6e1LiBTIurY59HAwxZIMJLmcXX1q38JAe	f	a4093ebe6adb6499ee33f9d03fd0dcd7	f	t	f
7	fa6c1b60e0aa7b2ff3c5aba129700c15	$2b$12$Jw6tg9ojTLQr1F7MgD2I8ugEKcoGVEruDTiQNvJ0ISKKsSH9MzoTO	f	b686127b560367e57da24535e3b2b18e	f	f	f
8	f0c78dc678695457b706f3a0ed38ce9b	$2b$12$Okd8B4hBR4DTQ.ZBhYe7/eh9b/8Camfbx3z4RsxaGo3dEUhA8X4LS	f	416c89ea2f9d7c4b6a68317ffd4ce051	f	t	f
9	3301dba580fc6c1135f246c0fa67b826	$2b$12$Mxrqm0VVtXABV5M0pilkOeD3aydPsW4IpM18dkh8TBWB1RjtKgZ3K	f	42cf594d9d71915e129d456e3b36b78a	f	t	f
10	8f0ee07baac7be8f1a19482edb842365	$2b$12$cjaIzEfNcn2dL9fYZP8Wz.hIHacGMFcTNrNBLLdoSW.xFmZaWM/JW	t	d1fc99b8a894a97f63763c7570142d20	f	t	f
11	517fe3067167b0ce6c145ade4c7f64df	$2b$12$3DsB7guDeM1CXhDHnl/rPea0SMcRloffbGA5FcFsMFwzj1NL86/mu	f	7230184f2bfda7e0b0f05bc1bf38add7	f	t	f
\.


--
-- Data for Name: user_activation_code; Type: TABLE DATA; Schema: public; Owner: -
--

COPY user_activation_code (id, user_id, activation_code, expiration_time) FROM stdin;
1	2	f5703c0667ea9b8809f88101dfd6388e	2018-03-08 10:08:50.768
2	5	b760e2a869081fb1d7cbf6f319223ede	2019-02-12 22:25:34.271
3	7	936fec431b3052f3440dbd3b4bde9058	2019-02-12 22:28:29.903
4	10	eb83e29b00f0dd40e6d3b291c60ed2bd	2019-02-12 22:28:35.692
\.


--
-- Name: user_activation_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_activation_code_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_id_seq', 11, true);


--
-- Data for Name: user_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY user_session (id, user_id, session_id, expiration_time, is_invalidated) FROM stdin;
1	2	c45da0d949f8da8728169db075d7b66712fe6ebf0c366baddd30b36c98fac8a6	2018-04-08 07:09:17.966	f
2	2	8f17288d43fa10e9f684294a567cf8ee9c51e77e70f77901e1189c19974ac298	2018-04-08 07:13:00.003	f
3	1	1c101e65e2de66b7951497ecad846f4e322df850d14816f6c71fd5a66b65e86d	2018-04-08 07:15:58.53	f
4	2	e21506d4061f6ca82dfde8316783b5dce36a487105a25c014facea910af237d8	2018-04-08 07:18:42.119	f
5	1	83d7f7808f170b5027314780437296dbb2b228ff7e410805cc72ec6cb104bdd7	2018-04-08 07:19:35.508	f
6	3	1b8b1100a4100f4a161af143a03d4883f30926b2d5c45c5112c81ea386d406a9	2019-03-12 20:25:32.706	f
7	3	ef17612b06631b6c6089e9444c78ef0b1673a77cd34c97833d58064eaf2cb805	2019-03-12 20:25:32.71	f
8	4	e019d3e36204716914d73238e2ca3638904069a9d6bac20fc448e8a820074466	2019-03-12 20:25:33.113	t
9	8	55044d02c75bac1be7fd5ccd4cc6bc868c835fd0db461f2507d88db4e10321f9	2019-03-12 20:28:34.162	f
10	8	40b4fbe2c7bea85f9a2e0d97fd38721dbc1302cc74e5847a789467e91a6c581c	2019-03-12 20:28:34.165	f
11	9	0f2f7128eca4b22e8acc38d9ee0fe7e676febab47cedc3d96e226910ce197ea1	2019-03-12 20:28:34.586	t
\.


--
-- Name: user_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_session_id_seq', 11, true);


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

