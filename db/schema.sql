DROP DATABASE IF EXISTS `burgers_db`;

### Schema

CREATE DATABASE burgers_db;

USE burgers_db;

DROP TABLE if exists confirmations;

DROP TABLE if exists burgers;

CREATE TABLE burgers
(
	id int AUTO_INCREMENT NOT NULL,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
    createdAt TIMESTAMP NOT NULL,
    date_eaten DATETIME,
	PRIMARY KEY (id)
);

CREATE TABLE confirmations (
	id int AUTO_INCREMENT NOT NULL,
	confirm_name varchar(255) NOT NULL,
	enabled BOOLEAN default true,
	createdAt TIMESTAMP NOT NULL,

	PRIMARY KEY (id)
);


