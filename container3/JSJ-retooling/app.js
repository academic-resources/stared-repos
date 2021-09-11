const createError = require('http-errors');
const express = require('express');
const { resolve } = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('./db/models');
const { homeRouter, usersRouter, apiRouter, questionRouter, postRouter } = require('./routes');
const { sessionSecret, environment } = require('./config');
const { restoreUser } = require('./utils');

const app = express();

// eslint-disable-next-line
Array.prototype.asyncMap = async function (_$) {
  const _ = [];
  for (let $ = 0; $ < this.length; $++) _.push(await _$(this[$], $, this));
  return _;
};

app.set('view engine', 'pug');

if (environment === 'development') app.use(require('morgan')('dev'));

const resolveStaticJS = (req, res, next) => {
  const urlMatch = req.url.match(/^\/(index|home|login|interactivity)\.js$/);
  const filename = urlMatch && urlMatch[0].slice(1);
  if (filename) {
    res.sendFile(resolve(__dirname, filename));
  } else next();
};

const staticPath = environment === 'development'
  ? resolve(__dirname, 'public')
  : resolve(__dirname, '../public');
app.use(resolveStaticJS);
app.use(express.static(staticPath));
app.use(express.json());
app.use(cookieParser(sessionSecret));
app.use(express.urlencoded({ extended: false }));

const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    name: 'javascript_jungle.sid',
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false
  })
);

store.sync();

app.use(restoreUser);
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/questions', questionRouter);
app.use('/posts', postRouter);
app.get('/signup', (_req, res) => {
  res.redirect('/users/signup');
});

app.get('/login', (_req, res) => {
  res.redirect('/users/login');
});

app.use(function (_req, _res, next) {
  next(createError(404));
});

app.use(function (error, req, res, _next) {
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  if (error.status === 404) {
    res.render('error', { error });
  } else {
    res.status(error.status || 500);
    res.render('error', { error });
  }
});

module.exports = app;
