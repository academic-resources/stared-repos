# Views

You can achieve something similar to a public interface, by keeping your tables private and allowing your users to access data only through a set of _views_.

## What are Views?

A _view_ is simply a mechanism for querying data. They don't involve data storage.

### Creation

You create a view by assigning a name to a `SELECT` statement, and then storing the query for others to use.

Here's a view definition:
```sql
CREATE VIEW customer_vew
(
    cust_id,
    fed_id,
    cust_type_cd,
    address,
    city,
    state,
    zipcode
)
AS
SELECT cust_id
concat(`ends in `, substr(fed_id, 8, 4)) fed_id,
cust_type_cd,
address,
city,
state,
postal_code
FROM customer;
```

The first part of the statement lists the view's column names, which may be different from those of the underlying table. For example, the `customer_vw` view has a column named `zipcode` which maps to the `customer.postal_code` column.

The database server simply stores the view definition for future use, the query is not executed, and no data is retrieved or stored.

### Usage

You can now use the view like it would be a table:

```sql
SELECT cust_id, fed_id, cust_type_cd
FROM customer_vw;
```

You are free to use any other caluse.

### Show

If you want to know what columns are available in a view:

```sql
DESCRIBE customer_vw;
```

## Why use Views?

### Data Security

You may not want allow users to access every column and row in a table. Some columns can contain sensitive data, such as credit/debit card numbers.

Not only is it a bad idea to expose such data to all users, but also it might violate your company's privacy policies, or even state/federal laws, to do so.

Best approach is to __keep table private__ (i.e., don't grant `SELECT` permissions to any users) and then to create one or more views that either omit or obscure the sensitive columns (such as the `'ends in ####'` approach).

You may also constrain which _rows_ a set of users may access by adding a `where` clause to your view definition.

```sql
CREATE VIEW business_customer_vw
(
    ...
)
AS
SELECT ...
FROM CUSTOMER
WHERE cust_type_cd = 'B';
```

If you provide this view to your corporate banking department, they will be able to access only business accounts because the condition in the view's where clause will be included in their queries.

### Data Aggregation

Views are a great way to make it appear as though data is being pre-aggregated and stored in the database.

As an example, let's say that an application generates a report each month showing the number of accounts and total deposits for every customer. Rather than allowing the application developers to write queries against the base tables, you could provide them with the following view:

```sql
CREATE VIEW customer_totals_vw
(
    cust_id,
    cust_type_cd,
    cust_name,
    num_accounts,
    tot_deposits
)
AS
SELECT cst.cust_id, cst.cust_type_cd,
CASE
    WHEN cst.cust_type_cd = 'B' THEN
    (
        SELECT bus.name
        FROM business bus
        WHERE bus.cust_id = cst.cust_id
    )
    ELSE
    (
        SELECT concat(ind.fname, ' ', ind.lname)
        FROM individual ind
        WHERE ind.cust_id = cst.cust_id
    )
END cust_name,
sum (CASE WHEN act.status = 'ACTIVE' THEN 1 ELSE 0 END) tot_active_accounts,
sum (CASE WHEN act.status = 'ACTIVE' THEN act.avail_balance ELSE 0 END) tot_balance
FROM customer cst INNER JOIN account act
    ON act.cust_id = cst.cust_id
GROUP BY cst.cust_id, cst.cust_type_cd;
```

Using this approach gives you a great deal of flexibility as a database designer. If you decide at some point in the future that query performance would improve dramatically if the data were preaggregated in a table rather than summed using a view, you can create a `customer_totals` table and modify the `customer_totals_vw` view definition to retrieve data from this table.

Before modifying the view definition, you can use it to populate the new table.

```sql
CREATE TABLE customer_totals
AS
SELECT * FROM customer_totals_vw;
```

```sql
CREATE OR REPLACE VIEW customer_totals_vw
(
    cust_id,
    cust_type_cd,
    cust_name,
    num_accounts,
    tot_deposits
)
AS
SELECT cust_id, cust_type_cd, cust_name, num_accounts, tot_deposits
FROM customer_totals;
```

### Hiding Complexity

Once of the most common reasons for deploying views is to shield end users from complexity.

For example, rather than expecting the report designer to navigate four different tables to gather the necessary data, you could provide a view that looks as follows:

```sql
CREATE VIEW branch_activity_vw
(
    branch_name, city, state, num_employees, num_active_accounts, tot_transactions
)
AS
SELECT br.name, br.city, br.state,
(
    SELECT count(*)
    FROM employee emp
    WHERE emp.assigned_branch_id = br.branch_id
) num_emps,
(
    SELECT count(*)
    FROM account acnt
    WHERE acnt.status = 'ACTIVE' AND acnt.open_branch_id = br.branch_id
) num_accounts,
(
    SELECT count(*)
    FROM transaction txn
    WHERE txn.execution_branch_id = br.branch_id
) num_txns
FROM branch br;
```

### Joining Partitioned Data

Some database designs break tables into multiple pieces in order to improve perfromance, such as `transaction_current`, which holds the latest six months' of data, and `transaction_historic`, which holds all data up to six months ago.

Using a view in this case is a good idea because it allows the designers to change the structure of the underlying data without the need to force all database users to modify the queries.

## Updatable Views

MySQL, Oracle Database, and SQL Server all allow you to modify data through a view, as long as you abide by certain restrictions.

In the case of MySQL, a view is updatable if the following conditions are met:

* No aggregate functions are used (`max`,`min`,`avg`, etc)
* View does not employ `group by` or `having` clauses.
* No subqueries exist in the `select` or `from` clause, and any subqueries in the `where` clause do not refer to tables in the `from` clause.
* View does not utilize `union`, `union all`, or `distinct`.
* The `from` clause includes at least one table or updatable view.
* The `from` clause uses only inner joins if there is more than one table or view.

But, __views that contain derived columns cannot be used for inserting data__.