# MySQL Data Types

In general, all the popular database servers have the capacity to store the same types of data.

* Character Data
* Numeric Data
* Temporal Data (Date/Times)

## Character Data

Character data can be stored as either __fixed-length (CHAR)__ (right-padded with spaced and always consume same number of bytes) or __variable-length (VARCHAR)__ strings.

When defining a character column, you must specify the __maximum size__ of any string to be stored in the column.

```sql
char(20) /* fixed-length has max 255 bytes */
varchar(20) /* variable-length has max 65,535 byes */
```

If you want to store longer strings, such as emails, XML, documents, etc, you will want to use of the __text types (MEDIUMTEXT and LONGTEXT)__.

#### Character Sets

For languages that use the Latin alphabet, such as English, here is sufficiently small number of characters such that only a single byte is needed to store each character.

Other languages, such as Japanese and Korean, contain large number of characters, thus requiring multiple bytes of storage for each character. Such character sets are therefore called _multibyte character_ sets.

MySQL can store data using various character sets, both single- and multibyte.

```sql
SHOW CARACTER SET;
```

You can store different character sets within the same table.

```sql
VARCHAR(20) character set utf8
```

With MySQL, you may also set the default character set for your entire database:

```sql
CREATE DATABASE FOREIGN_SALES CHARACTER SET utf8;
```

#### Text Data

If you need to store data that might exceed the 64 KB limit for `VARCHAR` columns, you will need to use one of the text types.

| Text type  | Maximum number of bytes |
|------------|-------------------------|
| Tinytext   | 255                     |
| Text       | 65,535                  |
| MediumText | 16,777,215              |
| LongText   | 4,294,967,295           |

* If data being loaded into a text column exceeds the maximum size for that type, it will be __truncated__.
* Trailing spaces will not be removed when data is loaded into the column.
* When using `TEXT` columns for sorting or grouping, only the first 1024 bytes are used, altough this limit may be increased if necessary.
* Different text types are unique to MySQL.

If you are creating a column for free-form data enty, such as a notes column to hold data about customer interactions with your company's customer service department, then `VARCHAR` will probably be adequate.

---

## Numeric Data

When specifying one of these types, you may also specify that that data is __unsigned__, which tells the server that all data stored in the coumn wil be greater than or equal to zero.

| Type      | Signed Range                                            | Unsigned Range                  |
|-----------|---------------------------------------------------------|---------------------------------|
| Tinyint   | -128 to 127                                             | 0 to 255                        |
| Smallint  | -32,768 to 32,767`                                      | 0 to 65,535                     |
| Mediumint | -8,388,608 to 8,388,607                                 | 0 to 16,777,215                 |
| Int       | -2,147,483,648 to 2,147,483,647                         | 0 to 4,294,967,295              |
| Bigint    | -9,233,372,036,854,775,808 to 9,223,372,036,854,775,807 | 0 to 18,446,744,073,709,551,615 |

For floating-point numers, you may choose the following numeric type:

| Type         | Negative Range                                       | Positive Range                                         |
|--------------|------------------------------------------------------|--------------------------------------------------------|
| Float(p, s)  | −3.402823466E+38 to −1.175494351E-38                 | 1.175494351E-38 to 3.402823466E+38                     |
| Double(p, s) | −1.7976931348623157E+308 to −2.2250738585072014E-308 | 2.2250738585072014E-308 to 1.7976931348623157E+308     |

When using a floating-point type, you can specify the __precision__ (total number of allowable digits both to the left and to the right of the decimal point) and a __scale__ (number of allowable digits to the right of the decimal point), but they are not required.

If you specify a precision/scale, remember that the data stored in the column will be rounded if the number of digits exceeds the scale and/or precision of the column.

You can also define them as __unsigned__, but this designation only prevents negative numbers from being stored ni the column rather than altering the range of data that may be stored in the column.

## Temporal Data

Each database server allows a different range of dates for temporal columns.

MySQL supports the following temporal data types:

| Type      | Default format      | Allowable values                           |
|-----------|---------------------|--------------------------------------------|
| Date      | YYYY-MM-DD          | 1000-01-01 to 9999-12-31                   |
| Datetime  | YYYY-MM-DD HH:MI:SS | 1000-01-01 00:00:00 to 9999-12-31 23:59:59 |
| Timestamp | YYYY-MM-DD HH:MI:SS | 1970-01-01 00:00:00 to 2037-12-31 23:59:59 |
| Year      | YYYY                | 1901 to 2155                               |
| Time      | HHH:MI:SS           | -838:59:59 to 838:59:59                    |

> HHH: Hours enlapsed

> `TIMESTAMP` will automatically be populated with the current date/time by the MySQL Server, that's why it's usefull to track when a user last modified a particular row.

The purpose of a __format string__  (Default format) is to show how the data will be represented when retrieved, along with how a data string should be constructed when inserting or updating a temporal colun. Thus if you wanted to insert the date March 23, 2005 into a `DATE` column using the default format `YYYY-MM-DD`, you would use the string `'2005-03-23'`.