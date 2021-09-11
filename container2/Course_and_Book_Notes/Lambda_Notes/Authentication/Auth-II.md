When you log in, what do you send to server?

- Username and password

```
server.post('/register', function(req, res) {
    const user = new User(req.body);

    user
        .save()
        .then(user => res.status(201).send(user))
        .catch(err => res.status(500).send(err))
})

server.post('/login, (req, res) => {
// don't want to authenticate this route because we want anyone to be able to log in
// we don't have time to validate right now, so not including validation
    const { username, password } = req.body;
// findOne receives a query object and returns first document that satisfies the filter
    User.findOne({username}).then(user => {
        if (user) {
// compare the passwords -
need to hash password in req.body and compare to stored hash
            user.isPasswordValid(password).then(isValid => {
                if (isValid) {
                    res.send('login successful')
                } else {
                    res.status(401).send('Invalid credentials');
                }
            })
        } else {
            res.status(401).send('Invalid credentials')
        // don't want to give away the fact that the username does not exist
        }
    }).catch(err => res.send(err))
})
```

```
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 11, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        return next()
    });
});

userSchema.methods.isPasswordValid = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password)
}
```

#### Common ways to store session data:

- memory
- cookie
- memory cache (like Redis and Memcached)
- database

* Sessions are ways to store data on the server about each device

- Same user connecting from mobile phone and postman, will have different sessions
  - Same user can have different sessions on the server
- Across requests, server will still know who you are

#### Storing session data in memory:

- data stored in memory is wiped when the server restarts
- causes memory leaks as more and more memory is used as the application continues to store data
- good for development due to its simplicity

#### Storing session data in cookies:

- A cookie is not necessarily what the server stores, but it's the way we send data back and forth with the client
- A small key/value pair passed back and forth betwen client and server and stored in the browser
- The server uses it to store information about a particular client/user
- Workflow for using cookies in session storage:
  - The server issues a cookie with an expiration time and sends it with the response
  - Browsers automatically store the cookie and send it on every request to the same domain
  - The server can read the information contained in the cookie (like the username)
  - The server can make changes to the cookie before sending it back on the response
  - Rinse and repeat

#### express-session uses cookies for session management:

##### Drawbacks when using cookies

- small size, around 4KB
- sent in every request, increasing the size of the request if too much information is stored in them
- if an attacker gets a hold of the private key used to encrypt the cookie, they could read the cookie data
  - Never store confidential information on a cookie

##### Storing session data in Memory Cache (preferred way of storing sessions in production applications):

- Stored as key-value pair data in a separate server
- the server still uses a cookie, but it only contains the session id
- the memory cache server uses that session id to find the session data

###### Advantages:

- quick lookups
- decoupled from the api server
- a single memory cache server can serve many applications
- automatically remove old session data

###### Downsides:

- another server to set up and manage
- extra complexity for small applications
- hard to reset the cache without losing all session data

Way that the server knows that a cookie is valid is only the server has the secret (unless someone gets into your server)

- Can use secret to encrypt and decrypt the cookie

```
server.use(session({
    secret: 'nobody tosses a dwarf!', // required
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
    }, // 1 day in milliseconds
    httpOnly: true,
    secure: false,
    resave: true,
    saveUninitialized: false,
}))
```

Req.session - if you want to add information (like username, ID) to the session data, this is a session object that's placed in the request by the library automatically

Session.destroy(callback) destroys the session and will unset req.session property. Once complete, callback is invoked

```
server.post('/login, (req, res) => {
// don't want to authenticate this route because we want anyone to be able to log in
// we don't have time to validate right now, so not including validation
    const { username, password } = req.body;
// findOne receives a query object and returns first document that satisfies the filter
    User.findOne({username}).then(user => {
        if (user) {
// compare the passwords -
need to hash password in req.body and compare to stored hash
            user.isPasswordValid(password).then(isValid => {
                if (isValid) {
                    req.session.username = user.username;
                    res.send('Have a cookie')
                } else {
                    res.status(401).send('Invalid credentials');
                }
            })
        } else {
            res.status(401).send('Invalid credentials')
// don't want to give away the fact that the username does not exist
        }
    }).catch(err => res.send(err))
})
```

Default name for the cookie is connect.sid

- it's bad to use the default because it tells a possible attacker that we're using express-session
- good practice to set your own name

```
server.use(session({
    secret: 'nobody tosses a dwarf!', // required
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
    }, // 1 day in milliseconds
    httpOnly: true,
    secure: false,
    resave: true,
    saveUninitialized: false,
    name: 'noname',
}))
```

```
server.get('/', (req, res) => {
    if (req.session && req.session.username) {
    res.send(`Welcome back ${req.session.username}`)
}   else {
    res.send('Who are you? Who, who?')
    }}
)
```

```
function authenticate(req, res, next) {
    if (req.session && req.session.username) {
        next();
    } else {
        res.status(401).send('You shall not pass!!!')
    }
}
```

```
server.get('/users', authenticate, (req, res,) => {
    User.find().then(users => res.send(users))
})
```

#### Sessions:

express-session - sessions are a way to persist data across requests - each user/device has a unique session

##### Adding session support:

```
const session = require('express-session');
    server.use(
        session({
            secret: 'nobody tosses a dwarf!',
            cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
            httpOnly: true, <-- if you know it'll only be http
            secure: true, <--- when you use https://
        })
    )
```

** You'll get a deprecated undefined resave and saveUninitialized warning (just means you have to set it) **

After you run login the first time, the library will add a session object to the request

- We can then use session object to save information in it (in this case the username)
- Server in memory is going to keep collection of all the sessions.  
   Each session will have a session ID so it can identify each session based on the device
  Even though we're not setting the sessionID, set automatically by the library
  When the server sends the cookie to client, ID uniquely identifies that device
  - Then the browser on any other request to the same domain will send the cookie that includes that ID so the library can pull out the correct session based on the ID
- You should store only the information you need to uniquely identify the user, nothing else

We don't do authorization here, only authentication

If I was implementing logout, I would use a get.

- Usually would store userID, maybe full name of user, but usually userID

```
server.get('/logout', (req, res) => {
    if (req.session) {
        let name = req.session.username
        req.session.destroy(function(err) {
            if (err) {
                res.send('error'); // unlikely to get an error here
            } else {
                res.send(`Goodbye, ${name}`)
            }
        })
    }
})
```

#### Storing Session date in a Database:

##### connect-mongoose

- Similar to storing data in a memory store
- The session cookie still holds the session ID
- The server uses the session ID to find the session data in the database
- Retrieving data from a database is slower than reading from a memory cache
- Causes chatter between the server and the database
- Need to manage/remove old sessions manually or the database will be filled with unused session data. connect-mongo manages that for you

connect-mongo needs to know about the session, so needs to be brought in after express-session

```
const MongoStore = require('connect-mongo')(session) // <-- writing with one statement

const sessionConfig = {
    secret: 'nobody tosses a dwarf!',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
    },
    httpOnly: true,
    secure: false,
    resave: true,
    saveUninitialized: false,
    name: 'noname',
    store: new MongoStore({
        url: 'mongodb://localhost/sessions',
        // now sessions are stored in sessions database
        ttl: 60 * 10,
            // every ten minutes, check for all session data and delete it
    }) // now when server ends, login is persisted
} // if logout, cookie in sessions is automatically deleted
```

It is more important to master React because it will be easier for you to get a job in today's industry, so you should add a front-end.

Cookies don't work as well with mobile devices
Cookies only work for a single domain, so if working on multiple domains, won't work

- In those cases, we use token-based authentication
