# Conditional Logic

Conditional Logic is simple the ability to take one of several paths during program execution.

For example, when querying customer information, you might want to retrieve either fname/lname columns from the individual table or the name column from the business table depending on what type of customer is encountered.

With an Outer Join you could return both strings and let the caller figure out which one to use:
```sql
SELECT c.cust_id, c.fed_id, c.cust_type cd,
CONCAT(i.fname, ' ', i.lname) indiv_name,
b.name business_name
FROM customer c LEFT OUTER JOIN individual i
ON c.cust_id = i.cust_id
LEFT OUTER JOIN business b
ON c.cust_id = b.cust_id;
```

However, you could use conditional logic via a _case expression_ to determine the type of customer and return the appropriate string, as in:

```sql
SELECT c.cust_id, c.fed_id,
CASE
	WHEN c.cust_type_cd = 'I'
		THEN CONCAT(i.fname, ' ', i.lname)
	WHEN c.cust_type_cd = 'B'
		THEN b.name
	ELSE 'Unknown'
END name
FROM customer c LEFT OUTER JOIN individual i
ON c.cust_id = i.cust_id
LEFT OUTER JOIN business b
ON c.cust_id = b.cust_id;
```

## Case Expression

Major database servers include built-in functions  designed to mimic the if-then-else statement. MySQL's includes `if()` function.

CASE expressions have two advantages over built-in functions:
* `CASE` expression is part of the SQL standard and has been implemented by most vendors.
* Case expressions are built into the SQL grammar and can be included inside clauses

## Searched Case Expressions

```sql
CASE
WHEN employee.title = 'Head Teller'
THEN 'Head Teller'
WHEN employee.title = 'Teller'
AND YEAR(employee.start_date) > 2007
THEN 'Teller Trainee'
WHEN employee.title = 'Teller'
AND YEAR(employee.start_date) < 2006
THEN 'Experienced Teller'
WHEN employee.title = 'Teller'
THEN 'Teller'
ELSE 'Non-Teller'
END
```

Take in mind that expressions may return any type of expression, including subqueries.

```sql
SELECT c.cust_id, c.fed_id
CASE
	WHEN c.cust_type_cd = 'I' THEN
	(
		SELECT CONCAT(i.fname, ' ', i.lname)
		FROM individual i
		WHERE i.cust_id = c.cust_id
	)
	WHEN c.cust_type_cd = 'B' THEN
	(
		SELECT b.name
		FROM business b
		WHERE b.cust_id = c.cust_id
	)
	ELSE 'Unknown'
END name
FROM customer c;
```

## Result Set Transformation

We want the following reslting set in a single row:
```sql
SELECT YEAR(open_date) year, COUNT(*) how_many
FROM account
WHERE open_date > '1999-12-31'
AND open_date < '2006-01-01'
GROUP BY YEAR(open_date);
```

To transform this result set into a single row, you will need to create six columns and, within each column, sum only those rows pertaining to the year in question.

```sql
SELECT
	SUM (
		CASE
		WHEN EXTRACT(YEAR FROM open_date) = 2000 THEN 1
		ELSE 0
	END ) year_2000,
	SUM (
		CASE
		WHEN EXTRACT(YEAR FROM open_date) = 2001 THEN 1
		ELSE 0
	END ) year_2001,
	...
	...
	SUM (
		CASE
		WHEN EXTRACT(YEAR FROM open_date) = 2005 THEN 1
		ELSE 0
	END ) year_2005
FROM account
WHERE open_date > '1999-12-31' AND open_date < '2006-01-01';
```

## Checking for Existence

```sql
SELECT c.cust_id, c.fed_id, c.cust_type_id,
CASE
	WHEN EXISTS (SELECT 1 FROM account a
		WHERE a.cust_id = c.cust_id
		AND a.product_cd = 'CHK')
	THEN 'Y'
	ELSE 'N'
END has_checking,
CASE
	WHEN EXISTS (SELECT 1 FROM account a
		WHERE a.cust_id = c.cust_id
		AND a.product_cd = 'SAV')
	THEN 'Y'
	ELSE 'N'
END has_savings,
FROM customer c;
```

## Conditional Updates

Sometimes you need to decide what values to set certain columns to. For example, after inserting a new transaction, you need to modify the `avail_balance`, `pending_balance` and `last_activity_date` columns in the `account` table. Although the last two columns are easily updated, to correctly modify the `avail_balance` column you need to know whether the funds from the transactions are immediately available by checking the `funds_avail_date` column in the `transaction` table.

```sql
UPDATE account
SET last_activity_date = CURRENT_TIMESTAMP(),
pending_balance = pending_balance +
(
	SELECT t.amount *
		CASE t.txn_type_cd WHEN 'DBT' THEN -1 ELSE 1 END
	FROM transaction t
	WHERE t.txn_id = 999
),
avail_balance = avail_balance +
(
	SELECT
		CASE
			WHEN t.funds_avail_date > CURRENT_TIMESTAMP() THEN 0
			ELSE t.amount *
				CASE t.txn_type_cd WHEN 'DBT' THEN -1 ELSE 1 END
		END
	FROM transaction t
	WHERE t.txn_id = 999
)
```

## Handing Null values

It is not always appropriate to retrieve `null` values for display or to take part in expressions.

```sql
SELECT emo_id, fname, lname,
CASE
	WHEN title is NULL THEN 'Unknown'
	ELSE title
END
From employee;
```

For calculations, `null` values often cause a `null` result, as demonstrated by the following:

```sql
SELECT <some calculation> +
CASE
	WHEN avail_balance IS NULL THEN 0
	ELSE avail_balance
END
```
