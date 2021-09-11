## RDBMS

- PostgreSQL
- Oracle
- MySQL
- SQL Server
- SQLite3

## Non-Relational DBMS

- MongoDB
- Cassandra
- Redis
- Memcache
- Neo4j

```sql
SELECT * FROM customers
WHERE country = 'Mexico' OR city = 'Paris'
ORDER BY country desc, ContactName;


SELECT * FROM customers
WHERE country = 'Mexico' OR city = 'Paris'
ORDER BY country desc, ContactName
LIMIT 5;

INSERT INTO Shippers (ShipperName, Phone)
VALUES ('Vincent Shipping', '212-555-5555');

UPDATE employees
SET Notes = 'was not born on new year', photo = 'N/A'
WHERE employeeId = 11;

DELETE FROM Employees WHERE employeeid = 11;

```

## Using Knex

- `npm i knex`
- `npm i sqlite3`
-
