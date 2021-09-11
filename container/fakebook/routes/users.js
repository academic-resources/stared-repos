const express = require('express');
const csrf = require('csurf');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { User, Post } = require('../models');

const csrfProtection = csrf({ cookie: true });

router.get('/register', csrfProtection, (req, res) => {
  res.render('new-user', { csrfToken: req.csrfToken() });
});

router.get('/login', csrfProtection, (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
});

router.post('/', csrfProtection, async (req, res) => {
  console.log(req.likesBanana); // accessing the likesBanana property set in addToReq middleware
  console.log(req.body);
  const { username, email, password } = req.body;
  // we never save the user's password directly to the db, instead we use bcrypt to hash it and store the hashed value
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, hashedPassword });
  // in order to log the user in, we store data about the current user on the req.session object
  req.session.user = { id: user.id, username, email };
  res.redirect('/');
});

router.post('/login', csrfProtection, async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  // attempt to query for a user by email from form input
  const user = await User.findOne({ where: { email } });
  // if no user found, re-render form with errors
  if (!user) {
    return res.render('login', { csrfToken: req.csrfToken(), errors: ['Invalid login credentials'] });
  }
  // use bcrypt to check if valid password
  // since we store the salt we used to originally hash the pw in the db, bcrypt will use that same salt when hashing the password from the form,
  // and then determine if both the result and the hashedPassword in the db are the same
  const isPassword = await bcrypt.compare(password, user.hashedPassword);
  // bcrypt.compare returns a boolean...if true we know they entered the correct password
  if (isPassword) {
    req.session.user = { id: user.id, username: user.username, email };
    return res.redirect('/');
  } else {
    res.render('login', { csrfToken: req.csrfToken(), errors: ['Invalid login credentials'] });
  }
});

router.get('/:id(\\d+)', async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id, { include: Post });
  res.render('profile', { user });
});

router.post('/logout', (req, res) => {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
