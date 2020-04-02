INSERT INTO burgers (burger_name, date_created) VALUES ('Gooder Burger Jr.', NOW());
INSERT INTO burgers (burger_name, date_eaten, devoured) VALUES ('Great Burger', SUBDATE(NOW(), 2), true);
INSERT INTO burgers (burger_name, date_eaten, devoured) VALUES ('Triple Great Burger Jr.', SUBTIME(NOW(), 15000), true);

SELECT * FROM burgers;