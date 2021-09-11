# REST API Review - Node/Express
### Section 2


## Configures knex

- [ ] First, since we're working with postgres, we'll need to create a database locally. If you haven't already, download [PG Admin](https://www.pgadmin.org/download/) and create a new db for your project. I'm making a drink recipe API later on, so I'll call mine `cocktailRecipeDB`. Call yours something relevant to your application.

Back in your terminal (in the root folder of this project)

- [ ] Checkout a new branch called `config/knex` and push it to the remote
- [ ] `npx knex init`

This creates a new knexfile.js at the root of our project. Edit it to look similar to this:

```javascript
// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/cocktailRecipeDB',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};

```
> **NOTE:** I'm using an unsecured Postgres DB here, it should be pretty easy to find the correct config for adding credentials.

Notice that we don't include a staging environment here. That's because we have two seperate heroku deploys and we want them to mirror each other as closely as possible, so we'll also point our heroku 'Staging' app to the 'Production' knex config. It'll be using a different db anyhow so having the one env in our simple context is ideal.

- [ ] Commit and push

<br />


## Creates migration for users table

In your terminal:

- [ ] `npx knex migrate:make users`

- [ ] which will create a `_users.js` file in `data/migrations/`, edit it to look like so:

__users.js_

```javascript
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {

    users.increments();

    users
      .string('username', 128)
      .notNullable()
      .unique();

    users 
      .string('password', 128)
      .notNullable();

      users 
      .string('email', 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
}
```

- [ ] Commit and push this work

I am not covering seeding in this review. We will use insomnia or postman to populate our database.

- [ ] **OPTIONAL:** On your own, using google and knexjs.org, find information about seeding a postgres db. Watch out for those primary keys!

## Configures db entry point

- [ ] in the `data/` directory, add a file called `dbConfig.js` and configure knex to process the correct environment.

_data/dbConfig.js_


```javascript
const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = process.env.DB_ENV || 'development'

module.exports = knex(knexConfig[environment]);
```

- [ ] Commit this work and push it up

## Adds Users Route

- [ ] Create a new branch called `feat/users-route` and publish it to the remote

Now we'll build out the model, router, and basic validation for accessing the `Users` resource, so we can use it when registering or logging in.

- [ ] At the root of our project, add a `users/` directory, and add to it 3 files:
	- [ ] user-helpers.js
	- [ ] user-model.js
	- [ ] user-router.js 

	
- [ ] First we'll write our knex query functions to look something like this:

_users/user-model.js_

```javascript
const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db('users').select('id', 'username', 'email');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return findById(id);
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'email')
    .where({ id })
    .first();
}

function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}
```	

- [ ] Now in our router, we're only going to write a `GET` to `/`, a `GET` to `/:id`, and `DELETE` to `/:id`. We'll take care of `ADD` in our Register endpoint later.

_users/user-router.js_

```javascript
const router = require('express').Router();

const Users = require('./user-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The user with the specified id does not exist." });
  } else {
    Users.findById(id)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: 'The user information could not be retrieved.' });
    })
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
  Users.remove(id)
   .then(user => {
     res.json(user);
   })
    .catch(err => {
      res.status(500).json({ message: 'The user could not be removed' });
    })
});

module.exports = router;
```

- [ ] Let's navigate now into our server and `.use` our new route.

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('../middleware/logger');

const usersRouter = require("../users/user-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use("/api/users", usersRouter);

server.get('/', (req, res) => {
  res.send('<h1>🚀</h1>');
})

module.exports = server;
```

- [ ] Test out your new route by starting up your server and pointing postman or insomnia toward `localhost:5000/api/users`. You should return an empty array with a status of `200`.

- [ ] Commit this work and push


## Adds validation for `POST`

Always remember to add good validation for any `POST` or `PUT` methods. The following is an incredibly basic validation function, make sure that when you're validating it's in a more meaningful way.

- [ ] in your `user-helper.js`

_users/user-helper.js_

```javascript
module.exports = {
  validateUser
};

function validateUser(user) {
  let errors = [];

  if (!user.username || user.username.length < 2) {
    errors.push('Username must contain at least 2 characters');
  }

  if (!user.password || user.password.length < 4) {
    errors.push('Password must contain at least 4 characters');
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };

} 
```

- [ ] Commit and push

[Next Page](Section3.md#REST-API-Review--NodeExpress) 