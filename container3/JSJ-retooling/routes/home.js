const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const { query: { entry: searchTerm } } = req;
  res.render('home', {
    title: 'Javascript Jungle',
    searchTerm,
    isProduction: process.env.NODE_ENV === 'production'
  });
});

router.get('/login', function (req, res, next) {
  res.redirect('/users/login');
});

router.get('/signup', function (req, res, next) {
  res.redirect('/users');
});

module.exports = router;
