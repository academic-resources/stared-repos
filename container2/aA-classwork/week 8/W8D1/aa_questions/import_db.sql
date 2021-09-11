PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS question_follows;

DROP TABLE IF EXISTS replies;

DROP TABLE IF EXISTS question_likes;

DROP TABLE IF EXISTS questions;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL
);

CREATE TABLE questions (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    author_id INTEGER NOT NULL REFERENCES users (id)
);

CREATE TABLE question_follows (
    id INTEGER PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions (id),
    user_id INTEGER NOT NULL REFERENCES users (id)
);

CREATE TABLE replies (
    id INTEGER PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions (id),
    user_id INTEGER NOT NULL REFERENCES users (id),
    parent_id INTEGER REFERENCES replies (id),
    body TEXT NOT NULL
);

CREATE TABLE question_likes (
    id INTEGER PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions (id),
    user_id INTEGER NOT NULL REFERENCES users (id)
);

INSERT INTO users (fname, lname)
        VALUES ('JM', 'Riley'), ('Rich', 'Robinson'), ('Albert', 'Einstein');
INSERT INTO questions (title, body, author_id)
        VALUES ('How do arrays work?', 'BLAHBLAH', 1), ('Why am I so confused?', 'HEY', 2), ('What is the speed of light?', 'Trick Question', 3);
INSERT INTO question_likes (question_id, user_id)
        VALUES (1, 1), (1, 2), (2, 3);
INSERT INTO question_follows (question_id, user_id)
        VALUES (1, 3), (3, 1), (2, 2), (1, 2);
INSERT INTO replies (question_id, user_id, parent_id, body)
        VALUES (1, 3, NULL, 'This is user 3''s response to question 1'), (1, 2, 1, 'This is user 2 responding to user 1''s reply');
