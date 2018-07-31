
create database arabic;

use arabic;

create table vocab (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	arabic varchar(128) NOT NULL,
	english int(11) NOT NULL,
	)
	
create table users (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username varchar(128) NOT NULL,
	password varchar(128) NOT NULL,
)

create table users_vocab (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id,
	word_id,
	score int(11) NOT NULL;
)

foreign key (user_id) references users(id),
foreign key (word_id) references vocab(id)

