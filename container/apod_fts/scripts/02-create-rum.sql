CREATE EXTENSION rum;

CREATE INDEX apod_tsv_idx ON apod USING rum (fts rum_tsvector_ops);