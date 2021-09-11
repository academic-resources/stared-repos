
# Amusement Park Tracker with Authentication

This project picks up where the first Amusement Park Tracker project left off!
In the provided starter project, you can view, create, update, and delete both
parks and attractions. In this project you'll extend the provided application
with the following features:

* User self-registration and login; and
* Ability for users to record visits to park attractions.

## Phase 0: Download the starter project

Clone the starter project:

```sh
git clone https://github.com/appacademy-starters/express-amusement-park-tracker-with-auth.git
```

Then complete the following set up steps:

* Create the database and limited access database user;
* Add an `.env` file containing the variables from the `.env.example` file;
* Install the project's dependencies (`npm install`); and
* Use the Sequelize CLI to apply the provided database migrations and seeder.

Now you can start (`npm start`) and test the application!

## Phase 1: Create the User model

The `User` model should include the following properties:

* `emailAddress` - A non-nullable string (length: 255) representing the user's
  email address;
* `firstName` - A non-nullable string (length: 50) representing the user's first
  name;
* `lastName` - A non-nullable string (length: 50) representing the user's last
  name; and
* `hashedPassword` - A non-nullable binary string representing the user's hashed
  password.

Use the Sequelize CLI to generate the `User` model and migration. Then edit both
files to use the expected attribute and column configuration. Remember to make
the `hashedPassword` attribute have a datatype of `STRING.BINARY`.

Apply the migration when you're ready.

## Phase 2: Configure Express to use sessions

Take a moment to install:

```sh
npm install express-session
```

Now let's configure your session store. Add the `express-session` middleware to
the `app` module:

```js
const session = require('express-session');
```

Make sure you have required `session` from the `express-session` package and
have your application use the session. Make sure you configure the session with
both `resave` and `saveUninitialized` set to `false`.

Take a moment set a `SESSION_SECRET` environment variable in your `.env` file.
Add a key of `sessionSecret` connected to the `process.env.SESSION_SECRET` in 
your `./config/index.js` module as well. As a reminder, you can generate a
[UUID] to have a more secure `sessionSecret` variable value.

In the `app` module, make sure to also import the `sessionSecret` in your
`./config` require statement. As a reminder, be sure to use the same `secret`
value for the `express-session` and `cookie-parser` middleware.

Your session should be configured like so:

```js
app.use(session({
  secret: sessionSecret, 
  resave: false, 
  saveUninitialized: false,
}));
```

## Phase 3: Support user self-registration

Now it's time to add the user registration form.

Begin by creating a `./routes/user` module. Import `express` and instantiate a
`router` with `express.Router()`. Import your `db` from your `../db/models` and
create `GET` and `POST` routes for the "Register" page (`/user/register`). Make
sure to use CSRF protection as well the `bcryptjs` npm package to hash user
passwords. Lastly, don't forget to export the router module you have just
created.

Take note that you already have a `routes/utils.js` module that holds utility
functions like the `csrfProtection` and `asyncHandler` methods you are familiar
with. Import both of these methods into your `./routes/user` module with a
require statement to the `./utils` module like so:

```js
const { csrfProtection, asyncHandler } = require('./utils');
```

Now you can use your `csrfProtection` and `asyncHandler` in your `./routes/user`
module!

In your GET `/user/register` route, use `db.User.build()` to initialize a new
user to pass into the `user-register` view. Make sure to also pass in a `title`
for your "Register" page as well as a `csrfToken` (with a value of
`req.csrfToken()`). Add `csrfProtection` to your route, and let's create your
`user-register` template.

Render a template that extends the main layout and has a form within
`block content`. Take note of the mixins in the `utils.pug` file that are
available for you to use. The form should contain the following input fields:

* First Name
* Last Name
* Email Address
* Password
* Confirm Password

Don't forget to have a hidden input field for your `_csrf` field as well as a
submit button. Once you have your view set up, let's create your POST route for
user registration!

In your POST `/user/register` route, make sure to use `userValidators` in
addition to your `csrfProtection` middleware. This means you'll need to import
`check` and `validationResult` from `express-validator`.

At this moment, implement the following validation rules:

* `firstName`
  * Not null or empty
  * Not longer than 50 characters
* `lastName`
  * Not null or empty
  * Not longer than 50 characters
* `emailAddress`
  * Not null or empty
  * Not longer than 255 characters
  * Is a valid email address
  * Should not be in use by an existing account
* `password`
  * Not null or empty
  * Not longer than 50 characters
  * Should contain at least 1 lowercase letter, uppercase letter, number, and
    special character (i.e. "!@#$%^&*") Hint: review the _Implementing
    Session-Based Authentication_ reading and see below for reminders on how to
    [use regex] for validation!
* `confirmPassword`
  * Not null or empty
  * Not longer than 50 characters
  * Should match the provided `password` value

### Regex Reminders

