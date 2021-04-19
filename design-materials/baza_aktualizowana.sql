--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-04-17 20:04:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 202 (class 1259 OID 16848)
-- Name: boards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boards (
    board_id integer NOT NULL,
    archived boolean,
    user_id integer NOT NULL,
    name character varying(20)
);


ALTER TABLE public.boards OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16952)
-- Name: boards_board_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.boards_board_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_board_id_seq OWNER TO postgres;

--
-- TOC entry 3074 (class 0 OID 0)
-- Dependencies: 211
-- Name: boards_board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.boards_board_id_seq OWNED BY public.boards.board_id;


--
-- TOC entry 204 (class 1259 OID 16871)
-- Name: cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cards (
    card_id integer NOT NULL,
    name character varying(120) NOT NULL,
    column_id integer NOT NULL,
    archived boolean NOT NULL,
    "order" integer NOT NULL
);


ALTER TABLE public.cards OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16955)
-- Name: cards_card_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cards_card_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_card_id_seq OWNER TO postgres;

--
-- TOC entry 3075 (class 0 OID 0)
-- Dependencies: 212
-- Name: cards_card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cards_card_id_seq OWNED BY public.cards.card_id;


--
-- TOC entry 203 (class 1259 OID 16861)
-- Name: columns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.columns (
    board_id integer NOT NULL,
    name character varying(20),
    column_id integer NOT NULL
);


ALTER TABLE public.columns OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16962)
-- Name: columns_board_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.columns_board_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.columns_board_id_seq OWNER TO postgres;

--
-- TOC entry 3076 (class 0 OID 0)
-- Dependencies: 213
-- Name: columns_board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.columns_board_id_seq OWNED BY public.columns.board_id;


--
-- TOC entry 205 (class 1259 OID 16884)
-- Name: public_boards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.public_boards (
    public_boards_id integer NOT NULL,
    name character varying(120)
);


ALTER TABLE public.public_boards OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16949)
-- Name: public_boards_public_boards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.public_boards_public_boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.public_boards_public_boards_id_seq OWNER TO postgres;

--
-- TOC entry 3077 (class 0 OID 0)
-- Dependencies: 210
-- Name: public_boards_public_boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.public_boards_public_boards_id_seq OWNED BY public.public_boards.public_boards_id;


--
-- TOC entry 207 (class 1259 OID 16902)
-- Name: public_cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.public_cards (
    public_cards_id integer NOT NULL,
    name character varying(50),
    public_column_id integer NOT NULL,
    "order" integer
);


ALTER TABLE public.public_cards OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16965)
-- Name: public_cards_public_cards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.public_cards_public_cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.public_cards_public_cards_id_seq OWNER TO postgres;

--
-- TOC entry 3078 (class 0 OID 0)
-- Dependencies: 214
-- Name: public_cards_public_cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.public_cards_public_cards_id_seq OWNED BY public.public_cards.public_cards_id;


--
-- TOC entry 206 (class 1259 OID 16892)
-- Name: public_columns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.public_columns (
    public_column_id integer NOT NULL,
    name character varying(20),
    public_boards_id integer NOT NULL
);


ALTER TABLE public.public_columns OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16968)
-- Name: public_columns_public_column_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.public_columns_public_column_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.public_columns_public_column_id_seq OWNER TO postgres;

--
-- TOC entry 3079 (class 0 OID 0)
-- Dependencies: 215
-- Name: public_columns_public_column_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.public_columns_public_column_id_seq OWNED BY public.public_columns.public_column_id;


--
-- TOC entry 201 (class 1259 OID 16838)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    session_id character varying(140) NOT NULL,
    user_id integer NOT NULL,
    expiration_date timestamp without time zone NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16922)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- TOC entry 3080 (class 0 OID 0)
-- Dependencies: 209
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- TOC entry 200 (class 1259 OID 16833)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    password character varying(72) NOT NULL,
    login_email character varying(30) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16915)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3081 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2894 (class 2604 OID 16954)
-- Name: boards board_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards ALTER COLUMN board_id SET DEFAULT nextval('public.boards_board_id_seq'::regclass);


--
-- TOC entry 2896 (class 2604 OID 16957)
-- Name: cards card_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards ALTER COLUMN card_id SET DEFAULT nextval('public.cards_card_id_seq'::regclass);


--
-- TOC entry 2895 (class 2604 OID 16964)
-- Name: columns board_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.columns ALTER COLUMN board_id SET DEFAULT nextval('public.columns_board_id_seq'::regclass);


--
-- TOC entry 2897 (class 2604 OID 16951)
-- Name: public_boards public_boards_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_boards ALTER COLUMN public_boards_id SET DEFAULT nextval('public.public_boards_public_boards_id_seq'::regclass);


--
-- TOC entry 2899 (class 2604 OID 16967)
-- Name: public_cards public_cards_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_cards ALTER COLUMN public_cards_id SET DEFAULT nextval('public.public_cards_public_cards_id_seq'::regclass);


--
-- TOC entry 2898 (class 2604 OID 16970)
-- Name: public_columns public_column_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_columns ALTER COLUMN public_column_id SET DEFAULT nextval('public.public_columns_public_column_id_seq'::regclass);


--
-- TOC entry 2893 (class 2604 OID 16924)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 2892 (class 2604 OID 16917)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3055 (class 0 OID 16848)
-- Dependencies: 202
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boards (board_id, archived, user_id, name) FROM stdin;
1	f	1	Anna's Board 1
2	f	1	Anna's board 2
\.


--
-- TOC entry 3057 (class 0 OID 16871)
-- Dependencies: 204
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cards (card_id, name, column_id, archived, "order") FROM stdin;
\.


