# Table Creation

* Building SQL Schema Statements
* Constraints
* What is Null

## Building SQL Schema Statements

```sql
CREATE TABLE person
(
  person_id SMALLINT UNSIGNED,
  fname VARCHAR(20),
  lname VARCHAR(20),
  gender ENUM('M', 'F'),
  birth_date DATE,
  street VARCHAR(30),
  city VARCHAR(20),
  state VARCHAR(20),
  country VARCHAR(20),
  postal_code VARCHAR(20),
  CONSTRAINT pk_person PRIMARY KEY (person_id)
);

CREATE TABLE favorite_food
(
  person_id SMALLINT UNSIGNED,
  food VARCHAR(20),
  CONSTRAINT pk_favorite_food PRIMARY KEY (person_id, food),
  CONSTRAINT fk_fav_food_person_id FOREIGN KEY (person_id)
  REFERENCES person (person_id)
);
```

You can see a table's information after creation with the `DESC` statement:

```sql
DESC favorite_food`
```

You can update a table via the `ALTER TABLE` statement and delete it via `DROP TABLE`.

## Constraints

* Primary Key
* Check
* Foreign Key

You need to tell the database server what column(s) will serve as the primary key for the table. You do his by creating a __constraint__ on the table.

You can add several types of constraints to a table definition. This contraint is a __primary key constraint__. It is created on the `person_id` column and given the name `pk_person`.

Another type of constraint usefull is the __check constraint__:

```sql
gender CHAR(1) CHECK (gender IN ('M', 'F')),
```

MySQL provides another character data type that merges the check constraint into the data type definition.

```sql
gender ENUM('M', 'F'),
```

The `favorite_food` table contains another type of constraint called __foreign key constraint__. This constrains the value of the `person_id` column in the `favorite_food` table to include _only_ values found in the person table. Thus, I will not be able to add a row to the `favorite_food` tablwe indicating that `person_id 27` likes pizza if there isn't already a row in the `person` table having a `person_id` of `27`.

## What is Null?

In some cases, it is not possible/applicable to provide a value for a particular column in your table.

For example, when adding data about a new customer order, the `ship_date` column cannot yet be determined. In this case, the column is said to be `null`, which indicates the __absence of a value__.

It's used for various cases:
* Not applicable
* Unknown
* Empty set

When designing a table, you may specify which columns are allowed to be `null` (the default), and which not by adding `not null` after the type definition:

```sql
fname VARCHAR(20) NOT NULL
```