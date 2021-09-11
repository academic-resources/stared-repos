-- Create trigram extension
CREATE EXTENSION pg_trgm;

-- Create helper table
CREATE TABLE words AS SELECT word FROM
	ts_stat('SELECT to_tsvector(''simple'', title) || to_tsvector(''simple'', text) FROM apod');

CREATE INDEX words_idx ON words USING GIN (word gin_trgm_ops);