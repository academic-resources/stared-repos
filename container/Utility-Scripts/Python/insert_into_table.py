#!/usr/bin/python
import MySQLdb
db = MySQLdb.connect("localhost",username,password,"company")

cursor = db.cursor()

sql= """INSERT INTO EMPLOYEE(FIRST_NAME,
		AGE,GENDER,INCOME)
		VALUES('Luffy','Monkey D ','19','M','10000000000')"""

try:
	cursor.execute(sql)
	db.commit()
except:
	db.rollback()

db.close()
