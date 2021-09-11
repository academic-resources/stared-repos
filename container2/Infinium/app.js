
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const bcrypt= require('bcryptjs');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const {restoreUser} = require('./auth')
const {sessionSecret, environment} = require('./config')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');
const storiesRouter = require('./routes/stories');
const likesRouter = require('./routes/storylikes');
const followsRouter = require('./routes/follows');
const { asyncHandler } = require('./routes/utils');
const { sequelize } = require('./db/models');

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
const store = new SequelizeStore({
  db: sequelize,
});
app.use(
  session({
    name: 'infinium.sid',
    secret: sessionSecret,
    store,
    resave: false,
    saveUninitialized: false
  }))
store.sync()
app.use(asyncHandler(restoreUser));
app.use('/', indexRouter);
app.use('/stories/:storyId/comments', commentsRouter);
app.use('/users/(\\d+)/stories', storiesRouter);
app.use('/users/:id(\\d+)/follows', followsRouter);
app.use('/stories', storiesRouter);
app.use('/users', usersRouter);
//app.use('/comments', commentsRouter);
app.use('/likes', likesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.status(err.status || 500);
  const isProduction = environment === "production";
  const stack = isProduction ? null : err.stack
  res.render('error', {message: err.message, status: err.status, stack: stack});
});

module.exports = app;
