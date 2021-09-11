# REST API Review - Node/Express
## Knex, PostgreSQL, JWT, deployed on Heroku
### With an emphasis on git hygiene and deployment practices

## Table of Contents
- [Page 1](README.md) Deploy Simple Express App
  - [Description](#Description)
  - [Initial Commit](#Initial-Commit)
  - [Connect To Remote](#Connect-To-Remote)
  - [Initializes Node/NPM](#Initializes-NodeNPM)
  - [Installs Dependencies](#Installs-Dependencies)
  - [Updates package.json](#Updates-package.json)
  - [Writes Test for Server Endpoint](#Writes-Test-for-Server-Endpoint)
  - [Adds Server Endpoint](#Adds-Server-Endpoint)
  - [Adds Logger Middleware](#Adds-Logger-Middleware)
  - [Deploys Application to Heroku Staging](#Deploys-Application-to-Heroku-Staging)
  - [Updates Documentation](#Updates-Documentation)
  - [Deploys application to Heroku production](#Deploys-application-to-Heroku-production)
- [Page 2](Section2.md) Build User Routes
  - [Configures knex](Section2.md#Configures-knex)
  - [Creates migration for users table](Section2.md#Creates-migration-for-users-table)
  - [Configures db entry point](Section2.md#Configures-db-entry-point)
  - [Adds Users Route](Section2.md#Adds-Users-Route)
  - [Adds validation for `POST`](Section2.md#Adds-validation-for-POST)
- [Page 3](Section3.md) Deploy Auth
  - [Restricts Users Route](Section3.md#Restricts-Users-Route)
  - [Adds tests for Login and Register endpoints](Section3.md#Adds-tests-for-Login-and-Register-endpoints)
  - [Adds Login and Register endpoints](Section3.md#Adds-Login-and-Register-endpoints)
  - [Updates documentation](Section3.md#Updates-documentation)
  - [Deploys](Section3.md#Deploys)


<br />

**requirement:** you must have [pgadmin](https://www.pgadmin.org/download/) installed for this review.

<br />

## Description

This document is meant to serve as a checklist review of materials taught in the Node Unit of the Full Stack Web Curriculum at Lambda School.

Upon completion of this review, you should have a simple application that _could_ be used as a boilerplate, upon which you can build out custom models, routes, and helpers to suit individual needs. However, don't use a boilerplate to do something like this until you can build it from scratch on your own. Do the reps to earn it, this document is just a guide.

The code samples included in this review should be considered a 'bare minimum' and should be embellished on in any way. In some instances there is no code included, simply instructions to author something on your own. Seriously don't just copy this. Write excellent tests, thoughtful documentation, and return meaningful data. Some commands and code examples may differ slightly from what you were taught in lectures, but the underlying principles will remain the same.


## Initial Commit

Create a directory for your API to live in

In your terminal:

- [ ]	`mkdir < server-directory-name > && cd < server-directory-name >`

> **NOTE:** the `&&` in this first command executes both commands in sequence, or one after the other. Having this command on one line creates the directory and then changes into it so that the following commands are executed in the newly created root directory. Great for this use case, but use with caution in other contexts.
> 
> All further terminal commands in this review take place in the root directory.

- [ ] `git init`
- [ ] `npx gitignore node` //creates .gitignore for node

<br />

## Connect to remote


- [ ] Login to your github account and create a new repo. Don't add a README or a .gitignore, we're doing that ourselves. Give the repo a meaningful name (I like to use the same name as the local directory we created above), and once it's created copy the URL provided.

In your terminal:

- [ ] `git add .gitignore`
- [ ] `git commit -m "Initial Commit"`
- [ ] `git remote add origin <remote_repo_rl>` (the url from your github remote)
- [ ] `git push -u origin master`
- [ ] `git checkout -b "initialize"`
- [ ] `git push -u origin initialize`

Now you have a remote repo connected to your local repo, and you're currently developing on a newly published branch called _initialize_.


<br />


## Initializes Node/NPM

In your terminal:

- [ ] `npm init -y` //creates package.json
- [ ] `git add package.json`
- [ ] `git commit -m "Initializes Node/NPM"`

> **NOTE:** The `-y` flag answers 'yes' to all `npm init` configuration questions. We don't need anything more configured than the stock package.json for now, but explore `npm init` without the `-y` flag later so you have a better idea of what's going on here.

<br />

## Installs dependencies

In your terminal:

- [ ] `npm i express helmet cors knex knex-cleaner dotenv pg bcryptjs jsonwebtoken`
- [ ] `npm i nodemon cross-env jest supertest -D`
- [ ] `git add package.json package-lock.json`
- [ ] `git commit -m "Installs dependencies"`

<br />


## Updates package.json

- [ ] Add server (and start) script(s):

<br />

_package.json_

```json
"scripts": {
	"server": "nodemon",  
	"start": "node index.js" 
}
```
<br />

The `start` script here is used by Heroku. The value we give it tells Heroku to run `node index.js` to start our server.

In your terminal:

- [ ] `git add package.json`
- [ ] `git commit -m "Updates package.json"`
- [ ] `git push`

> **NOTE:** You may notice that the `-m` message in each of these commits so far is taken from the header of that section. Throughout this review, continue to follow the commit format laid out above, and if you need to see which files to `add` use `git status`. Following this commit flow will yield a really nice commit history that can also serve as a checklist on future reps through this development process. GIT HYGIENE IS SO IMPORTANT TO _GOOD_ EMPLOYERS!!!!


<br />

## Writes test for Server endpoint

Start a new branch called `tests/server-endpoint`:

- [ ] `git checkout -b "tests/server-endpoint"`
- [ ] `git push -u origin tests/server-endpoint`

Add the following files to the root directory, and don't forget the `API` directory:

- [ ] index.js
- [ ] API/server.js
- [ ] API/server.spec.js

- [ ] build your application's entry point in index.js

_index.js_

```javascript
const server = require('./API/server.js');

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n<<< Server running on port ${port} >>>\n`);
})
```

- [ ] and add a simple test:

_API/server.spec.js_

```javascript
const request = require("supertest");

const server = require("./server.js");

it("should set db environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
  describe("GET /", function() {
    it("should return 200", function() {
      // run the server
      // make a GET request to /
      // see that the http code of response is 200
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return HTML", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/html/i);
        });
    });
  });
});
```

- [ ] then add a test script to our package.json:

_package.json_

```json
"scripts": {
	"server": "nodemon",
	"start": "node index.js",
	"test": "cross-env DB_ENV=testing jest --watch"
},
```

- [ ] And add a very simple express server:

_API/server.js_

```javascript
const express = require('express');

const server = express();

module.exports = server;
```

Then run our tests to watch them fail first,

in your terminal:

- [ ] `npm run test`

- [ ] Now commit this work and push it to the remote.


<br />

## Adds server endpoint

- [ ] Create a new branch called `feat/server-endpoint` and push it up to the remote.

- [ ] Let's finish building out our basic server endpoint so that test can pass:

_API/server.js_

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>🚀</h1>');
})

module.exports = server;
```

Then, in your terminal:

- [ ] `npm run server`, and once you see the server is running in your console,
- [ ] `npm run test` (in a new terminal window, or stop the server first)

- [ ] Commit this work, as long as your test passes.

<br />

## Adds Logger middleware

Adding a logger middleware early is a good idea, so let's do that now.

- [ ] Make a new branch called `middleware/logger` and push it up to the remote.

- [ ] In your root directory, add a new directory called `middleware`
- [ ] Create a file called `logger.js` inside of `middleware`

_middleware/logger.js_

```javascript
module.exports = logger;

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} at ${new Date().toISOString()}`)
  next();
};
```

- [ ] and then let's `.use` the logger in our server.js

_API/server.js_

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('../middleware/logger');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send('<h1>🚀</h1>');
})

module.exports = server;
```

- [ ] Run your server and point your browser to `localhost:5000`. You should see the rocket emoji in your browser window, and when you come back to your terminal you should see something like: `GET to / at dateTime`, which means your logger is logging.

- [ ] Commit this work and push it up.

<br />

## Deploys application to Heroku staging

We now have a super simple express server running, so it's time to deploy! Try to deploy as soon as you have _something_ working, so that whenever you're ironing out any issues in staging, you'll only have to troubleshoot the smallest codebase possible. Deploy early, commit often!

<br />

---

To explain the 3 different environments we'll be using:

- **Development** is the environment on our local machines
	- This is where we write the code
- **Staging** is (in this context) the environment on Heroku that _continuously_ deploys anything on `master`
	- This is where we test and troubleshoot any deploy issues
- **Production** is (in this context) the environment on Heroku that we _manually_ deploy from `master` once staging looks good
	- This is where any client that needs our API accesses it (like a React app)
	- We _only_ manually deploy this app once the new features on our deployed staging server are working as we expect, so that we can be confident in our production server's stability.

---
<br />

- [ ] [Signup/login](https://dashboard.heroku.com/login) to a free Heroku account.

- [ ] Once logged into your Heroku dashboard, click on `New` in the top Right corner, and then on `Create new app`

![Create New Heroku App][new]

[new]: https://res.cloudinary.com/thisbenrogers/image/upload/v1582772590/Screen_Shot_2020-02-26_at_8.38.42_PM_ruzjml.png

- [ ] Give your app a meaningful name, and be sure to use the word `staging` to differentiate it from the `production` app we'll build in a bit. Then click on `Create app`

- [ ] Once your app is created, navigate to the `Deploy` tab (Heroku tends to drop you off here anyhow) and select `GitHub` as the Deployment Method.

- [ ] Connect the app to your remote GitHub respoitory, and enable automatic deploys on `master` branch.

![Connect Heroku to Github Remote][github]

[github]: https://res.cloudinary.com/thisbenrogers/image/upload/v1582772590/Screen_Shot_2020-02-26_at_8.42.27_PM_ressp4.png

Now, since our `master` branch currently only contains a .gitignore file, we'll need to merge our latest `middleware/logger` branch into `master` so Heroku will have something to deploy.

<br />

In your terminal:

- [ ] `git checkout master`

since we know there are no changes on the remote that we need to pull into our branch first, we can:

- [ ] `git merge middleware/logger`
- [ ] `git push origin master`

<br />

> If there were remote changes that we needed to pull into our local branch first, we would need to instead run:
> 
> - `git checkout master`
> - `git pull --rebase origin master`
> - `git checkout middleware/logger`
> - `git pull --rebase origin master`
> - `git checkout master`
> - `git merge middleware/logger`
> - `git push origin master`

<br />

Now in your Heroku Dashboard, you can click on the `Activity` tab and watch Heroku build the application.

![Heroku Activiy Tab][activity]

[activity]: https://res.cloudinary.com/thisbenrogers/image/upload/v1582772590/Screen_Shot_2020-02-26_at_8.46.17_PM_k4hbnn.png

- [ ] Once you see a `Build Succeeded` and a `Deployed` message in the `Activity ` tab, click on 'Open app' in the top right corner and hope for a rocket!

- [ ] While you're in your Heroku dashboard, go ahead and create a new app for production following the above guidance. Connect it to the exact same repository's `master` branch just **DON'T deploy it yet!**

<br />


## Updates Documentation

Now that we have a staging app deployed, it's time to create and update our README.md to reflect the changes we're about to take live on our production deployment. You'll want to follow this deployment flow to allow for the smoothest introduction of new features for anyone working on a client that would be consuming this API: 
> deploy to staging > test/troubleshoot staging deploy > update docs > deploy to production

If you follow this flow every time you're deploying new features, you'll save yourself the rush to explain everything you've changed. All the new features will be documented in the `master` README before the `production` deploy completes, so your team will remain informed about the current state of the deploy.

Use the [Standard Readme](https://github.com/RichardLitt/standard-readme) spec for guidance, and include plenty of meaningful info in your README like a link to the deployed production API (if you already created your production deploy in Heroku, the URL for the production app will be `https://NAME-OF-PRODUCTION-APP-HERE.herokuapp.com`)

- [ ] Create and edit the README.md on a new branch named `docs/README` and push it up to the remote. Then merge that branch into `master`

<br />

## Deploys application to Heroku production

Now that we've updated our docs and been through any troubleshooting on the staging app, we can deploy to production.

- [ ] In your Heroku Dashboard, navigate to the Production app (**not** staging) that we created earlier, and go to the `Deploy` tab. Make sure that automatic deploys are turned off, then manually deploy the `master` branch.

Your staging app is continuously deploying from `master` because we want our newest edits to be live for us to test asap, but we manually deploy production so that we can be sure everything is working correctly before we take our new edits live.

- [ ] Once your production app is deployed, test it out like you did for staging (hopefully rocket!) and pat yourself on the back.

Next we'll create our database and add routes for users to register and login.

<br />

[Next Page](Section2.md#REST-API-Review--NodeExpress) 