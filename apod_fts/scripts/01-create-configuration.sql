-- Create dictionaries modules
CREATE EXTENSION hunspell_en_us;
CREATE EXTENSION hunspell_ru_ru;
CREATE EXTENSION ts_parser;

CREATE TEXT SEARCH CONFIGURATION apod_conf (parser=ts_parser);
ALTER TEXT SEARCH CONFIGURATION apod_conf
	ADD MAPPING FOR email, file, float, host, hword_numpart, int,
	numhword, numword, sfloat, uint, url, url_path, version
	WITH simple;
ALTER TEXT SEARCH CONFIGURATION apod_conf
	ALTER MAPPING FOR asciiword, asciihword, hword_asciipart WITH english_hunspell, english_stem;
ALTER TEXT SEARCH CONFIGURATION apod_conf
	ALTER MAPPING FOR hword, hword_part, word WITH russian_hunspell, russian_stem;

-- Add tsvector column
ALTER TABLE apod ADD COLUMN fts tsvector;
UPDATE apod SET fts =
	setweight(to_tsvector('apod_conf', coalesce(title,'')), 'A') ||
	setweight(to_tsvector('apod_conf', coalesce(text, '')), 'B');

CREATE FUNCTION apod_trigger()
RETURNS trigger as $$
BEGIN
  new.tsv :=
    setweight(to_tsvector('apod_conf', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('apod_conf', coalesce(new.text, '')), 'B');
  RETURN new;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER apod_fts_update BEFORE INSERT OR UPDATE
	ON apod FOR EACH ROW EXECUTE procedure apod_trigger();
