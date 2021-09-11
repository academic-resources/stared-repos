# Transactions

Application logic will frequently include multiple SQL statements that need to execute together as a logical unit of work.

## Multiuser Databases

Database management systems allows multiple people to query and modify data simultaneously.

Let's say for example, that you are running a report that shows the available balance for all the checking accounts opened at your branch. At the same time you are running the report, however, the following activities are occurring:

* A teller at your branch is handling a deposit for one of your customers.
* A customer is finishing a withdrawal at the ATM in the front lobby.
* The bank's month-end application is applying interest to the accounts.

While your report is running, therefore, multiple users are modifying the underlying data, so what numbers should appear on the report? Answer depends somewhat on how your server handles _locking_.

## Locking

Locks are the mechanism the database server uses to __control simultaneous use of data resources__.

When some portion of the database is locked, any other users wishing to modify (or possible read) the data must wait until the lock has been released.

Most database servers use one of two locking strategies.

#### Strategy 1, _Write/Reac Locks_

Database writers must request and receive from the server a _write lock_ to modify data, and database readers must request and receive from the server a _read lock_ to query data. While multiple users can read data simultaneously, only one write lock is given out at a time for each table (or portion thereof), and read requests are blocked until the write lock is released.

#### Strategy 2, _Versioning_

Database writers must request and receive from the server a _write lock_ to modify data, but readers do not need any type of lock to query data. Instead, the server ensures that a reader sees a consistent view of the data from the time its query begins until its query has finished.

## Lock Granularities

The server may apply a lock at one of three different level or _granularities_. This depends on database server. MySQL uses both tree depending on your choice of storage engine.

#### Table Locks

Keep multiple users from modifying data in the same table simultaneously.

* Little bookkeeping
* Quickly yields unacceptable wait times as the number of users increases.

#### Page Locks

Keep multiple users from modifying data on the same page (a segment of memory generally in the range of 2KB to 16KB) of a table simultaneously.

#### Row Locks

Keep multiple users from modifying the same row in a table simultaneously.
* Most bookkeeping
* Allows may users to modify same table as long as interested in different rows.

## Choosing a Storage Engine 

MySQL Server, has been designed (unlike Oracle Database or Microsoft SQL Server) so that multiple storage engines may be utilized to provide low-level database functionality, including resource locking and transaction management.

```
MyISAM
A nontransactional engine employing table locking
MEMORY
A nontransactional engine used for in-memory tables
BDB
A transactional engine employing page-level locking
InnoDB
A transactional engine employing row-level locking
Merge
A specialty engine used to make multiple identical MyISAM tables appear as a
single table (a.k.a. table partitioning)
Maria
A MyISAM replacement included in version 6.0.6 that adds full recovery
capabilities
Falcon
A new (as of 6.0.4) high-performance transactional engine employing row-level
locking
Archive

A specialty engine used to store large amounts of unindexed data, mainly for ar-
chival purposes
```

## Transactions & Atomicity

Transaction is a device for grouping together multiple SQL statements such that either __all or none of the statements succeed__ (__Atomicity__).

If you attempt to transfer $500 from your savings account to your checking account, you would be a bit upset if the money were successfully withdrawn from your savings account but never made it to your checking account. Whatever the reason for the failure (the server was shut down for maintenance, request for a page lock on the account table timed out, etc...), you want your $500 back.

To protect against this kind of error, the program that handles your transfer request would first begin a transaction, then issue the SQL statements needed to move the money from your savings to your checking account, and, if everything succeeds, end the transaction by issuing the `COMMIT` command. If something unexpected happens, however, the program would issue a `ROLLBACK` command, which instructs the server to undo all changes made since the transaction began.

```sql
START TRANSACTION;

/* withdraw money from first account, making sure balance is sufficient */
UPDATE account SET avail_balance = avail_balance - 500
WHERE account_id = 9988
	AND avail_balance > 500;

IF <exactly one row was updated by the previous statement> THEN
/* deposit money into second account */
UPDATE account SET avail_balance = avail_balance + 500
WHERE account_id = 9989;

	IF <exactly ...> THEN
	/* everything worked, make changes permanent */
	COMMIT;

	ELSE
	/* something went wrong, undo all */
	ROLLBACK;
	ENDIF;
ELSE
/* insufficient funds, or error during update */
ROLLBACK;
END IF;
```

### Starting a Transaction

Database servers handle transaction creation in one of two ways:

1. An active transaction is always associated with a database session, so there is no need or method to explicitly begin a transaction.
2. Unless you explicitly begin a transaction, individual SQL statements are automatically committed independently of one another.

Oracle Database takes the first, while Microsoft SQL Server and MySQL take the second approach.

The SQL:2003 standard includes a `start_transaction` command to be used when you want to explicitly begin a transaction. MySQL conforms to the standard.

Both MySQL and SQL Server allow you to turn off auto-commit mode for individual sessions, in which case, the servers will act just like Oracle Database regarding transactions.

With MySQL:
```sql
SET AUTOCOMMIT=0
```

### Ending a Transaction

You must explicitly end your transaction for your changes to become permanent. You do this by way of the `COMMIT` command, which instructs the server to mark the changes as permanent and release any resources (i.e., page or row locks) during the transaction.

If you decide that you want to undo all the changes made since starting the transaction, you must issue the `ROLLBACK` command.

There are other several other scenarios by which your transaction can end, either as an indirect result of your actions or as a result of something outside your code:

* Server shuts down, transactions will be rolled back automatically when server is restarted.
* You issue an SQL schema statement, such as `ALTER TABLE`, will cause current transaction to be committed and new transaction to be started.
* You issue another `START TRANSACTION` command, which will cause previous transaction to be committed.
* Server prematurely ends your transaction because it detects a _dead lock_ and decides that your transaction is the culprit. In this case, the transaction will be rolled back and you will receive an error message.

A _deadlock_ occurs when two different transactions are waiting for resources that the other transaction currently holds. If both transactions happen to be modifying the same page or row (depending on the lock granularity), then they will each wait forever for the other transaction to finish and free up the needed resource. Whenever a deadlock is detected, one of the transactions is chosen, either arbitrarily or by some criteria, to be rolled back so that the other transaction may proceed.

## Transaction Savepoints

You may not want to undo all of the work that has transpired. You can establish one or more _savepoints_ within a transaction and use them to rollback to a particular location within your transaction.

All savepoints must be given a name.

```sql
SAVEPOINT my_savepoint;
```

```sql
ROLLBACK TO SAVEPOINT my_savepoint;
```

#### Example

```sql
START TRANSACTION;

UPDATE product
SET date_retired = CURRENT_TIMESTAMP()
WHERE product_cd = 'XYZ';

SAVEPOINT before_close_acounts;

UPDATE account
SET status = 'CLOSED', close_date = CURRENT_TIMESTAMP(),
last_activity_date = CURRENT_TIMESTAMP()
WHERE product_cd = 'XYZ';

ROLBACK TO SAVEPOINT before_close_accounts;
COMMIT;
```
