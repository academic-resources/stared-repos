# Introduction to SQL

SQL (_Structured Query Language_) is the language for generating, manipulating and retrieving data from a relational database. 

## The Relational Model

In 1970, Dr. Codd of IBM's research laboratory published a paper titled "_A Relational Model of Data for Large Shared Data Banks" that proposed that data be represented as sets of __tables__. Rather than using pointers to navigate between related entities, redundant data is used to link records in different tables.

![relational model](./relationa-model.png)

Each table in a relational database includes information that uniquely identifies a row in that table (known as the __primary key__, or a __compound key__ in case of a primary key consisting of two or more colmns).

Some tables also include information used to navigate to another table, this is where the "_redundant data_" mentioned earlier comes in. These columns are known as __foreign keys__.

#### Normalization

The proces of refining a database design to ensure that each independent piece of information is in only one place.

## What is SQL?

In the mid-1980s, ANSI began working on the first standard for the SQL language, which was published in 1986. Subsequent refinements led to new releases along with new features being added.

SQL goes hand in hand with the relational model because the result of an SQL query is a table (_result set_).

## SQL Statement Classes

SQL Language is divided into everal disctinct parts. The fundamentals are:

* __Schema Statements__: define data structures stored in the database.
* __Data Statements__: manipulate the data structures.
* __Transaction statements__: behgin, end, and roll back transactions.

## SQL as a Nonprocedural language

A Procedural language defines both the desired results and the mechanism/process by which results are generated.

Nonprecedural languages also define the desired results, but the process by which the results are generated is left to an external agent.

With SQL, SQL statements define the necessary inputs and outputs, but the manner in which a statement is executed is left to a component of your database engine known as the __optimizer__.

#### Optimizer

The optimizer's job is to look at your SQL statements and, taking into account how your tables are configured and what indexes are available, decide te most efficient executino path.

Most database engines will allow you to influence the optimizer's decisinos by specifying __optimizer hints__, such as suggesting that a particular index be used.