--
-- TOC entry 3056 (class 0 OID 16861)
-- Dependencies: 203
-- Data for Name: columns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.columns (board_id, name, column_id) FROM stdin;
\.


--
-- TOC entry 3058 (class 0 OID 16884)
-- Dependencies: 205
-- Data for Name: public_boards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.public_boards (public_boards_id, name) FROM stdin;
1	Board 1
2	Board 2
3	newboard
4	newboard
5	newboard
\.


--
-- TOC entry 3060 (class 0 OID 16902)
-- Dependencies: 207
-- Data for Name: public_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.public_cards (public_cards_id, name, public_column_id, "order") FROM stdin;
1	first row	1	1
2	second row	1	2
3	third row	1	3
\.


--
-- TOC entry 3059 (class 0 OID 16892)
-- Dependencies: 206
-- Data for Name: public_columns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.public_columns (public_column_id, name, public_boards_id) FROM stdin;
1	New	1
2	In progress	1
3	testing	1
4	Done	1
\.


--
-- TOC entry 3054 (class 0 OID 16838)
-- Dependencies: 201
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (session_id, user_id, expiration_date, id) FROM stdin;
2a40b8de-9dd4-401b-aa1c-e21b977b72b3	1	2021-05-17 16:45:21.194524	1
23ce5ba0-fcd4-40a1-bccf-5924344b7d9f	1	2021-05-17 16:48:40.365916	2
24818e99-ef5d-432d-a92e-153868264da6	1	2021-05-17 16:48:44.28714	3
da6891ec-917e-4988-929c-88aa073daf2a	1	2021-05-17 16:48:45.846229	4
4ddf1414-062e-422d-aa13-dd7d6d299ef4	1	2021-05-17 16:48:47.25031	5
a6cc333f-6a92-404c-814b-3f7862546e4a	1	2021-05-17 16:48:48.624388	6
cf4f32a2-cf64-4b9b-b246-f72028983f71	1	2021-05-17 16:48:50.017468	7
6caebb00-a540-4ebe-9aa9-b2e71e6c4ab1	1	2021-05-17 16:48:51.345544	8
\.


--
-- TOC entry 3053 (class 0 OID 16833)
-- Dependencies: 200
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, password, login_email) FROM stdin;
1	$2b$12$YJQKN4EDvtSaDblS6949a.MH8hysifmXec32nKIvYMUxuU4POEABu	anna
\.


--
-- TOC entry 3082 (class 0 OID 0)
-- Dependencies: 211
-- Name: boards_board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.boards_board_id_seq', 1, false);


--
-- TOC entry 3083 (class 0 OID 0)
-- Dependencies: 212
-- Name: cards_card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cards_card_id_seq', 1, false);


--
-- TOC entry 3084 (class 0 OID 0)
-- Dependencies: 213
-- Name: columns_board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.columns_board_id_seq', 1, false);


--
-- TOC entry 3085 (class 0 OID 0)
-- Dependencies: 210
-- Name: public_boards_public_boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_boards_public_boards_id_seq', 5, true);


--
-- TOC entry 3086 (class 0 OID 0)
-- Dependencies: 214
-- Name: public_cards_public_cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_cards_public_cards_id_seq', 1, false);


--
-- TOC entry 3087 (class 0 OID 0)
-- Dependencies: 215
-- Name: public_columns_public_column_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_columns_public_column_id_seq', 1, false);


--
-- TOC entry 3088 (class 0 OID 0)
-- Dependencies: 209
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 8, true);


--
-- TOC entry 3089 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- TOC entry 2906 (class 2606 OID 16855)
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (board_id);


--
-- TOC entry 2910 (class 2606 OID 16878)
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (card_id);


--
-- TOC entry 2908 (class 2606 OID 16865)
-- Name: columns columns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.columns
    ADD CONSTRAINT columns_pkey PRIMARY KEY (column_id);


--
-- TOC entry 2912 (class 2606 OID 16891)
-- Name: public_boards public_boards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_boards
    ADD CONSTRAINT public_boards_pkey PRIMARY KEY (public_boards_id);


--
-- TOC entry 2916 (class 2606 OID 16909)
-- Name: public_cards public_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_cards
    ADD CONSTRAINT public_cards_pkey PRIMARY KEY (public_cards_id);


--
-- TOC entry 2914 (class 2606 OID 16896)
-- Name: public_columns public_columns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_columns
    ADD CONSTRAINT public_columns_pkey PRIMARY KEY (public_column_id);


--
-- TOC entry 2904 (class 2606 OID 16931)
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- TOC entry 2901 (class 2606 OID 16837)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2902 (class 1259 OID 16929)
-- Name: sessions_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX sessions_id_uindex ON public.sessions USING btree (id);


--
-- TOC entry 2918 (class 2606 OID 16856)
-- Name: boards boards_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 2920 (class 2606 OID 16879)
-- Name: cards cards_column_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_column_id_fkey FOREIGN KEY (column_id) REFERENCES public.columns(column_id);


--
-- TOC entry 2919 (class 2606 OID 16866)
-- Name: columns columns_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.columns
    ADD CONSTRAINT columns_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.boards(board_id);


--
-- TOC entry 2922 (class 2606 OID 16910)
-- Name: public_cards public_cards_public_column_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_cards
    ADD CONSTRAINT public_cards_public_column_id_fkey FOREIGN KEY (public_column_id) REFERENCES public.public_columns(public_column_id);


--
-- TOC entry 2921 (class 2606 OID 16897)
-- Name: public_columns public_columns_public_boards_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_columns
    ADD CONSTRAINT public_columns_public_boards_id_fkey FOREIGN KEY (public_boards_id) REFERENCES public.public_boards(public_boards_id);


--
-- TOC entry 2917 (class 2606 OID 16843)
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2021-04-17 20:04:51

--
-- PostgreSQL database dump complete
--

