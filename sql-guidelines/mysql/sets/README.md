# Sets

SQL includes three set operators that allow you to perform each of the various set operations described earlier in the chapter.

Additionally, each set operator has two flavors, one that includes duplicates and another that removes duplicates.


* Operators
  * Union
  * Intersect
  * Except
* Set Operation Rules

## Union

* `UNION` sorts the combined set and removes duplicates.
* `UNION ALL` does not.

```sql
SELECT 'IND' type_cd, cust_id, lname name
FROM individual
UNION ALL
SELECT 'BUS' type_cd, cust_id, name
FROM business;
```

We can see the diference in how duplicates are handled in the following queries:

```sql
SELECT emp_id
FROM employee
WHERE assigned_branh_id = 2
  AND (title = 'Teller' OR title ='Head Teller')
UNION ALL
SELECT DISTINCT open_emp_id
FROM account
WHERE open_branch_id = 2;
```

```sql
SELECT emp_id
FROM employee
WHERE assigned_branh_id = 2
  AND (title = 'Teller' OR title ='Head Teller')
UNION
SELECT DISTINCT open_emp_id
FROM account
WHERE open_branch_id = 2;
```

## Intersect

ANSI SQL specification includes the `INTERSECT` operator but MySQL does not support it.

```sql
SELECT emp_id, fname, lname
FROM employee
INTERSECT
SELECT cust_id, fname, lname
FROM individual;
```

If the two queries in the previous compund query return nonoverlapping data sets, then the intersection will be an empty set.

The previous sets are completely nonoverlappnig, so the intersection of the two sets yields the empty set.

If the two sets had a employee whose columns' data are the same that an individual's, then the intersection would had yield that.

If we use the example from the `UNION ALL` section:

```sql
SELECT emp_id
FROM employee
WHERE assigned_branh_id = 2
  AND (title = 'Teller' OR title ='Head Teller')
INTERSECT
SELECT DISTINCT open_emp_id
FROM account
WHERE open_branch_id = 2;
```

The `INTERSECT` operator, removes any duplicate rows found in the overlapping region.

## Except

Once again, the ANSI SQL specification includes the `EXCEPT` operator for MySQL does not implement it.

`EXCEPT` returns the first table minus any overlap with the second table.

```sql
SELECT emp_id
FROM employee
WHERE assigned_branh_id = 2
  AND (title = 'Teller' OR title ='Head Teller')
EXCEPT
SELECT DISTINCT open_emp_id
FROM account
WHERE open_branch_id = 2;
```

## Set Operations Rules

### Sorting Compound Query Results

If you want the results of your compound query to be sorted, you can add an `ORDER BY` clause after the last query, and use in the clause column names from the first query of the compund query.

Frequently, the column names are the same for both queries in the compound query, but this does not need to be the case.

### Set Operation Precedence

If your compound query contains more than two queries using different set operators, you need think about the order in which to place the queries in your compound to achieve the desired results.

* ANSI SQL specification cals for the `INTERSECT` operator to have precedence over the other set operators.
* You may dictate the order in which queries are combined by enclosing multiple queries in parentheses.

In the case of MySQL, as it does not yet implement `INTERSECT` or allow parentheses in compound queries to override the default top-to-botton processing, you will need to carefully arrange te queries.