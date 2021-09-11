
NEWS
====

Skytools 3.7.3 (2021-08-03)
---------------------------

Fixes:

* Allow binary I/O in copy_expert signature.

Skytools 3.7.2 (2021-07-06)
---------------------------

Fixes:

* Avoid psycopg copy_from, not usable in v2.9

Skytools 3.7.1 (2021-06-08)
---------------------------

Fixes:

* quoting: drop obsolete keywords from quote_ident
* quoting: add COL_NAME_KEYWORDs into quote_ident list
* querybuilder: use dbdict more consistently

Cleanups:

* basetypes: tune Protocol classes
* tests: avoid 'pointless-statement'
* sqltools: annotate dbdict
* checker: use 'with' with files
* modules: add .pyi annotations


Skytools 3.7 (2021-05-17)
-------------------------

Features:

* config: config_format=2 switches to extended format.
* querybuilder: alt SQL for missing value.
* querybuilder: handle more value types in inline queries.
* querybuilder/plpy: always use prepared plan.  Prevously when GD/SD
  was not given, it switched to inline params, but that was problem
  because inline value quoting may be different that PL/Python's.
  Now it always uses plpy.prepare.

Cleanups:

* querybuilder: switch to functools.lru_cache, instead local LRU.
* querybuilder: use regex for parsing, gives cleaner code.
* querybuilder: improve error handling
* natsort: switch to string key, instead of tuple.
* style: Add type annotations to most modules.
* style: use new-style super() everywhere.
* ci: drop win32 repack, abi3 is now supported on win32
* ci: drop ubuntu 16.04, to be obsoleted.
* ci: build wheels using manylinux2014 images.

Skytools 3.6.1 (2020-09-29)
---------------------------

Fixes:

* scripting: Do not set .my_name on connection,
  does not work on plain Psycopg connection.

* cquoting: Work around pypy3 PyBytes_Check bug.

* modules: Use multiphase init.

Skytools 3.6 (2020-08-11)
-------------------------

Feature removal:

* Remove ancient compat code from psycopgwrapper:

  - dict* and iter* methods
  - getattr access to fields.
  - Keepalive tuning from connect_database().
    That is built-in to libpq since 9.0.
  - Require psycpopg 2.5+

Cleanups:

* Switch C modules to use stable ABI only (abi3).
* Remove Debian packaging.
* Upgrade apipkg to 1.5.
* Remove Py2 compat.

Skytools 3.5 (2020-07-18)
-------------------------

Fixes:

* dbservice: py3 fix for row.values()
* skylog: Use logging.setLogRecordFactory for adding extra fields
* fileutil,sockutil: fixes for win32.
* natsort: py3 fix, improve rules.

Cleanups:

* Set up Github Actions for CI and release.
* Use "with" for opening files.
* Drop py2 syntax.
* Code reformat.
* Convert nose+doctests to pytest.

Skytools 3.4 (2019-11-14)
-------------------------

* Support Postgres 10 sequences
* Make full_copy text-based
* Allow None fields in magic_insert
* Fix iterator use in magic insert
* Fix Python3 bugs
* Switch off Python2 tests, to avoid wasting time.

Skytools 3.3 (2017-09-21)
-------------------------

* Separate 'skytools' module out from big package
* Python 3 support

Skytools 3.2 and older
----------------------

See old changes here:
https://github.com/pgq/skytools-legacy/blob/master/NEWS