* The hat operator `^` is used to start matching at the beginning of the
  password.
* The expression `(?=.*[a-z])` is used to check that the password contains at
  least one lowercase character.
* The expression `(?=.*[A-Z])` is used to check that the password contains at
  least one uppercase character.
* The expression `(?=.*[0-9])` is used to check that the password contains at
  least one numeric character.
* The expression `(?=.*[!@#$%^&*])` is used to check that the password contains
  at least one special character.

Now return to your POST route and wrap your asynchronous route function with
your `asyncHandler` so that you can `await` certain processes in your route.
Begin by destructuring the `emailAddress`, `firstName`, `lastName`, and
`password` from your `req.body` object. Then use the `emailAddress`,
`firstName`, and `lastName` variables (but not the `password` variable) to
build a user with the `db.User.build()` method.

At this point, generate your `validatorErrors` within your route by using the
`validationResult` method from `express-validator`. If the `validatorErrors` are
empty, `await` the generation of your `hashedPassword` created with
`bcrypt.hash()`. Make sure import `bcrypt` by installing and requiring the
`bcryptjs` package. Remember that the first argument of `bcrypt.hash()` is a
password string. You can use use an integer for the second argument to
auto-generate a salt that will be incorporated in the password hash process.
After hashing the user password, set the `user.hashedPassword` property and
`await` the save of your user instance. Lastly, redirect the user to the home
page (`/`) upon successful registration.

If the `validatorErrors` are NOT empty, use `array()` to transform the
`validatorErrors` object into a mappable array. Map over each `error` object in
the array and pluck out each error's `msg` property to generate an array of
error messages. Lastly, re-render your `user-register` form and pass in your
`title` of "Register", the `user` object, the `errors` array, and the
`csrfToken`.

Now run your application and test the `/user/register` route! Remember that you
can test your route by registering a user through the form and using Postbird to
confirm whether or not your user has been persisted to the database. 

## Phase 4: Support user login

Now it's time to add the user login form! Begin by updating the `./routes/user`
module with `GET` and `POST` routes for the "Login" page (`/user/login`). Make
sure to use CSRF protection for both routes.

Render your `user-login` template in your GET `/user/login` route. Pass along a
`title` for your "Login" page as well as a `csrfToken`. Now let's create the
view template for your login page!

Create a `user-login.pug` template in your views directory. Think of how you can
include and re-use mixins from your `utils.pug` file just like in your
"Register" page. The "Login" form should contain an "Email Address" field, a
"Password" field, a hidden `_csrf` field, and a submit button.

Now let's revisit the POST `/user/login` route. You'll want to validate your
login form data, so take a moment to implement the following validation rules:

* `emailAddress`
  * Not null or empty
* `password`
  * Not null or empty

After your `loginValidators` have been created, wrap your asynchronous route
function within your `asyncHandler` function and destructure the `emailAddress`
and `password` from your `req.body` object. Generate your `validatorErrors` by
passing in the `req` body into the `validationResult` function. Also take a
moment to initialize an `errors` array. You'll manually _push_ error messages to
render into this array.

If your validation errors are empty, try to find the user by their email
address. You can `await` the database fetch of a `user` by using the
`db.User.findOne()` function `where` the user has a matching `emailAddress`. If
the user exists, use the `bcrypt.compare()` function to check whether the
`user.hashedPassword` (parsed into string format) property matches the provided
password from `req.body`. If there is a password match, log in the user (for
now just leave yourself a `TODO` comment to log in the user) and redirect the
user to the home page (`/`).

If your validator errors are empty and the user was not found, or the password
did not match the `hashedPassword`, display an error message to the user by
pushing in a "Login failed for the provided email address and password" message
into the `errors` array you initialized.

If your validation errors are not empty, convert your `validatorErrors` object
into an mappable `errors` array to pluck error messages and generate an array of
error messages. Lastly, you need to render a `user-login` view for this route.
Make sure to pass in the "Login" title, the `emailAddress` from `req.body`, the
`errors` array, and a `csrfToken`.

### Testing user login

Run the application and browse to the `/user/login` route. You can test the user
login form with the following actions:

* Submit the form with no values.
  * You should see two validation messages asking you to provide values.
* Submit the form with an email address that isn't associated with a user record
  in the database and a password (doesn't matter if the password is correct or
  not).
  * You should see a validation message letting you know that the login attempt
    failed.
* Submit the form with an email address that's associated with a user record in
  the database **but with an incorrect password**.
  * You should see a validation message letting you know that the login attempt
    failed.
* Submit the form with an email address that's associated with a user record in
  the database **and with a correct password**.
  * This time you should be redirected to the "Home" page.

## Phase 5: Persist user login state

Now it's time to handle persisting the user's login state after they've
successfully logged into the website!

### Using sessions to persist a user's login state

