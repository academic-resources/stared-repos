const express = require('express');
const csrfProtection = require('csurf')({ cookie: true });
const router = express.Router();
const sanitize = require('sanitize-html');

const { Thread, User } = require('../db/models');
const { asyncHandler, sanitizeOptions } = require('../utils');

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const { userId } = req.session.auth ? req.session.auth : { userId: null };
  const thread = await Thread.findByPk(req.params.id);
  const { title } = thread;
  const threadPosts = await thread.getPosts({
    include: User,
    order: [
      ['isQuestion', 'DESC'],
      ['score', 'DESC']
    ]
  });
  const threadQuestion = threadPosts[0];
  const threadAnswers = threadPosts.slice(1);

  res.render('threadPage', {
    title,
    threadQuestion,
    threadAnswers,
    userId,
    isProduction: process.env.NODE_ENV === 'production',
    csrfToken: req.csrfToken()
  });
}));

router.get('/new', csrfProtection, function (req, res) {
  if (res.locals.authenticated) {
    res.render('new-question', {
      csrfToken: req.csrfToken(),
      bodyVal: '',
      titleVal: '',
      isProduction: process.env.NODE_ENV === 'production'
    });
  } else {
    res.redirect('/users/login');
  }
});

router.post('/', csrfProtection, asyncHandler(async ({ csrfToken, body: { title, body } }, res) => {
  const { locals: { authenticated, user: { dataValues: { id: userId } } } } = res;

  if (!authenticated) return res.send('You must be logged in to ask a question.');

  const errors = [];

  if (!title) errors.push('The question must have a title.');
  if (!body) errors.push('The question must have a body.');

  if (errors.length === 0) {
    const thread = await Thread.create({ title, userId });
    body = sanitize(body, sanitizeOptions);
    await thread.createQuestion({ body });
    return res.redirect(`/questions/${thread.id}`);
  } else {
    return res.render('new-question', {
      errors,
      csrfToken: csrfToken(),
      bodyVal: body,
      titleVal: title,
      isProduction: process.env.NODE_ENV === 'production'
    });
  }
}));

module.exports = router;
