# Subqueries

A _subquery_ is a query contained within another SQL statement. It's always enclosed within parentheses, and it is usually executed prior to the containing statement.

When the containing statement has finished executing, the data returned by any subqueries is discarded,m aking a subquery act like a temporary table with _statement scope_, meaning that the server frees up any memory allocated to the subquery.

Simple examples:

```sql
SELECT account_id, product_cd, cust_id, avail_balance
FROM account
WHERE account_id = (SELECT MAX(account_id) FROM account);
```

## Subquery Types

Some subqueries are completely self-contained (__noncorrelated or scalar subqueries__), while others reference columns from the containing statement (__correlated subqueries__).

### Noncorrelated/Scalar Subqueries

Executed __prior__ to the contaning statement.

```sql
SELECT account_id, product_cd, cust_id, avail_balance
FROM account
WHERE open_emp_id <> (SELECT e.emp_id
    FROM employee e INNER JOIN branch b
    ON e.assigned_branch_id = b.branch_id
    WHERE e.title = 'Head Teller' and b.city = 'Woburn'
);
```

```sql
SELECT emp_id, fname, lname, title
FROM employee
WHERE emp_id IN (SELECT superior_emp_id FROM employee);
```

```sql
SELECT emp_id, fname, lname, title
FROM employe
WHERE emp_id <> ALL (SELECT superior_em_id
    FROM employee
    WHERE superior_emp_id IS NOT NULL
);
```

```sql
SELECT account_id, cust_id, product_cd, avail_balance
FROM account
WHERE avail_balance < ANY (SELECT a.avail_balance
    FROM account a INNER JOIN individual i
    ON a.cust_id = i.cust_id
    WHERE i.fname = 'Frank' AND i.lname = 'Tucker'
);
```

```sql
SELECT account_id, product_cd, cust_id
FROM account
WHERE (open_branch_id, open_emp_id) IN
    (
        SELECT b.branch_id, e.emp_id
        FROM branch b INER JOIN employee e
        ON b.branch_id = e.assigned_branch_id
        WHERE b.name = 'Woburn Branch'
        AND (e.title = 'Teller' OR e.title = 'Head Teller')
    );
```

### Correlated Subqueries

It's dependent on the containing statement from which it references one or more columns. Thus, it is not executed prior to the containing statement, instead, the corelated subquery is executed once for each candidate row.

The following query, counts the number of account for each customer:
```sql
SELECT c.cust_id, c.cust_type_cd, c.city
FROM customer c
WHERE 2 = (
    SELECT COUNT(*)
    FROM account a
    where a.cust_id = c.cust_id
);
```

```sql
SELECT c.cust_id, c.cust_type_cd, c.city
FROM customer c
WHERE (
    SELECT SUM(a.avail_balance)
    FROM account a
    WHERE a.cust_id = c.cust_id
) BETWEEN 5000 and 10000;
```

#### Exists Operator

The following finds all accounts for which a transaction was posted no a particular day.

```sql
SELECT a.account_id, a.product_cd, a.cust_id, a.avail_balance
FROM account a
WHERE EXISTS (
    SELECT 1
    FROM transaction t
    WHERE t.account_id = a.account_id
        AND t.txt_date = '2008-09-22'
);
```

`EXISTS` simple checks whether the subquery returned any rows.

### Data Manipulation

```sql
UPDATE account a
SET a.last_activity_date = (
    SELECT MAX(t.txt_date)
    FROM transaction t
    WHERE t.account_id = a.account_id
);
```

```sql
DELETE FROM department d
WHERE NOT EXISTS (
    SELECT 1
    FROM employee e
    WHERE e.dept_id = d.dept_id
);
```

## When to use Subqueries

#### As Data Sources

```sql
SELECT d.dept_id, d.name, e_ctn.how_many num_employees
FROM department d INNER JOIN
(
    SELECT dept_id, COUNT (*) how_many
    FROM employee
    GROUP BY dept_id
) AS e_ctn
ON d.dept_id = e_ctn.dept_id;
```

```sql
SELECT groups.name, COUNT(*) num_customers
FROM
(
    SELECT SUM(a.avail_balance) cust_balance
    FROM account a INNER JOIN product p
    ON a.product_cd = p.product_cd
    WHERE p.product_type_cd = 'ACCOUNT'
    GROUP BY a.cust_id
) AS cust_rollup
INNER JOIN
(
    SELECT 'Small Fray' name, 0 low_limit, 4999.99 high_limit
    UNION ALL
    SELECT 'Avergage Joes' name, 5000, low_limit, 9999.99 high_limit
    UNION ALL
    SELECT 'Heavy Hitters' name, 10000 low_limit, 9999999.99 high_limit
) AS groups
ON cust_rollup.cust_balance BETWEEN groups.low_limit AND groups.high_limit
GROUP BY groups.name;
```

#### Task-oriented busqueries

Following quer sums all deposit account balances by account type, the employee that opened the accounts, and the branches at which the accounts were openned.
```sql
SELECT p.name product, b.name branch,
CONCAT (e.fname, ' ', e.lname) name,
SUM (a.avail_balance) tot_deposits
FROM account a INNER JOIN employee e
    ON a.open_emp_id = e.emp_id
    INNER JOIN branch b
    ON a.open_branch_id = b.branch_id
    INNER JOIN product p
    ON a.product_cd = p.product_cd
WHERE p.product_type_cd = 'ACCOUNT'
GROUP BY p.name, b.name, e.fname, e.lname
ORDER BY 1,2;
```

### Filter Conditions

Next query finds the employee responsible for opening the most accounts:
```sql
SELECT open_emp_id, COUNT(*) how_many
FROM account
GROUP BY open_emp_id
HAVING COUNT(*) = (
    SELECT MAX(emp_ctn.how_many)
    FROM (
        SELECT COUNT(*) how_many
        FROM account
        GROUP BY open_emp_id
    ) AS emp_ctn
);
```

### Expression Generators

```sql
SELECT
(
    SELECT p.name FROM product p
    WHERE p.product_cd = a.product_cd
        AND p.product_type_cd = 'ACCOUNT'
) product,
(
    SELECT b.name FROM branch b
    WHERE b.branch_id = a.open_branch_id
) branch,
(
    SELECT CONCAT(e.fname, ' ', e.lname) FROM employee e
    WHERE e.emp_id = a.open_emp_id
) name,
SUM (a.avail_balance) tot_deposits
FROM account a
GROUP BY a.product_cd, a.open_branch_id, a.open_emp_id
ORDER BY 1, 2;
```