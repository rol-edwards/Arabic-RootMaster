
create database arabic;

use arabic;

create table vocab (
	id serial PRIMARY KEY,
	arabic varchar(128) NOT NULL,
	english varchar(128) NOT NULL
	);

	
create table users (
	id serial PRIMARY KEY,
	username varchar(128) NOT NULL,
	password varchar(128) NOT NULL,
);

create table users_vocab (
	id serial PRIMARY KEY,
	user_id integer not null,
	word_id integer not null,
	score integer not null
);

/*
???
foreign key (user_id) references users(id),
foreign key (word_id) references vocab(id)
*/