Add a new module named `auth` to the root of your project and add function named
`loginUser()` to handle persisting a user's login state to session.

Update the `./routes/user` module to import the `loginUser()` function from the
`auth` module. Then within the `POST` `/user/login` route handler add a call to
the `loginUser()` function just before redirecting the user to the default route
if the password matched.

Also, after a new user has registered in the `POST` `/user/register` route
handler, add a call to the `loginUser()` function after saving the user to the
database but before redirecting then to the default route.

### Testing user login state persistence

Run the application (if it's not already running) and use the "Register" and
"Login" pages to register a new user and login an existing user. Everything
should work as it did before, but the user's login state is being persisted in
session.

At this point in the project, there isn't any visual indication if the user is
logged in or not (that's something that you'll fix in a bit). If you open your
developer tools and view the "Application" tab, you can view the cookies for
`http://localhost:8080`. After registering a new user or logging in an existing
user, you should see a cookie named `reading-list.sid`. That's the session
cookie!

## Phase 6: Restore the authenticated user from session

Now that you're persisting a user's login state to session, you need to make
that user's information easily accessible to your application when it's
processing requests.

In the `auth` module, define a middleware function named `restoreUser()` to
retrieve the user's information from the database if they're authenticated.

The function should check if the `req.session.auth` property is defined to
determine if there's an authenticated user. If there is, extract the `userId`
from the `req.session.auth` property and retrieve the user from the database.

If the user is successfully retrieved from the database, then use the
`res.locals` object to define and set two properties:

* `authenticated` - Set to `true` to indicate that the current request has an
  authenticated user; and
* `user` - Set to the user that was just retrieved from the database.

If the `req.session.auth` property isn't defined or if retrieving the user from
the database throws an error then set the `res.locals.authenticated` property to
`false` to indicate that the current request doesn't have an authenticated user
(i.e. it's an anonymous request).

After defining the `restoreUser()` function, export it from the `auth` module
and import it into the `app` module. Then add the `restoreUser()` middleware
function to the application just before the routes are added.

## Phase 7: Display the user's login state

It's helpful to display to the end user whether or not they're currently logged
in. A common approach is to display login and registration links or a welcome
message in the header of the website.

If the user isn't logged in, they would see links to log in or register:

> Login | Register

If the user is logged in, they would be welcomed and have access to logging out:

> Welcome «current user name»! | Logout

To do that, update your `./views/layout.pug` template to use the
`locals.authenticated` property to determine if the current user is logged in or
not.

If the current user is logged in, then render a short, friendly "welcome"
message is along with a simple form that contains a single "Logout" submit
button:

```pug
span(class='navbar-text px-4') Welcome #{user.firstName}!
form(class='form-inline pr-4' action='/user/logout' method='post')
  button(class='btn btn-sm btn-warning' type='submit') Logout
```

If the current user isn't logged in, then render links (styled as buttons using
Bootstrap CSS classes) to the "Login" and "Register" pages.

```pug
span(class='navbar-text px-4')
  a(class='btn btn-sm btn-dark mr-2' href='/user/login') Login
  a(class='btn btn-sm btn-dark' href='/user/register') Register
```

Now if you run and test your application, you'll see the current user's login
state displayed in the header! If you log in and click the "Logout" button in
the header, you'll receive a "Page Not Found" error. This is occurring because
the `POST` `/user/logout` route doesn't exist. Time to fix that!

## Phase 8: Implement user logout

Define and export a `logoutUser()` function in the `auth` module that removes
the `auth` property from the `req.session` object.

Then add a `POST` `/user/logout` to the `./routes/user` module to process `POST`
requests from the logout form. Import the `logoutUser()` function from the
`auth` module and call it within the `POST` `/user/logout` route handler then
redirect the user to the default route.

The `POST` `/user/logout` route isn't modifying any of the user's data in the
database so there's no need to protect it from CSRF attacks.

### Testing the latest changes

Run the application and use the "Login" page to login an existing user. You
should now see the user's first name displayed in the header.

After logging in, you should see something like this logged to the console:

```sh
Session {
  cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
  auth: { userId: 1 }
}
```

Now click the "Logout" button, and you should be redirected to the "Login" page.
In the console you should see that the `session.auth` property is no longer
defined on the `session` object:

```sh
Session {
  cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
}
```

## Phase 9: Support user attraction visits

Now you're ready to add support for user attraction visits.

### Create the AttractionVisit model

The `AttractionVisit` model should include the following properties:

* `visitedOn` - A non-nullable date only attribute representing the date that
  the user visited the attraction;
* `rating` - A non-nullable integer attribute representing the user's rating of
  the attraction; and
* `comments` - A nullable text attribute representing the user's comments about
  the attraction.

Use the Sequelize CLI to generate the `AttractionVisit` model and migration.
Then edit both files to use the expected attribute and column configuration.

Before applying the migration, associate the model with both the `Attraction`
and `User` models:

```js
// ./db/models/attractionvisit.js

'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttractionVisit = sequelize.define('AttractionVisit', {

    // Code removed for brevity.

  }, {});
  AttractionVisit.associate = function(models) {
    AttractionVisit.belongsTo(models.Attraction, {
      as: 'attraction',
      foreignKey: 'attractionId'
    });
    AttractionVisit.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };
  return AttractionVisit;
};
```

```js
// ./db/models/attraction.js

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attraction = sequelize.define('Attraction', {

    // Code removed for brevity.

  }, {});
  Attraction.associate = function(models) {
    Attraction.belongsTo(models.Park, {
      as: 'park',
      foreignKey: 'parkId'
    });
    Attraction.hasMany(models.AttractionVisit, {
      as: 'visits',
      foreignKey: 'attractionId'
    });
  };
  return Attraction;
};
```

```js
// ./db/models/user.js

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    // Code removed for brevity.

  }, {});
  User.associate = function(models) {
    User.hasMany(models.AttractionVisit, {
      as: 'visits',
      foreignKey: 'userId'
    });
  };
  return User;
};
```

Then update the `./db/migrations/[timestamp]-create-attraction-visit.js`
migration file with the `userId` and `attractionId` foreign key columns:

```js
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AttractionVisits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      attractionId: {
        allowNull: false,
        references: {
          model: 'Attractions',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },

      // Code removed for brevity.

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AttractionVisits');
  }
};
```

These model associations create a one-to-many relationship between the
`Attraction` and `AttractionVisit` models and a one-to-many relationship between
the `User` and `AttractionVisit` model. Alternatively, you can think of the
relationship as a many-to-many between the `Attraction` and `User` models (i.e.
an attraction can be visited by many users and a user can visit many
attractions).

Apply the migration when you're ready.

### Update the Attraction Detail page

Update the Attraction Detail page to display a list of attraction visits.
Display an "Add Visit" button (a hyperlink styled as a button using Bootstrap's
CSS classes) above the list of attraction visits that when clicked, navigates
the user to the "Add Visit" page.

### Add the Add Visit page

Add a `./routes/visit` module, then add the `GET` and `POST` routes for the
"Add Visit" page:

```js
const visitValidators = [
  // TODO Define validators.
];

router.get('/attraction/:attractionId(\\d+)/visit/add', csrfProtection,
  asyncHandler(async (req, res) => {
    // TODO Implement route handler.
  }));

router.post('/attraction/:attractionId(\\d+)/visit/add', csrfProtection, visitValidators,
  asyncHandler(async (req, res) => {
    // TODO Implement route handler.
  }));
```

In your POST `/user/register` route, make sure to use `visitValidators` in
addition to your `csrfProtection` middleware. This means you'll need to import
`check` and `validationResult` from `express-validator`.

Implement the following validation rules:

* `visitedOn`
  * Not null or empty
  * Is a valid date
* `rating`
  * Not null or empty
  * Is an integer between 1 and 5

Render a template that extends the main layout and has a form within
`block content`. Take note of the mixins and `validationErrorSummary` template
that are available for you to use. The form should contain the following input
fields:

* Visited On
* Rating
* Comments

### Require a logged in user

To add a new visit, the user needs to be logged into the website. Without a
logged in user, you wouldn't know who to add the visit for!

Add a new function named `requireAuth()` to the `auth` module. Update the
`requireAuth()` function to redirect the user to the "Login" page if the
`res.locals.authenticated` property is set to `false`, otherwise pass control to
the next middleware function by calling the `next()` method.

Then import the `requireAuth()` function into the `./routes/visit` module and
add it to the `GET` and `POST` routes for the "Add Visit" page:

```js
router.get('/attraction/:attractionId(\\d+)/visit/add', requireAuth, csrfProtection,
  asyncHandler(async (req, res) => {
    // Code removed for brevity.
  }));

router.post('/attraction/:attractionId(\\d+)/visit/add', requireAuth, csrfProtection, visitValidators,
  asyncHandler(async (req, res) => {
    // Code removed for brevity.
  }));
```

Now, if the current user isn't logged in, they'll be redirected to the "Login"
page if they attempt view the "Add Visit" page!

## Bonus Phase 1: Adding the Edit Visit and Delete Visit pages

* Add the edit and delete attraction visit routes and views.
* Only display the "Edit" and "Delete" buttons on a visit if the visit's user is
  the current user.
* Check that the current user is the owner of the visit before allowing them to
  edit or delete it.

## Bonus Phase 2: Locking down parks and attractions

* Add an attribute to the `User` model that allows you to indicate which users
  are "Admin" users.
* Update the park and attraction CRUD routes to only allow authenticated "Admin"
  users.


[UUID]: https://www.npmjs.com/package/uuid

[use regex]:
https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
