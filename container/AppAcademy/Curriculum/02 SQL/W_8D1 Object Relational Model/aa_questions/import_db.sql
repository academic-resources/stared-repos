PRAGMA foreign_keys = ON;

DROP TABLE replies;
DROP TABLE question_follows;
DROP TABLE question_likes;
DROP TABLE questions;
DROP TABLE users;

CREATE TABLE users(
  id INTEGER PRIMARY KEY,
  fname TEXT NOT NULL,
  lname TEXT NOT NULL
);

CREATE TABLE questions(
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author_id INTEGER NOT NULL,

  FOREIGN KEY(author_id) REFERENCES users(id)
);

CREATE TABLE question_follows(
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,

  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(question_id) REFERENCES questions(id)
);

CREATE TABLE replies(
  id INTEGER PRIMARY KEY,
  question_id INTEGER NOT NULL,
  parent_id INTEGER,
  author_id INTEGER NOT NULL,
  body TEXT NOT NULL,

  FOREIGN KEY(question_id) REFERENCES questions(id),
  FOREIGN KEY(parent_id) REFERENCES replies(id),
  FOREIGN KEY(author_id) REFERENCES users(id)
);

CREATE TABLE question_likes(
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,

  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(question_id) REFERENCES questions(id)
);

INSERT INTO
  users (fname, lname)
VALUES
  ('Gordy', 'Cooper'),
  ('Oliver', 'Almalel'),
  ('Conley', 'Potter'),
  ('Bryce', 'Morgan'),
  ('David', 'Suon'),
  ('Jasmine', 'John'),
  ('Lisa', 'Steele'),
  ('Rich', 'Robinson'),
  ('John-Michael', 'Riley');

INSERT INTO
  questions (title, body, author_id)
VALUES
  ('Assessment', 'When is A03?', 1),
  ('Sky color', 'What is the color Sky?', 2),
  ('Chicken', 'Why did the chicken cross the road?', 2),
  ('Silly Question', 'Orange.', 7);

INSERT INTO 
  question_follows (user_id, question_id)
VALUES
  (3, 1),
  (4, 1),
  (5, 2),
  (6, 2),
  (6, 1),
  (7, 3),
  (8, 3),
  (9, 3);

INSERT INTO
  replies (question_id, parent_id, author_id, body)
VALUES
  (1, NULL, 7, 'I think next Monday...'),
  (1, 1, 8, 'Yes, and there is no practice version in class.'),
  (3, NULL, 5, 'She was afraid someone would caesar...'),
  (3, NULL, 9, 'To prove the opossum it could actually be done!'),
  (3, NULL, 6, 'To avoid lame and out data-ed jokes'),
  (2, NULL, 1, 'Don''t you mean: What is the color OF THE sky? smh, Oliver'),
  (2, 6, 2, 'No, I meant: color, Sky.'),
  (2, 7, 1, 'Who is Sky?');

INSERT INTO
  question_likes (user_id, question_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1),
  (6, 1),
  (7, 1),
  (8, 1),
  (9, 1),
  (2, 2),
  (5, 3),
  (7, 3),
  (8, 3),
  (9, 3);