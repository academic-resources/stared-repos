`mkdir auth (md auth on Windows)`
Open up terminal
npm/yarn init
touch server.js
touch .gitignore

For this exercise, we'll need MogoDB to be running

yarn add /npm install express mongoose
change main from index.js to server.js

```
{
    "scripts": {
        "start": "nodemon server.js"
    }
}
```

- yarn add nodemon --dev / npm install nodemon --save-dev

```
const express = require('express')
const mongoose  require('mongoose')

mongoose
    .connect('mongodb://localhost/authdb')
    .then(connection => {console.log('\n=== connected to mongo ===\n')
    })
    .catch(err => console.log('error connecting to mongo'));

const server = express();

server.get('/', (req, res) => {
    res.send({ api: 'running' }) // always want to send something to test it
})

server.listen(8000, () => console.log('\n=== api running on 8k ===\jn'));
```

# Topics for week:

- express middleware review (global and local)
- mongoose middleware (lifecycle hooks)
- extending mongoose models with custom 'methods'
- hashing user passwords for database storage

- persisting state across requests using sessions (in-memory and persisted in mongo)
- authenticating users using cookies and sessions
- protecting resources from unauthenticated users

- authenticating users using JSON Web Tokens (JWTs, pronounced JOT).
- persisting tokens on the front-end to keep users authenticated across sessions

- security good practices (like don't store passwords as plaintext like T-Mobile was doing)

Global middleware is added to the server and it will be available for all requests.
Local middleware runs only before certain requests/routes

```
function greet(req, res, next) {
    req.message = 'Hello World';
    next();
}
```

#### Global:

```
server.use(greet);

server.get('/', (req, res) => {
    res.send({ route: '/', message: req.message });
});

server.get('/hello', (req, res) => {
    res.send({ route: 'hello', message: req.message });
});
```

#### Local:

```// server.use(greet);
server.get('/', (req, res) => {
    res.send({ route: '/', message: req.message })
}) <--- no longer using greet
server.get('/hello', greet, (req, res) => {
    res.send({ route: 'hello', message: req.message })
}); <-- uses greet
```

- After url and before route handler.

What if instead of greet this had been authenticate?
And what if instead of adding something there, I did something like ....

```
function authenticate(req, res, next) {
    if (req.body.password === 'mellon') {
        next()
    } else {
        res.status(401).send('You shall not pass!!!')
    }
}
server.use(express.json()) // Don't forget to parse the JSON!

server.post('/login', authenticate, (req, res) => {
    res.send('Welcome to the Mines of Moria');
});
```

So if you get to the route, it means you passed the authentication

##### Why nodemon is important:

If you don't use nodemon, it runs with node but when you make a change, the server doesn't restart

- If you add nodemon as a dependency instead of a devDependency, it will still work, but you should add it as a devDependency because you won't use it in production

##### Steps to debug:

Do we have an error on the server?
Is the server running?
Is the server running using yarn start with nodemon?

####Lifecycle Hooks:
client -> request -> [ (middleware) api ({middleware queue} mongoose) ]-> database

- When request comes in, inside the api we have middleware
- All requests go to middleware queue in the order middleware is added to the queue
- api uses mongoose which uses mongoDB driver to communicate to the database
- They're called lifecycle hooks because they behave the same as the lifecycle hooks from React
  - Some event happens (like )

```
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // if you pass in Kyle, it will change to kyle
        // good for normalizing usernames
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
```

```
server.post('/register', (req, res) => {
    const user = new User(req.body);
    user
    .save()
    .then(user => res.status(201).send(user))
    .catch(err => res.status(500).send(err))
});
```

The problem with this code ^ is that password is plaintext

Before we do the save to the database, we want to change the password

With mongoose, we can write a lifecycle hook
Lifecycle methods have both a pre- and a -post

- Can execute a function before save and after save

```
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    };
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', function (next) {
    console.log('pre save hook') // can't use arrow function here
    next()
})
userSchema.post('save', function (next) {
    console.log('post save hook') // can't use arrow function here
    next()
}) // example that we can execute code after and before save
```

#### Proper AuthN (authentication) vs AuthZ (authorization)

##### We will concentrate on AuthN

- password storage
- brute-force attack mitigation
- password strength

##### Hashing vs Encryption

- Encryption is a two-way process

  - plain text password + private key => encrypted password
  - encrypted password + private key => original password

- Hashing is a one-way process
  - behaves like a pure function
  - parameters + content (like password) => hash
  - given the same parameters and the same content, you always get the same hash
    - can try to figure out original content through use of rainbow table
  - were not originally made for security, were made for speed
    - need to slow down production of hashes to increase security
      - adding cost/time (rounds)
      - takes a number and does 2 to the nth of that number rounds

Key derivation algorithm:

- Have a hashing algorithm
- Add time to it
  - That's called a key derivation function
  - We use bcrypt (one of the most widely used packages)

Go to website: https://www.grc.com/haystack.htm

- Gives you an idea how costly it is to generate a password
- It's about complexity and length
- Somewhere around 12 characters, even if they have a massive operation it will be difficult to find your password
- Think of a song or a book or a movie or something your kid says and use that (maybe)

```
const bcrypt = require('bcrypt')

userSchema.pre('save', function (next) { // can't use arrow function here because bcrypt uses 'this'
    bcrypt.hash(this.password, 11, (err, hash) => { // 11 is the number of rounds (don't use less than 10), regular Node callback
        if (err) {
            return next(err) // Most examples uses callback because they don't support promises, but some support promises
        }
        this.password = hash;
        return next() // goes on to save to the database
        // might work without return, but examples have return
    })
})
```

npmjs.org

- Can check how often something is downloaded, how many open issues there are, pull requests, and documentation

If you want to authenticate, can use a function similar to middlware earlier
Would then find the matching username in the database, find the stored password, hash the password provided, and compare

Go with software that is widely used - sometimes there is malicious code on npm

- People go through and check/flag things, but it's happened in the past (people downloading malicious code)
