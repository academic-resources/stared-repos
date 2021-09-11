CREATE TABLE menus(menuid int, dish varchar(255), price varchar(255), restaurantid varchar(255));

CREATE TABLE restaurants(restaurantid int, name varchar(255), address varchar(255), city varchar(255), state varchar(255), telephone varchar(255));

DELETE FROM menus;

DELETE FROM restaurants;

INSERT INTO restaurants(restaurantid, name, address, city, state, telephone)
    VALUES (1, 'Apple', '123 Main Street', 'City', 'ST', '555-555-1234'),
           (2, 'Eagle Cafe', '321 Uptown Drive', 'Town', 'ST', '555-555-5555'),
           (3, 'Number 1 Eats', '565 Side Avenue', 'Village', 'ST', '555-123-5555');

INSERT INTO menus(menuid, dish, price, restaurantid)
    VALUES (1, 'Mac and Cheese', 6.95, 1),
           (2, 'Lasagna',8.50, 1),
           (3, 'Meatloaf', 7.95, 1),
           (4, 'Tacos', 10.49, 1),
           (5, 'Chef Salad', 6.95, 1),
           (6, 'Mashed Potatoes', 5.95, 2),
           (7, 'Spaghetti', 11.95, 2),
           (8, 'Salmon', 8.95, 2),
           (9, 'Barbacoa', 12.75, 2),
           (10, 'Pizza', 14.95, 3),
           (11, 'Fish and Chips', 8.95, 3),
           (12, 'Hamburger and Fries', 9.95, 3),
           (13, 'Pancakes',8.95, 3),
           (14, 'Salad', 5.95, 3);

ALTER sequence hibernate_sequence restart with 20;