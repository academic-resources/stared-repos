
Skytools - Utilities for writing Python scripts
===============================================

This is the low-level utility module split out from
old Skytools meta-package.  It contains various
utilities for writing database scripts.

Database specific utilites are mainly meant for PostgreSQL.

Features
--------

* Support for background scripts
  - Daemonizing
  - logging
  - config parsing
* Database tools
  - Tuned connection
  - DB structure examining
  - SQL parsing
  - COPY I/O
* Time utilities
  - ISO timestamp parsing
  - datetime to timestamp
* Text utilities
  - Natural sort
  - Fast urlencode I/O

TODO
----

* Move from optparse to argparse
* Doc cleanup

