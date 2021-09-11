"""Wrapper around psycopg2.

Database connection provides regular DB-API 2.0 interface.

Connection object methods::

    .cursor()

    .commit()

    .rollback()

    .close()

Cursor methods::

    .execute(query[, args])

    .fetchone()

    .fetchall()


Sample usage::

    db = self.get_database('somedb')
    curs = db.cursor()

    # query arguments as array
    q = "select * from table where id = %s and name = %s"
    curs.execute(q, [1, 'somename'])

    # query arguments as dict
    q = "select id, name from table where id = %(id)s and name = %(name)s"
    curs.execute(q, {'id': 1, 'name': 'somename'})

    # loop over resultset
    for row in curs.fetchall():

        # columns can be asked by index:
        id = row[0]
        name = row[1]

        # and by name:
        id = row['id']
        name = row['name']

    # now commit the transaction
    db.commit()
"""

import psycopg2
import psycopg2.extensions
import psycopg2.extras
from psycopg2 import Error as DBError

__all__ = (
    'connect_database', 'DBError', 'I_AUTOCOMMIT', 'I_READ_COMMITTED',
    'I_REPEATABLE_READ', 'I_SERIALIZABLE',
)

#: Isolation level for db.set_isolation_level()
I_AUTOCOMMIT = psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT

#: Isolation level for db.set_isolation_level()
I_READ_COMMITTED = psycopg2.extensions.ISOLATION_LEVEL_READ_COMMITTED

#: Isolation level for db.set_isolation_level()
I_REPEATABLE_READ = psycopg2.extensions.ISOLATION_LEVEL_REPEATABLE_READ

#: Isolation level for db.set_isolation_level()
I_SERIALIZABLE = psycopg2.extensions.ISOLATION_LEVEL_SERIALIZABLE


def connect_database(connstr):
    """Create a db connection with DictCursor.
    """
    db = psycopg2.connect(connstr, cursor_factory=psycopg2.extras.DictCursor)
    return db

