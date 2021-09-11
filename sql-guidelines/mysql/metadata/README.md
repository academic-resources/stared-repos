# Metadata

A database server also needs to store information about all of the database objects (tables, views, indexes, etc.) that were created to store this data.

## Data Dictionary

If you were to create a table with multiple columns, a primary key constraint, three indexes, and a foreign key constraints:

* Table name
* Table storage information (tablespace, initial size, etc)
* Storage engine
* Column names
* Column data types
* `NOT NULL` column constraints
* Primary key columns
* Primary key name
* Name of Primary Key index
* Index names
* Index types (B-tree, bitmap)
* Indexed columns
* Index column sort order (ASC or DESC)
* Index storage information
* Foreign key name
* Foreign key columns
* Associated table/columns for foreign keys

This data is collectively known as the __Data Dictionary__ or __System Catalog__.

Every database server uses a different mechanism to publish metadata.

MySQL's uses a special database, `information_schema`.

### `information_schema`

All of the objects available within `information_schema` database are _views_.

[Check the MySQL documentation to see all available views for each version](https://dev.mysql.com/doc/refman/5.7/en/information-schema.html).

The views can be queried, and thus, used programmatically.

```sql
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'bank'
ORDER BY 1;
```

If you are only interested in information about views...

```sql
SELECT table_name, is_updatable
FROM information_schema.views
WHERE table_schema = 'bank'
ORDER BY 1;
```

Column information for both tables are views is available via the `column` view.

```sql
SELECT column_name, data_type, character_maximum_length char_max_len, numeric_precision num_prcsn, numeric_scale num_scale
FROM information_schema.columns
WHERE table_schema = 'bank' AND table_name = 'account'
ORDER BY ordinal_position;
```

You can retrieve information about the different types of constraints (foreign key, primary key, unique) via the `information_schema.table_constraints` view.

```sql
SELECT constraint_name, table_name, constraint_type
FROM information_schema.table_constraints
WHERE table_schema = 'bank'
ORDER BY 3,1;
```

## Working with Metadata

### Schema Generation Scripts

Many projects take the "design-by-committee" approach, allowing multiple people to create database objects.

Although many tools generate scripts for you to create various tables, indexes, views, and so on, you can also query the `information_schema` views and generate the script yourself.

### Deployment Verification

After deployment/maintenance scripts have been run, it's a good idea to run a verification script to ensure that the new schema objets are in place with the appropriate columns, indexes, constraints, and so forth.

You can programmatically query the `information_schema.tables` to check the number of columns, indexes, constraints, and get deeper as needed.

### Dynamic SQL Generation

Most relational database servers, allow SQL statements to be submitted to the server as strings, rather than utilizing its SQL interface. This is generally known as _dynamic SQL execution_.

MySQL provides the statements `PREPARE`, `EXECUTE` and `DEALLOCATE` to allow for dynamic SQL execution.

```sql
SET @qry = 'SELECT cust_id, cust_type_cd, fed_id FROM customer';
/* Assigns a string to the variable */

PREPARE dynsql1 FROM @qry;
/* Databas eengine performs parsing, security checking and optimization */

EXECUTE dynsql1;
/* Query execution */

DEALLOCATE PREPARE dynsql1;
/* Frees any database resources, such as cursors, that have been utilized during execution */
```

You could execute a query that includes placeholders so that conditions can be specified at runtime:

```sql
SET @qry = 'SELECT product_cd, name, product_type_cd, data_offered, date_retired FROM product WHERE product_cd = ?';

PREPARE dynsql2 FROM @qry;

SET @prodcd = 'CHK';

EXECUTE dynsql2 USING @prodcd;
/* Query runs */

SET @prodcd = 'SAV';
EXECUTE dynsql2 USING @prodcd;
/* Query runs again with a different parameter */

DEALLOCATE PREPARE dynsql2;
```

What does this have to do with metadata?

Why not build the query string using metadata rather than hardcoding the table definition?

