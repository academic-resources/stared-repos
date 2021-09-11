# Stored Procedure

A _Stored Procedure_ is a subroutine like a subprogram in a regular computing language, stored in database.

It has a name, a parameter list, and SQL statement(s).

MySQL supports "routines" and there are two kinds:
* Stored Procedures which you invoke using the `CALL` statement.
* Functions whose return values you use in other SQL statements the same that you use pre-installed MySQL functions like `pi()`.

[See w3resource example for examples and detailed information](https://www.w3resource.com/mysql/mysql-procedure.php).

## Why?

* __Fast__. MySQL takes advantage of caching, just as prepared statements do. The main speed gain comes from reduction of network traffic. If you have a repetitive task that requires checking, looping, multiple statements, and no user interaction, do it with a single call to a stored procedure.
* __Portable__. It will run on every platform thay MySQL runs on, without additional run-time environment package needed, or set permissions for program execution in the OS.
* Always available as 'source code' in the database itself.
* Migratory. MySQL adheres fairly closely to the SQL:20003 standard.

## Creation

`CREATE PROCEDURE` and `CREATE FUNCTION` require the `CREATE ROUTINE` privilege, and might also require `SUPER` privilege, depending on the `DEFINER` value.

```sql
SHOW PRIVILEGES;
```

By default, a procedure is associated with the currently used database. You can specify the name as `database_name.stored_procedure_name` when you create it.

```
CREATE [DEFINER = { user | CURRENT_USER }]          
PROCEDURE sp_name ([proc_parameter[,...]])          
[characteristic ...] routine_body    
proc_parameter: [ IN | OUT | INOUT ] param_name type    
type:          
Any valid MySQL data type    
characteristic:          
COMMENT 'string'     
| LANGUAGE SQL      
| [NOT] DETERMINISTIC      
| { CONTAINS SQL | NO SQL | READS SQL DATA 
| MODIFIES SQL DATA }      
| SQL SECURITY { DEFINER | INVOKER }    
routine_body:      
Valid SQL routine statement
```

### Pick a delimiter

By default, we use semicolon (;) but causes problems in stored procedures because they can have many statements.

Pick a string which rarely occur within statement or within procedure.

```sql
DELIMITER $$ ;

SELECT * FROM USER $$

DELIMITER ; $$
```

### Example

```sql
DELIMITER $$ ;
CREATE PROCEDURE job_data() /* no parameters */
    SELECT * FROM JOBS; $$
)
CALL job_data() $$ /* equivalent to CALL job_data */
```

### BEGIN, END, LOOP, REPEAT-WHILE-DO

Used to write compound statements.

```
[begin_label:] 
BEGIN     
[statement_list] 
END 
[end_label])
```

### SET @var

Declare user variables