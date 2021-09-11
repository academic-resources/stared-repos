
USE chat;

CREATE TABLE messages (
  ID int NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  message varchar(255) NOT NULL,
  timestamp DATETIME DEFAULT null,
  roomname varchar(20),
  PRIMARY KEY (ID)
);


/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
