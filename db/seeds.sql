
INSERT INTO burgers (burger_name, date_created) VALUES ('Double Quarter Pounder Deluxe', NOW());
INSERT INTO burgers (burger_name, date_created) VALUES ('Spicy Chicken Sandwich', NOW());
INSERT INTO burgers (burger_name, date_created) VALUES ('Bacon Cheeseburger', NOW());
INSERT INTO burgers (burger_name, date_created) VALUES ('Mushroom Double Gooder Burger w/o Mayo, Tomatoes', NOW());
INSERT INTO burgers (burger_name, date_created) VALUES ('Exxtreme Burgah', NOW());
INSERT INTO burgers (burger_name, date_created) VALUES ('Gooder Burger Jr.', NOW());
INSERT INTO burgers (burger_name, date_eaten, devoured) VALUES ('Great Burger', SUBDATE(NOW(), 2), true);
INSERT INTO burgers (burger_name, date_eaten, devoured) VALUES ('Triple Great Burger', SUBDATE(NOW(), 1), true);

SELECT * FROM burgers;