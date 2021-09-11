# MySQL

[< Back to Index](../)

* What is MySQL?
* Creating a sample database
* [Data Types](./data-types)
* [Table Creation](./table-creation)
* [Table Population & Modifiction](./table-operations)
* [Statements Go Bad](./statements-errors)
* [Querying](./querying)

## What is MySQL?

One of the most mature and open source database servers.

#### Creating a MySQL Server

1. Go to https://dev.mysql.com/downloads/.
2. Download & run required packages for your OS Community Version.
3. When promted, select "Configure the MySQL Server now".
4. (Windows) Whem promted, select "Install as a Windows Service" and "Include Bin Directory in Windows Path". You can add MySQL Server to Path later to use `mysql` from command line.
5. Select the Modify Security Settings checkbox and ente a password for the `root` user that you will remember.

#### Creating a sample database 

From the command window:

```
mysql -u root -p
create database bank;
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
grant all privileges on bank.* to '<your_user>'@'localhost';
quit
```

If you put a wrong password and want to change it:

```
ALTER USER 'userName'@'localhost' IDENTIFIED BY 'New-Password-Here';
```

Now you can login with your new user:

```
mysql -u <your_user> -p
```

And attach to the created database

```
show databases;
use bank;
```

Another way to do this in one line is:

```
mysql -u <your_user> -p <database_name>
```

We'll load sample data from https://resources.oreilly.com/examples/9780596007270/, go ahead and donwload `LearningSQLExample.sql`.

Now, from the previous session's command line:

```
source <path>\LearningSQLExample.sql
```

You can check the new created tables with:

```
show tables;
```
