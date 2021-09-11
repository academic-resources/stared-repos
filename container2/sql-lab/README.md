# SQL Exercises

## Topics

- Structured Query Language (SQL)
- Relational Databases
- SQLite
- Writing Basic Queries

## Assignment

For this lab you will:

- write SQL statements against a pre-populated database using an online tool. Once you have the correct SQL Statement for each query, write it inside the `queries.md` file under the appropriate heading.
x install [`DB Browser for SQLite`](https://sqlitebrowser.org/) and use it to create a database.
x using `DB Browser for SQLite` add a table to the database you just created.

### Write Basic Queries

Visit [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top) using the **Google Chrome (or Chromium if you use Linux) browser** and write _SQL queries_ for the following requirements:

1. find all customers that live in London. Returns 6 records.
2. find all customers with postal code 1010. Returns 3 customers.
3. find the phone number for the supplier with the id 11. Should be (010) 9984510.
4. list orders descending by the order date. The order with date 1997-02-12 should be at the top.
5. find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name. Returns 11 records.
6. find all customers that include the word "market" in the name. Should return 4 records.
7. add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.
8. update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.

**Clicking the `Restore Database` button in the page will repopulate the database with the original data and discard all changes you have made**.

### Create Database and Table

- use [`DB Browser for SQLite`](https://sqlitebrowser.org/) to create a database, name it `budget.sqlite3`.
- add an `accounts` table with the following _schema_:

  - `id`, numeric value with no decimal places that should autoincrement.
  - `name`, string, add whatever is necessary to make searching by name faster.
  - `budget` numeric value.

- constraints
  - the `id` should be the primary key for the table.
  - account `name` should be unique.
  - account `budget` is required.

## Stretch Problems

9. list orders grouped by customer showing the number of orders per customer. _Rattlesnake Canyon Grocery_ should have 7 orders.

SELECT *, Count(CustomerID) FROM Orders GROUP BY CustomerID;

10. list customers names and the number of orders per customer. Sort the list by number of orders in descending order. _Ernst Handel_ should be at the top with 10 orders followed by _QUICK-Stop_, _Rattlesnake Canyon Grocery_ and _Wartian Herkku_ with 7 orders each.

SELECT customers.customername, customers.customerid, COUNT(CustomerName) FROM Customers JOIN orders ON customers.customerid = orders.customerid GROUP BY (CustomerName) ORDER BY Count(CustomerName) DESC

11. list orders grouped by customer's city showing number of orders per city. Returns 58 Records with _Aachen_ showing 2 orders and _Albuquerque_ showing 7 orders.

SELECT customers.customerid, customers.city, COUNT(City) FROM Customers JOIN orders ON customers.customerid = orders.customerid GROUP BY (City)

12. delete all customers that have no orders. Should delete 17 (or 18 if you haven't deleted the record added) records.

DELETE FROM customers WHERE customerID NOT IN (select customerid from orders)

We can select all the customers who did not place an order like this:
SELECT customerId FROM Customers WHERE customerID NOT IN (select customerid from orders)