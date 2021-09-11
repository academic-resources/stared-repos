[![Postgres Professional](static/PGpro-logo.png)](https://postgrespro.com/)

# apod_fts
PostgreSQL full text search example. Site [tsdemo.postgrespro.ru](http://tsdemo.postgrespro.ru/).

# Modules
* [ts_json](modules/ts_json) provides functions to full text search with json and jsonb.
* [ts_parser](modules/ts_parser) is the modified default text search parser from
PostgreSQL 9.6.

# Installing
`apod_fts` is a web-application written in Python using flask web-framework. To run this application
you need to install `Flask` and `psycopg2` Python packages.

It is necessary that PostgreSQL binaries are in PATH environment. To install all text search dictionaries and RUM index you can use scripts in script directory. Use the following commands

```
=> cd apod_fts
=> createdb apod
=> psql apod < scripts/apod.dump
=> chmod +x scripts/01-create-configuration.sh
=> scripts/01-create-configuration.sh
=> chmod +x scripts/02-create-rum.sh
=> scripts/02-create-rum.sh
=> chmod +x scripts/03-fuzzy-hints.sh
=> scripts/03-fuzzy-hints.sh
```
