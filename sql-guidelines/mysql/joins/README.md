# Joins

Joins revisited section, please see first [Joins Introduction](../join-intro).

## Outer Joins

Some rows in one table or the other can be left out of the result set if no match is found.

For example, see the business table only has a few customer accounts associated:

```sql
SELECT cust_id, name
FROM business
```

So if we do a inner join (default join), some accounts will be left out:

```sql
SELECT a.account_id, b.cust_id, b.name
FROM account a INNER JOIN business b
ON a.cust_id = b.cust_id;
```

But what if you want your query to return _all_ the accounts, but to include the business name noly if the acount is linked to a business customer?

```sql
SELECT a.account_id, a.cust_id, b.name
FROM account a LEFT OUTER JOIN business b
ON a.cust_id = b.cust_id;
```

### Left vs Right Outer Joins

This way we include all customers even if they don't have a match with business
```sql
SELECT c.cust_id, b.name
FROM customer c LEFT OUTER JOIN business b
ON c.cust_id = b.cust_id;
```

This way we include all business
```sql
SELECT c.cust_id, b.name
FROM customer c RIGHT OUTER JOIN business b
ON c.cust_id = b.cust_id;
```

### Three Way Outer Joins

You may want to outer-join one table with two other tables.
```sql
SELECT a.account_id, a.product_cd,
CONCAT(i.fname, ' ', i.lname) person_name,
b.name business_name
FROM account a LEFT OUTER JOIN individual i
ON a.cust_id = i.cust_id
LEFT OUTER JOIN business b
ON a.cust_id = b.cust_id;
```

## Self Outer Joins

We previously saw the concept of the __Self-Join__, where a table is joined to itself.

In this self-join example, employee table is joined to itself, to generate a list of employees and their supervisors:
```sql
SELECT e.fname, e.lname, e_mgr.fname mgr_fname, e_mgr.lname mgr_lname
FROM employee e INNER JOIN employee e_mgr
ON e.superior_emp_id = e_mgr.emp_id;
```

The small issues is that employees who don't have a supervisor are left out of the result set. Let's fix that!
```sql
SELECT e.fname, e.lname, e_mgr.fname mgr_name, e_mgr.lname mrg_lname
FROM eployee e LEFT OUTER JOIN employee e_mgr
ON e.superior_emp_id = e_mgr.emp_id;
```

## Cross Joins

Generate the Cartesion product of both tables.
```sql
SELECT pt.name, p.product_cd, p.name
FROM product p CROSS JOIN product_type pt;
```

## Natural Joins

This type of join allows you to name the tables to be joined but lets the database server determine what the join conditions need to be. Known as the _natural_ join, this join type relies on identical column names across multiple tables to infer the proper join conditions.

```sql
SELECT a.account_id, a.cust_id, c.cust_type_cd, c.fed_id
FROM account a NATURAL JOIN customer c;
```

Server will inspect the table definitions and add a join condition `a.cust_id = c.cust_id` to join the two tables.