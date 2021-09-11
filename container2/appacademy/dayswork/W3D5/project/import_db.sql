DROP TABLE IF EXISTS cattoys;
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS toys;

CREATE TABLE cats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(50) NOT NULL,
  breed VARCHAR(50) NOT NULL
);

CREATE TABLE toys (
  id SERIAL PRIMARY KEY,
  price NUMERIC(10,2) NOT NULL,
  color VARCHAR(50),
  name VARCHAR(50) NOT NULL
);

CREATE TABLE cattoys (
  id SERIAL PRIMARY KEY,
  cat_id INTEGER REFERENCES cats(id),
  toy_id INTEGER REFERENCES toys(id)
);

INSERT INTO cats (name, color, breed)
VALUES ('Oscar', 'White', 'American Curl');

INSERT INTO cats (name, color, breed)
VALUES ('Sam', 'Brown', 'Asian');

INSERT INTO cats (name, color, breed)
VALUES ('Coco', 'White', 'Bengal');

INSERT INTO cats (name, color, breed)
VALUES ('Milo', 'Black', 'American Curl');

INSERT INTO cats (name, color, breed)
VALUES ('Tigger', 'Orange', 'Animated');

INSERT INTO toys (price, color, name)
VALUES (5.55, 'Blue', 'Ball');

INSERT INTO toys (price, color, name)
VALUES (20.00, 'Beige', 'Scratching Post');

INSERT INTO toys (price, color, name)
VALUES (15.99, 'Grey', 'Robotic Mouse');

INSERT INTO toys (price, color, name)
VALUES (11.26, 'Orange', 'Pet Tower');

INSERT INTO toys (price, color, name)
VALUES (20.00, 'Puruple', 'Cat Dancer');

INSERT INTO cattoys
  (cat_id, toy_id)
VALUES (1,2);

INSERT INTO cattoys
  (cat_id, toy_id)
VALUES (3,4);

INSERT INTO cattoys
  (cat_id, toy_id)
VALUES (5,3);

INSERT INTO cattoys
  (cat_id, toy_id)
VALUES (4,5);

INSERT INTO cattoys
  (cat_id, toy_id)
VALUES (1,4);

