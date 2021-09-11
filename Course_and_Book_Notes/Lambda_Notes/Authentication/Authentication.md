We want to allow users to log in to our websites
You log in once, you authenticate yourself, and then you're allowed to make restricted actions

How do you authenticate users and let them perform actions on your website based on their authentication?

# Topics:

##### Middleware,

##### Sessions,

##### Passwords

### Middleware:

Normally when we define route handlers

```
server.get('/greet', (req, res) => {
// when the server receives a request to /greet
// or client makes request to /greet, both are equivalent,
// this callback gets called
})
```

##### Middleware:

- Sits between the route handler and the client
- Client will make request
- Request will first be handled by Middleware
- Middleware will handle request and pass request to route handler

Middleware can choose to handle request in multiple ways
Route handler might not need to do anything
Middleware can do things to help route handler out

- Parameter checking, validation, etc.

```
const STATUS_USER_ERROR = 422
sever.get('/greet', (req, res) => {
    const name = req.query.name;
    if (!name) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a name'})
        return;
    }
    res.json({ greeting: `Hello $name` })
});
```

```
server.get('/farewell', (req, res) => {
    const name = req.query.name;
    if (!name) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a name' })
        return;
    }
    res.json({ greeting: `Goodbye ${name}` })
});
```

During authentication, for various routes you will want to confirm that a user is logged in

- Shouldn't be able to read/create/delete email if you're not logged in
- All the different route handlers will have that check that you're logged in
- Repeat functionality

Whenever you use server.use, you're using Middleware

next() is a callback function
Middleware says that it's done with its job and next() tells system to go to next part of request

In case of 422 or some other error, might not want to call next()

```
server.use((req, res, next) => {
    const name = req.query.name;
    if (!name) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a name' })
        return;
    }
    req.name = name
    next()
}) <--- middleware now takes care of validation
```

```
server.get('/greet', (req, res) => {
    res.json({ greeting: `Hello ${req.name}` })
}) // could use $req.query.name instead of passing down value

server.get('/farewell', (req, res) => {
    res.json({ greeting: `Goodbye ${req.name}` })
})
```

```
server.get('/', (req, res) => {
    res.json({ success: true });
});
```

This root route would give you an error and tell you you need to enter a name
This is because server.use() is global middleware so applied to every route

#### Locally scoping middleware:

```
const validateName = (req, res, next) => {
    const name = req.query.name;
    if (!name) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a name' })
        return;
    }
    req.name = name;
    next();
}

server.get('/greet', validateName, (req, res) => {
})
```

Route handlers are also middleware. Never going to call next, which is why we don't include next
The next() parameter is still being passed, we just ignore it

#### Sessions:

A session contains client-specific data that will persist across requests
Some persistent state you maintain across your requests

- Browsers store little pieces of information for servers
  - Cookies
- The browser sends up the cookie to the server when you make a request to the server
  - Has a different cookie for each server that you're accessing
  - Cookie contains client-specific information
- Server can update that information in some way
- Browser maintains that cookie
- Server reads the cookie

##### express-session:

Express-session is a function that accepts one parameter, which is an object of options.

- One of the options you have to pass in is the secret
  - Secret is a long random string
    - Used to persist the session in a secure way

pwgen is a way to generate a secret
`pwgen -s 50`
The dash s makes it machine readable. Otherwise it tries to make it human-readable

```
const session = require('express-session')
server.use(session({
    secret: '6rbjkIyQ2NvCvnQ9kyVvgbndfTWnVmztpEhSV4cjvJEPVkiQni'
}))
```

We now have a way to persist information across requests

```
server.get('/view-counter', (req, res) => {
    const session = req.session
    if (!session.viewCount) {
        session.viewCount = 0;
    }
        session.viewCount++;
        res.json({ viewCount: session.viewCount })
        // req.session is a persistent object that you'll see
            // across requests for the same client
    // contains all the session variables that you set
}) // First get request is 1, second is 2 / Doesn't just persist across one route
```

Every time server restarts, session will be cleared

##### req.session

object that persists across requests for a specific client that you can modify and use - If you open your site on Chrome and in Postman, they will have different viewCount

### Passwords:

