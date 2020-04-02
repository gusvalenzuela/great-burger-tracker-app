DROP DATABASE IF EXISTS `burgers_db`;

### Schema

CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
    date_created DATETIME DEFAULT NOW(),
    date_eaten DATETIME,
	PRIMARY KEY (id)
);

