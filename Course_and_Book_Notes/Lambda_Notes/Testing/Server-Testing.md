Domain knowledge

- Understanding what problem you're really trying to solve

Question you have to ask while testing: Am I really testing the system or am I testing the library?

- Given these props, am I rendering the right thing?

Go as deep as you need to go to feel happy about the functionality

One unit test and one integration test that hits a database

monogod needs to be running for the integration tests
use jest
--watch
Once it detects the file changes, it will restart the tests
What can we do to help jest detect file changes? (unrelated to Jest itself)
Not testing React, so not snapshots
Not running the server, so don't need nodemon to run it
-u is to update the snapshots
--watch is the process of restarting/going to benefit for a quicker way to know when the files changed

    git init
        because now git is the one that keeps track of the changes and it will know which files changed
            Jest no longer has to look inside files to see what changed

https://github.com/lambdaschool/server-testing
jest, supertest, mongoose, mongodb
API should create and delete a resource of your choosing
Two tests per route handler
Add logic on the route handlers to validate request data
Add tests to verify validation works as intended
Add tests to verify that the endpoints return the correct HTTP status codes
Write the tests before writing the route handlers
Integration tests can be written after the model is created
Mongoose model should have at least a method or static that is tested
(i.e., strings being lowercased)

```
const User = {};

    User.remove({_id: 'asdfafere'})
```

What happens if you don't send a filter? It deletes the entire collection.

Force a test for something that could be dangerous even if you know that your code will take advantage of the library.

Normally company will have a set of requirements:
User Story
As a:
sales exec
I want:
to log in to the system
So that:
I can see my sales for the day
Scenarios:
given (whatever the state of the world is)
given a username and password
when:
the username is valid
and:
the password is incorrect
then:
the system should not allow login
and:
should return an error with 401 status code
and:
should show the following message to the user: "you shall not pass"
and:
and should redirect the user to the login page

created new empty directory

- called git init
- called npm init
- "jest": {
  "testEnvironment": "node"
  }, // so it makes available things that exist in node but not things that exist in only browser
- touch .gitignore - node_modules - .DS_Store
  Users.

server.spec.js

- Jest uses `jsdom` as the default environment - Change it to `node` in the `jest` key in package.json

server.spec.js

```
const request = require('supertest');
const server = require('./server');

describe('server', () => {
    it('should return OK and a JSON object from the index route', async () => {
        const expectedBody = { api: 'running' };

        const response = await request(server).get('/');
        // can do this with promises because this is asynchronous

        expect(response.status).toEqual(300); // first time 300 for sanity check, 200 after
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual(expectedBody)
    })
})
```

server.js

```
const express = require('express')
const server = express();

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
});

server.listen(9000);

module.exports = server;
```

Some of you have been curious: Why does some of the code we have separate the server.use from the server?

- Because it's a common technique to separate the use from the server so you can import the server for tests
- Not going to do that here because you have notes from other repos.

The second time that the test ran, it broke with a EADDRINUSE error because the test is trying to connect to port 9000 every test.

If server is not separated from the use:

```
if(process.env.NODE_ENV !== 'test') {
    server.listen(9000)
    // if the environment is not test, it will spin up the server
    // if it is a test, will export without running it
}
```

`yarn add cross-env`

```
"scripts": {
    "test": "cross-env NODE_ENV=test jest test --watch --verbose" // some people put && between NODE_ENV=test and jest test
}
```

File, Preferences, User Snippets:
javascriptreact.json:

```
"Named Import": {
    "prefix": "nim",
    "body": "import { $2 } from '$1'; $0"
},
"Default Import": {
    "prefix": "dim",
    "body": "import $1 from '$2'; $0"
},
"life": {
    "prefix": "life",
    "body": "(function() {\n\t'use strict';\n\n\t$0\n\n})();",
    "description": "Immediately Invoked Function Expression"
},
"nodeRequire": {
    "prefix": "rem",
    "body": "const $1 = require('$1$2');$0,
    "description": "CommonJS Require"
},
"routeHandler": {
    "prefix": "rhl",
    "body": "'/$1', (req, res) => {\n\t$0\n}",
    "description": "node.js route handler"
},
"Node post route": {
    "prefix": "postroute",
    "body": "server.post('/$1', (req, res) => {\n\t$0\n});",
    "description": "node.js post route handler"
},
"Node get route": {
    "prefix": "getroute",
    "body": "server.get('/$1', (req, res) => {\n\t$0\n});",
    "description": "node.js get route handler"
},
"Jest test case": {
    "prefix": "jestit",
    "body": "it('$1', () => {\n\t$0\n});",
    "description": "node.js get route handler"
},
"Jest test suite": {
    "prefix": "jestst",
    "body": "describe('$1', () => {\n\t$0\n});",
    "description": "jest test suite"
}
```

Integration test example:

User.spec.js

```
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User')


describe('User model, () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testingdb').then(console.log('connected to test db'))
        // need to bring in mongoose and connection to database before tests
    })
    beforeEach(() => {
        return User.remove()
        // if you've already run the test once, you need this remove function once to clear
    })
    afterEach(() => {
        return User.remove()
        // removes all the users in the db
    })
    afterAll(() => {
        return mongoose.disconnect();
        // after tests, disconnect from db
    })
    it('should hash the password before saving the user', async () => {
        const user = { username: 'frodo', password: 'irrelevant' };

        const savedUser = await User.create(user) // new + save

        //how do I know the password was hashed?
        //If you see that the password in the post request is the same in the database, you know it wasn't hashed
        // expect(savedUser.password).toEqual(user.password); // sanity check forced-fail

       expect(savedUser.password).not.toEqual(user.password);
       expect(savedUser.password).toHaveLength(60)
    })
})
```

User.js

```
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10).then(hash => {
        this.password = hash;

        next();
    }).catch(err => {
        next(err)
    })
})

module.exports = mongoose.model('User', userSchema);
```
