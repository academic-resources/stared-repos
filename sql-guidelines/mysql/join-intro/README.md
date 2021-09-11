# Querying Multiple Tables

* Join (Cartesian Product)
* Inner Join
* Self Join
* Equi-Joins vs Non-Equi-Joins
* Join Conditions vs Filter Conditions

In the following examples we will try to retrieve data from both te `employee` and `department` tables.

### Join (Cartesian Product)

The easiest way:

```sql
SELECT e.fname, e.lname, d.name
FROM employee e JOIN department d;
```

Because the query didn't specify how the two tables should be joined, the database sever generated the _Cartesian_ product, which is _every_ permutation of the two tables (18 employees x 3 departments = 54 permutations).

## Inner Join

We need to describe how tables are related.

```sql
SELECT e.fname, e.lname, d.name
FROM employee e INNER JOIN department d
ON e.dept_id = d.dept_id;
```

```sql
SELECT e.fname, e.lname, d.name
FROM employee e INNER JOIN department d
USING (dept_id)
```

If a value exists for the `dept_id` column in one table but _not_ the other, then the join fails for the row containing that value and those rows are excluded from the result set.

## Joining Three or More Tables

```sql
SELECT a.account_id, c.fed_id, e.fname, e.lname
FROM account a INNER JOIN customer c
  ON a.cust_id = c.cust_id
  INNER JOIN employee e
    ON a.open_emp_id = e.emp_id
WHERE c.cust_type_cd = 'B';
```

You can switch the order and it will still work...

```sql
SELECT a.account_id, c.fed_id, e.fname, e.lname
FROM customer c INNER JOIN account a
  ON a.cust_id = c.cust_id
  INNER JOIN employee e
  ON a.open_emp_id = e.emp_id
WHERE c.cust_type_cd = 'B';
```

```sql
SELECT a.account_id, c.fed_id, e.fname, e.lname
FROM employee e INNER JOIN account a
  ON e.emp_id = a.open_emp_id
  INNER JOIN customer c
  ON a.cust_id = c.cust_id
WHERE c.cust_type_cd = 'B';
```

#### Does Join Order Matter?

Keep in mind that SQL is a __non-procedural language__, meaning that you describe what you want to retrieve and which database objects need to be involved, but it's up to the database server to determine how to best execute your query.

Using statistic gathered from your database objects, the server must pick one of three tables as a starting point (the chosen table is thereafter known as the __driving table__), and then decide in which order ot join the remaining tables.

> The order in which tables appear in your `FROM` clause is not significant.

If, however, you believe the tables in your query should always be joined in a particular order, you can place the tables in the desired order and specify it with a specific database server keyword, which in MySQL case is `STRAIGHT_JOIN`.

```sql
SELECT STRAIGHT_JOIN a.account_id, c.fed_id, e.fname, e.lname
FROM employee e INNER JOIN account a
  ON e.emp_id = a.open_emp_id
  INNER JOIN customer c
  ON a.cust_id = c.cust_id
WHERE c.cust_type_cd = 'B';
```

### Subqueries as Tables

```sql
SELECT a.account_id, a.cust_id, a.open_date, a.product_cd
FROM account a INNER JOIN
  (
    SELECT emp_id, assigned_branch_id
    FROM employee
    WHERE start_date < '2007-01-01'
      AND (title = 'Teller' OR title = 'Head Teller')
  ) e
  ON a.open_emp.id = e_emp_id
  INNER JOIN
    (
      SELECT branch_id
      FROM branch
      WHERE name = 'Woburn Branch' 
    ) b
    ON e.assigned_branch_id = b.branch_id;
```

### Using same table twice

```sql
SELECT a.account_id, e.emp_id, b_a.name AS open_branch, b_e.name AS emp_branch
FROM account a INNER JOIN branch b_a
  ON a.open_branch_id = b_a.branch_id
  INNER JOIN employee e
    ON a.open_emp_id = e.emp_id
    INNER JOIN branch b_e
      ON e.assigned_branch_id = b_e.branch_id
WHERE a.product_cd = 'CHK';
```

## Self Joins

You can actually join a table to itself. This is useful for example with self-referenceing foreign keys.

```sql
SELECT e.fname, e.lname, e_mgr.fname as mgr_fname, e.mgr.lname AS mgr_lname
FROM employee e INNER JOIN employee e e_mgr
ON e.superior_emp_id = e_mgr.emp_id;
```

## Equi-Joins Versus Non-Equi-Joins

All of the multi-table queries shown before have employed _equi-joins_, meaning that values from the two tables must match for the join to succeed.

An equi joins always employs an equal sign in the `ON` clause.

You can also join your tables via range of values, which are referred as _non-equi-joins_.

```sql
SELECT e.emp_id, e.fname, e.lname, e.start_date
FROM empployee e INNER JOIN product p
  ON e.start_date >= p.date_offered
  AND e.start_date <= p.date_retired
WHERE p.name = 'no-fee checking';
```

This _non-equi-joins_ queries, can join tables that have no foreign key relationships. The intent is to find all employees who began workin for the bank while the No-Fee Checking produt was being offered.

Suppose we want to make pairs for a tournament.

```sql
SELECT e1.fname, e1.lname, 'VS' vs, e2.fname, e2.lname
FROM employee e1 INNER JOIN employee e2
  ON e1.emp_id < e2.emp_id
WHERE e1.title = 'Teller' AND e2.title = 'Teller';
```

## Join Conditions versus Filter Conditions

All the following variants yield the same results, it will be up to you to put your conditions in the proper place so that your queries are easy to understand and maintain.

```sql
SELECT a.account_id, a.product_cd, c.fed_id
FROM account a INNER JOIN customer c
  ON a.cust_id = c.cust_id
WHERE c.cust_type_cd = 'B';
```

```sql
SELECT a.account_id, a.product_cd, c.fed_id
FROM account a INNER JOIN customer c
  ON a.cust_id = c.cust_id
    AND c.cust_type_cd = 'B';
```

(ANSI Syntax example)
```sql
SELECT a.account_id, a.product_cd, c.fed_id
FROM account a INNER JOIN customer c
WHERE a.cust_id = c.cust_id
  AND c.cust_type_cd = 'B';
```