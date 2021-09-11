const express = require('express');
const bcrypt = require('bcryptjs');
const crsf = require('csurf');
const { validationResult } = require('express-validator');
const {
  asyncHandler,
  loginUser,
  logoutUser,
  userValidator,
  loginValidator
} = require('../utils');

const { User, Thread, Post, Score } = require('../db/models');

const router = express.Router();
const crsfProtection = crsf({ cookie: true });

router.get('/signup', crsfProtection, (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    csrfToken: req.csrfToken(),
    pref: req.query.pref,
    isProduction: process.env.NODE_ENV === 'production'
  });
});

router.get('/', (_req, res) => {
  res.redirect('/users/signup');
});

router.get('/', (_req, res) => {
  res.redirect('/users/signup');
});

router.get('/login', crsfProtection, (req, res) => {
  if (res.locals.authenticated) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'Login',
      csrfToken: req.csrfToken(),
      pref: req.query.pref,
      isProduction: process.env.NODE_ENV === 'production'
    });
  }
});

router.get('/auth', (req, res) => {
  const { authenticated } = res.locals;
  if (authenticated) {
    const { userId } = req.session.auth;
    return res.json({ userId, authenticated });
  } else return res.json({ authenticated });
});

router.post('/login', crsfProtection, loginValidator, asyncHandler(async (req, res) => {
  const { pref } = req.query;
  let user;
  if (String(req.body.identification).match(/@/g)) {
    user = await User.findOne({ where: { email: req.body.identification } });
  } else {
    user = await User.findOne({
      where: { userName: req.body.identification }
    });
  }
  const {
    body: { emailAddress }
  } = req;
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty() && user) {
    loginUser(req, res, user);
    if (pref) {
      res.redirect(pref);
    } else res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((err) => err.msg);
    res.render('login', {
      title: 'Login',
      emailAddress,
      errors,
      csrfToken: req.csrfToken(),
      pref,
      isProduction: process.env.NODE_ENV === 'production'
    });
  }
})
);

router.post('/', crsfProtection, userValidator, asyncHandler(async (req, res) => {
  const { pref } = req.query;
  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      hashedPassword
    });
    loginUser(req, res, user);
    if (pref) {
      res.redirect(pref);
    } else res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((err) => err.msg);
    res.render('signup', {
      title: 'Sign Up',
      ...req.body,
      csrfToken: req.csrfToken(),
      errors,
      pref,
      isProduction: process.env.NODE_ENV === 'production'
    });
  }
})
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    let loggedInUser;
    if (res.locals.authenticated) {
      loggedInUser = res.locals.user.dataValues.id;
    }
    if (user) {
      const logoutButton = user.id === loggedInUser;
      const questionThreads = await Thread.findAll({
        where: {
          userId: id
        },
        order: [['createdAt', 'DESC']],
        limit: 100
      });
      const posts = await Post.findAll({
        where: {
          userId: id,
          isQuestion: false
        },
        include: Thread,
        order: [['createdAt', 'DESC']],
        limit: 100
      });
      // const threadIds = questionThreads.map((thread) => thread.id);

      res.render('profile', {
        user,
        logoutButton,
        questionThreads,
        posts,
        isProduction: process.env.NODE_ENV === 'production'
      });
    } else {
      throw new Error('This user does not exist');
    }
  })
);

router.get('/:userId(\\d+)/votes', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const votes = await Score.findAll({ where: { userId } });
  res.json({ votes });
}));

router.get('/:userId(\\d+)/votes/:postId', asyncHandler(async (req, res) => {
  const { userId, postId } = req.params;
  const vote = await Score.findOne({ where: { userId, postId } });
  res.json({ vote: vote ? vote.isLiked : vote });
  return vote;
}));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/login');
});

module.exports = router;
