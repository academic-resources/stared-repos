#!/usr/bin/python
import MySQLdb

db=MySQLdb.connect("localhost",username,password,"company")

cursor = db.cursor()

cursor.execute("DROP TABLE IF EXISTS EMPLOYEE")

sql = """CREATE TABLE EMPLOYEE(
		FIRST_NAME CHAR(20) NOT NULL,
		LAST_NAME CHAR(21),
		AGE INT,
		GENDER CHAR,
		INCOME FLOAT)"""

cursor.execute(sql)

db.close()
