//required
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { environment } = require('./config');
const indexRoutes = require('./routes');
const parkRoutes = require('./routes/park');
const attractionRoutes = require('./routes/attraction');
const userRegister = require('./routes/user')
const { v4: uuidv4 } = require('uuid');
uuidv4();
//app setup
const app = express();
app.set('view engine', 'pug');

//middleware
app.use(morgan('dev'));
app.use(cookieParser('9fe743f5-d2bc-46fa-8acd-5e04cd76698c'));
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);
app.use(parkRoutes);
app.use(attractionRoutes);
app.use(userRegister)
app.use(session({
  secret: '9fe743f5-d2bc-46fa-8acd-5e04cd76698c',
  resave: false, //when using default set to false
  saveUninitialized: false,//when using default set to false
}));

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found.');
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Error handler to log errors.
app.use((err, req, res, next) => {
  if (environment === 'production' || environment === 'test') {
    // TODO Log the error to the database.
  } else {
    console.error(err);
  }
  next(err);
});

// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
