
const express = require('express');

const { environment } = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

if (environment !== 'production') {
  router.get('/error-test', () => {
    throw new Error('This is a test error.');
  });
}

module.exports = router;
