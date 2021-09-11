DROP TABLE cattoys;
DROP TABLE cats;
DROP TABLE toys;

CREATE TABLE cats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(255),
  breed VARCHAR(255)
);

CREATE TABLE toys (
  id SERIAL PRIMARY KEY,
  price FLOAT,
  color VARCHAR(255),
  name VARCHAR(255) NOT NULL
);

CREATE TABLE cattoys (
  cat_id INTEGER REFERENCES cats(id),
  toy_id INTEGER REFERENCES toys(id)
);

INSERT INTO cats (
  name, color, breed
)
VALUES (
  'Fuzzy', 'black', 'Siamese'
),

(
  'Eli', 'brown', 'Maine Coon'
),

(
  'Snowball', 'white', 'Ragdoll'
),

(
  'Mother Russia', 'blue', 'Russian Blue'
),

(
  'Midnight', 'black', 'Burmese'
);


INSERT INTO toys (
  price, color, name
)
VALUES (
  5.99, 'green', 'Catnip Ball'
),

(
  1.99, 'blue', 'Rope'
),

(
  2.99, 'white', 'Cardboard Box'
),

(
  9.99, 'blue', 'Frisky Flyer'
),

(
  7.99, 'gray', 'Mecha Mouse'
);

INSERT INTO cattoys(
    cat_id, toy_id
)
VALUES (
  1, 3
),
(
  2, 1
),
(
  3, 2
),
(
  4, 5
),
(
  5, 4
);