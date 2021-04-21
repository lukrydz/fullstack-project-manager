create table if not exists users
(
	user_id serial not null
		constraint users_pkey
			primary key,
	password varchar(72) not null,
	login_email varchar(30) not null
);

alter table users owner to postgres;

create table if not exists sessions
(
	session_id varchar(140) not null,
	user_id integer not null
		constraint sessions_user_id_fkey
			references users,
	expiration_date timestamp not null,
	id serial not null
		constraint sessions_pk
			primary key
);

alter table sessions owner to postgres;

create unique index if not exists sessions_id_uindex
	on sessions (id);

create table if not exists boards
(
	board_id serial not null
		constraint boards_pkey
			primary key,
	archived boolean,
	user_id integer not null
		constraint boards_user_id_fkey
			references users,
	name varchar(20)
);

alter table boards owner to postgres;

create table if not exists columns
(
	board_id serial not null
		constraint columns_board_id_fkey
			references boards,
	name varchar(20),
	column_id integer not null
		constraint columns_pkey
			primary key
);

alter table columns owner to postgres;

create table if not exists cards
(
	card_id serial not null
		constraint cards_pkey
			primary key,
	name varchar(120) not null,
	column_id integer not null
		constraint cards_column_id_fkey
			references columns,
	archived boolean not null,
	"order" integer not null
);

alter table cards owner to postgres;

create table if not exists public_boards
(
	public_boards_id serial not null
		constraint public_boards_pkey
			primary key,
	name varchar(120)
);

alter table public_boards owner to postgres;

create table if not exists public_columns
(
	public_column_id serial not null
		constraint public_columns_pkey
			primary key,
	name varchar(20),
	public_boards_id integer not null
		constraint public_columns_public_boards_id_fkey
			references public_boards
				on delete cascade
);

alter table public_columns owner to postgres;

create table if not exists public_cards
(
	public_cards_id serial not null
		constraint public_cards_pkey
			primary key,
	name varchar(50),
	public_column_id integer not null
		constraint public_cards_public_column_id_fkey
			references public_columns
				on delete cascade,
	"order" integer
);

alter table public_cards owner to postgres;