#### Storing passwords:

Sites store your credentials so that it can authenticate
How should we store passwords?

```
const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})

{
    email: 'karthik@karthik.som',
    password: 'asdf'
}
```

Don't want to store plaintext passwords
If some attacker or user is able to access the field, they would be able to log in as someone else

We store hashed passwords
"asdf"
Instead of storing it directly, we apply a hash function to it
hash("asdf") => "adifhauoyogr4385489tyhrfa;fa;"

- Takes a password and converts it to a seemingly random string
  - Hash is a one-way function
  - It is difficult to reverse an output to get input (original password)
  - Can go password => hash of password
  - Can't go hash => password
- We store the hash rather than the password.

There's a lot of details in order to get a good hash function and to make it robust and work in a lot of cases

Hypothetically, my password is a single letter

- Hacker will see hash, but won't be able to unhash
- But instead, they can call the original hash function on a bunch of inputs and see what the output is
- Then I'm going to compare the output to the hash

#### Rainbow table:

Applying the hash function to a bunch of inputs and comparing them to a hash

```
const hashA = hash("a")
const hashB = hash("b")
const hashC = hash("c")

const rainbowTable = {
    hashA = "a"
    hashB: "b",
    hashC: "c"
}
```

`rainbowTable["adiufhyaugudgfaytfgiydagfyuhaifj"] => "a"`

Hackers can generate rainbow tables

Want to make sure that password is long

Instead of being one letter, it's 10 lowercase characters,
26^10 of possibilities

Want long passwords

Can't guarantee that a user will give you a long password
User could give you a short password

We want to make sure that whenever we hash, we hash a large string
In order to make a good hash, we introduce a salt.

##### A salt is a long random string that's generated by the server

Instead of hash(password)....

- hash(salt + password)
- hash(password + salt)

Now even if a user provides a one character password, our salt is long.
Our salt is 50 or 100 characters long
Makes it really hard to generate a rainbow table
Can't store all that, much less generate it

Salts are great for combatting rainbow table/dictionary attacks.

1. Salt to prevent dictionary attacks with rainbow tables
2. We would ideally like our hash function to be somewhat slow

The reason rainbow tables are effective is that if the hash function is easy to compute, it's easy to run the hash function millions or billions of times to generate the hash functions
You don't want to make your users wait while you generate your hash, but want it to take 100ms to 200ms

- Hacker can only generate 10 hashes per second
  - Will take a really long time to generate a rainbow table

Even as computers get more powerful and can compute more, if we make things slow now, it'll really help prevent attacks in the future even when we have more compute power available to generate attacks faster.

##### bcrypt is a hash function

Has these properties (salt and ability to be slow)

- When we run bcrypt, we can specify a cost (which is a number)
  - Each increment to cost is going to significantly increase the amount of work necessary to make a hash

`bcrypt("asdf", 10) // 1ms`
`bcrypt("asdf", 12) // 100ms`

Cost is exponential

- bcrypt has a flexible cost parameter that you can specify.
- Even down the line when computers are faster, you can increment the cost and make your hash function take a good amount of time.

In order to use bcrypt, we use bcrypt module

bcrypt.hash(takes plaintext password, cost, and a callback):

```
const bcrypt = require('bcrypt')
bcrypt.hash('asdf', 11, (err, hash) => {
    if (err) {
        throw err
    }
    console.log(hash)
}
// Console.log provided :
    // '$2a$11$sPiHoqTQEVVmiMR2jcaBLuGuCQCX5VRLEJy0gL0LRjFflSKguGgNS'
// const hash = '$2a$11$sPiHoqTQEVVmiMR2jcaBLuGuCQCX5VRLEJy0gL0LRjFflSKguGgNS'
```

Now that we don't store plaintext password, how do we confirm the password?
We can ask them for their username and password
Hash given password and compare with stored hash

bcrypt.compare

- Accepts plaintext password and compares with a hash

```
bcrypt.compare('wrong', hash, (err, isValid) => {
    if (err) {
        throw err;
    }
    if (isValid) {
        console.log('The password 'wrong' is invalid')
    } else {
        console.log('The password 'wrong' is invalid')
    }
})
```
