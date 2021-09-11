# Filtering

* Building a Condition
  * Expressions
  * Operators
* Condition Types
  * Equality
  * Range
  * Membership
  * Matching
    * Wildcards
    * Regexp
* Null

Sometimes you will want to work with every row in a table, such as:

* Purging all data from a table used to stage new data.
* Modifying all rows in a table after a new colmn has been added.
* Retrieving all rows from a message queue table.

In case like these, you won't need to have a `WHERE` clause. Most of the time, however, you wil want to narrow your focus to a subset of a table's rows.

Therefore, all SQL data statements (except `INSERT`) include an optional `WHERE` clause to house __filter conditions__ need to restrict the number of rows acted on by the SQL statement.

Additionally, the `SELECT` statement includes a `HAVING` clause in which filter conditons pertaining to grouped data may be included.

## Building a Condition

A condition is made up of one or more _expressions_ coupled with one or more _operators_.

An expression can be any of the following:

* A number
* A column in a table or view
* A string literal
* A built-in function
* A subquery
* A list of expressions

The operators used within conditions include:

* Comparison:
  * =, <>, !=
  * <, >, <=, >=
  * LIKE
  * IN
  * BETWEEN
* Arithmetic
  * +
  * -
  * *
  * /

## Condition Types

### Equality Conditions

```sql
SELECT pt.name product_type, p.name product
FROM product p INNER JOIN product_type pt
ON p.produt_type_cd = pt.product_type_cd
WHERE pt.name = 'Customer Accounts';
```

```sql
DELETE FROM account
WHERE status = 'CLOSED' AND YEAR(close_date) = 2002;
```

#### Inequality

```sql
SELECT pt.name product_type, p.name product
FROM product p INNER JOIN product_type pt
ON p.produt_type_cd = pt.product_type_cd
WHERE pt.name <> 'Customer Accounts';
```

### Range Conditions

Check whether an expression falls within a certain range.

```sql
SELECT emp_id, fname, lname, start_date
FROM employee
WHERE start_date < '2007-01-01'
  AND start_date >= '2005-01-01';
```

Which is the same as:

```sql
SELECT emp_id, fname, lname, start_date
FROM employee
WHERE start_date BETWEEN '2005-01-01' AND '2007-01-01';
```

You can also use string ranges:

```sql
SELECT cust_id, fed_id
FROM customer
WHERE cust_type_cd = 'I'
AND fed_id BETWEEN '500-00-0000' AND '999-99-9999';
```

To work with string ranges, you need to know the order of the characters within your character set (_collation_).

### Membership Conditions

```sql
SELECT account_id, product_cd, cust_id, avail_balance
FROM account
WHERE product_cd IN ('CHK', 'SAV', 'CD', 'MM');
```

#### Using subqueries

You can use a subquery to generate a set for you on the fly.

```sql
SELECT account_id, product_cd, cust_id, avail_balance
FROM account
WHERE product_cd IN (
  SELECT produt_cd
  FROM prooduct
  WHERE product_type_cd = 'ACCOUNT'
)
```

#### Using not in

```sql
SELECT account_id, product_cd, cust_id, avail_balance
FROM account
WHERE product_cd NOT IN ('CHK', 'SAV');
```

### Matching Conditions

This condition type deals with __partial string matches__.

You may, for example, want to find all employees whose last name begins with T.

```sql
SELECT emp_id, fname, lname
FROM employee
WHERE LEFT(lname 1) = 'T';
```

#### Using wildcards

When searching for partial string matchs, you might be interested in:

* Strings beggining/ending with a certain character/substring
* Strings containing a certain character/substring
* Strings with specific format, regardless of individual characters

The wildcard characters are:

* `_`: Exactly one character
* `%`: Any number of characters (including 0)

When building conditions that utilize search expressions, you use the `LIKE` operator.

```sql
SELECT lname
FROM employee
WHERE lname LIKE '_a%e%';
```

#### Sample Search Expressions

| Search expression | Interpretation |
| ----------------- | -------------- |
| F% | Strings beginning with F |
| %t | Strings ending with t |
| %bas% | Strings containing the substring 'bas' |
| _ _t_ | Four-character strings with a t in the third position |
| _ _ _-_ _-_ _ _ _ | 11-character strings with dashes in the fourth and seventh positions |

#### Using Regular Expresions

For example, find all employees whose last name starts with F or G.

```sql
SELECT emp_id, fname, lname
FROM employee
WHERE lname REGEXP '^[FG]';
```

### Null

When working with `null` you should remember:

* An expression can _be_ `null` but it can never _equal_ `null`.
* Two nulls are never equal to each other.

To test whether an expression is `null`, you need to use the `IS NULL` operator:

```sql
SELECT emp_id, fname, lname, superior_emp_id
FROM employee
WHERE superior_emp_id IS NULL;
```

You could also use `IS NOT NULL` when required.