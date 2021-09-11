# Authentication

`app.post('/signup')`
- sign up users
    - signing up a user is mostly just storing an object in your database, representing their data
    - we don't want to store their actual plain-text password in our database. instead, we need to SALT and HASH the password, and store the hash in our database.
    - log in the user


`app.post('/login')`
- logging in a user
    - user supplies username and password
    - is there a user with that username?
    - if so, hash the password they tried to log in with, and check if it matches the hash we have stored.
    - if the password hashes match, we start a session for that user by setting a cookie in their browser with their mongo _id. This way, when the user sends another request to our server, we can see that they have an active session as a particular logged in user. 


Middleware features: 

For a request to any page, we should be able to use middleware to mandate that they must be logged in to view that page. 

For a request to any page, if a user is logged in, we should be able to use middleware to look up the user in the database, and make their user data accessible on `req.user`. 




