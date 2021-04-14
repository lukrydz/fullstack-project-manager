CREATE TABLE public.users
(
    user_id integer NOT NULL,
    password character varying(20) COLLATE pg_catalog."default" NOT NULL,
    login_email character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

CREATE TABLE public.sessions
(
    session_id integer NOT NULL,
    user_id integer NOT NULL,
    expiration_date date NOT NULL,
    CONSTRAINT sessions_pkey PRIMARY KEY (session_id),
    CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.sessions
    OWNER to postgres;

CREATE TABLE public.boards
(
    board_id integer NOT NULL,
    archived boolean,
    user_id integer NOT NULL,
    name character varying(20)[] COLLATE pg_catalog."default",
    CONSTRAINT boards_pkey PRIMARY KEY (board_id),
    CONSTRAINT boards_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.boards
    OWNER to postgres;


CREATE TABLE public.columns
(
    board_id integer NOT NULL,
    name character varying(20) COLLATE pg_catalog."default",
    column_id integer NOT NULL,
    CONSTRAINT columns_pkey PRIMARY KEY (column_id),
    CONSTRAINT columns_board_id_fkey FOREIGN KEY (board_id)
        REFERENCES public.boards (board_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.columns
    OWNER to postgres;



CREATE TABLE public.cards
(
    card_id integer NOT NULL,
    name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    column_id integer NOT NULL,
    archived boolean NOT NULL,
    "order" numeric NOT NULL,
    CONSTRAINT cards_pkey PRIMARY KEY (card_id),
    CONSTRAINT cards_column_id_fkey FOREIGN KEY (column_id)
        REFERENCES public.columns (column_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.cards
    OWNER to postgres;    

CREATE TABLE public.public_boards
(
    public_boards_id integer NOT NULL,
    name character varying(20)[] COLLATE pg_catalog."default",
    CONSTRAINT public_boards_pkey PRIMARY KEY (public_boards_id)
)

TABLESPACE pg_default;

ALTER TABLE public.public_boards
    OWNER to postgres;


CREATE TABLE public.public_columns
(
    public_column_id integer NOT NULL,
    name character varying(20) COLLATE pg_catalog."default",
    public_boards_id integer NOT NULL,
    CONSTRAINT public_columns_pkey PRIMARY KEY (public_column_id),
    CONSTRAINT public_columns_public_boards_id_fkey FOREIGN KEY (public_boards_id)
        REFERENCES public.public_boards (public_boards_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.public_columns
    OWNER to postgres;

CREATE TABLE public.public_cards
(
    public_cards_id integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    public_column_id integer NOT NULL,
    "order" numeric,
    CONSTRAINT public_cards_pkey PRIMARY KEY (public_cards_id),
    CONSTRAINT public_cards_public_column_id_fkey FOREIGN KEY (public_column_id)
        REFERENCES public.public_columns (public_column_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.public_cards
    OWNER to postgres;    