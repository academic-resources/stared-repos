# Statements Go Bad

Based on table definitions, there are lots of ways that you can run afoul when inserting or modifying data.

* Nonunique Primary Key
* Nonexistent Foreign Key
* Column Value Violations
* Invalid Date Conversions

## Nonunique Primary Key

MySQL will make sure that duplicate key values are not inserted into the tables. The next statement tries to bypass the auto-increment feature of the `person_id` column:

```sql
INSERT INTO person
  (person_id, fname, lane, gender, birth_date)
  VALUES (1, 'Charles', 'Fulton', 'M', '1968-01-15');
```

```
ERROR 1062 (23000): Duplicate entry '1' for key 'PRIMARY'
```

## Nonexistent Foreign Key

This constraint ensures that all values of `person_id_` entered into `favorite_food` table exist in the `person` table.

```sql
INSERT INTO favorite_food (person_id, food)
  VALUES (999, 'lasagna');
```

```
ERROR 1452 (23000): (...) a foreign key constraint fails (...)
```

## Column Value Violations

```sql
UPDATE person
  SET gender = 'Z'
  WHERE person_id = 1;
```

```sql
ERROR 1265 (01000): Data truncated for column 'gender' at row 1
```

## Invalid Date Conversions

If a string used to populate a `date` column does not match the expected format, you will receive an error. Remember that `date` default format is "YYYY-MM-DD":

```sql
UPDATE person
  SET birth_date = "DEC-21-1980"
  WHERE person_id = 1;
```

```
ERROR 1292 (22007): Incorrect data value: 'DEC-21-1980- for column 'birth_date' at row 1
```

In general, it is always a good idea to explictly specify the format string rather than relying on the default format. You can use the `str_to_date` function for that:

```sql
UPDATE person
  SET birth_date = str_to_date('DEC-21-1980', '%b-%d-%Y)
  WHERE person_id = 1;
```

#### Date Formatters

![str to date formatters](./str_to_date.png)
