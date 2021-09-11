const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const postsApiRouter = require('./api/posts-api')
const usersApiRouter = require('./api/users-api')
const session = require('express-session');
const { User, Post } = require('./models/index.js');

app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'superSecret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static('public'));

function logReqData(req, res, next) {
  console.log('HTTP METHOD:', req.method);
  console.log('PATH:', req.path);
  next();
}

function logSession(req, res, next) {
  console.log(req.session);
  next();
}

function addToReq(req, res, next) {
  if (req.body.username === 'fred') {
    req.likesBananas = true;
  } else {
    req.likesBananas = false;
  }
  next();
}

function getCurrentUser(req, res, next) {
  // only purpose of this middleware is to add current user object to res.locals to make it easy to access in templates
  res.locals.user = req.session.user;
  next();
}

app.use(logReqData);
app.use(addToReq);
app.use(logSession);
app.use(getCurrentUser);

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/api', postsApiRouter);
app.use('/api', usersApiRouter);


app.get('/', async (req, res) => {
  console.log('in the route handler');
  const users = await User.findAll();
  res.render('index', { title: 'Fakebook', users });
  // res.send('<h1>this is our express app</h1>');
});

app.get('/test', (req, res) => {
  res.send('this is the test route');
});

// app.get('/:state/:city', (req, res) => {
//   console.log(req.params);
//   res.send(`state: ${req.params.state}, city: ${req.params.city}`);
// });

app.all('*', (req, res) => {
  res.statusCode = 404;
  res.send('oops, page not found');
});

app.listen(5000, () => console.log('express listening on port 5000!'));
