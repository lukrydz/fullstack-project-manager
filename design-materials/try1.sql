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


insert into public.users (user_id, password, login_email) values (1, '$2b$12$YJQKN4EDvtSaDblS6949a.MH8hysifmXec32nKIvYMUxuU4POEABu', 'anna');
insert into public.users (user_id, password, login_email) values (2, '$2b$12$cqoH935FrJQo.sEoPFmXsOHuYQTa1XyYIw0OEa20B3YGaiB80ERcC', 'arnold@arnold.pl');

insert into public.sessions (session_id, user_id, expiration_date, id) values ('2a40b8de-9dd4-401b-aa1c-e21b977b72b3', 1, '2021-05-17 16:45:21.194524', 1);
insert into public.sessions (session_id, user_id, expiration_date, id) values ('23ce5ba0-fcd4-40a1-bccf-5924344b7d9f', 1, '2021-05-17 16:48:40.365916', 2);
insert into public.sessions (session_id, user_id, expiration_date, id) values ('24818e99-ef5d-432d-a92e-153868264da6', 1, '2021-05-17 16:48:44.287140', 3);
insert into public.sessions (session_id, user_id, expiration_date, id) values ('da6891ec-917e-4988-929c-88aa073daf2a', 1, '2021-05-17 16:48:45.846229', 4);
insert into public.sessions (session_id, user_id, expiration_date, id) values ('4ddf1414-062e-422d-aa13-dd7d6d299ef4', 1, '2021-05-17 16:48:47.250310', 5);
insert into public.sessions (session_id, user_id, expiration_date, id) values ('a6cc333f-6a92-404c-814b-3f7862546e4a', 1, '2021-05-17 16:48:48.624388', 6);
insert into public.sessions (session_id, user_id, expiration_date, id) values ('cf4f32a2-cf64-4b9b-b246-f72028983f71', 1, '2021-05-17 16:48:50.017468', 7);
insert into public.sessions (session_id, user_id, expiration_date, id) values ('6caebb00-a540-4ebe-9aa9-b2e71e6c4ab1', 1, '2021-05-17 16:48:51.345544', 8);
insert into public.sessions (session_id, user_id, expiration_date, id) values ('d2570946-11d9-4bb5-b10f-befd83fb7af7', 2, '2021-05-18 19:42:04.777567', 9);

insert into public.boards (board_id, archived, user_id, name) values (1, false, 1, 'Anna''s Board 1');
insert into public.boards (board_id, archived, user_id, name) values (2, false, 1, 'Anna''s board 2');

insert into public.public_boards (public_boards_id, name) values (2, 'Board 2');
insert into public.public_boards (public_boards_id, name) values (3, 'newboard');
insert into public.public_boards (public_boards_id, name) values (4, 'newboard');
insert into public.public_boards (public_boards_id, name) values (5, 'newboard');
insert into public.public_boards (public_boards_id, name) values (6, 'newboard');
insert into public.public_boards (public_boards_id, name) values (1, 'updated');

insert into public.public_columns (public_column_id, name, public_boards_id) values (2, 'In progress', 1);
insert into public.public_columns (public_column_id, name, public_boards_id) values (3, 'testing', 1);
insert into public.public_columns (public_column_id, name, public_boards_id) values (4, 'Done', 1);
insert into public.public_columns (public_column_id, name, public_boards_id) values (5, 'new column', 1);
insert into public.public_columns (public_column_id, name, public_boards_id) values (1, 'updated', 1);

insert into public.public_cards (public_cards_id, name, public_column_id, "order") values (2, 'second row', 1, 2);
insert into public.public_cards (public_cards_id, name, public_column_id, "order") values (3, 'third row', 1, 3);
insert into public.public_cards (public_cards_id, name, public_column_id, "order") values (4, 'new card', 1, 4);
insert into public.public_cards (public_cards_id, name, public_column_id, "order") values (1, 'updated', 1, 1);