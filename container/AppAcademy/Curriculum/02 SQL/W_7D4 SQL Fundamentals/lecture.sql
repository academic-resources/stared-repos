DROP TABLE IF EXISTS app_academy;
CREATE TABLE app_academy(
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  pod_leader_id INTEGER
);

ALTER TABLE app_academy
ALTER COLUMN name text;

\! ECHO "Created App Academy Table"

INSERT INTO
  app_academy (id, name, pod_leader_id)
VALUES
  (1, 'Andy W.', NULL);

INSERT INTO #repeat


SELECT
  name
FROM
  app_academy;
