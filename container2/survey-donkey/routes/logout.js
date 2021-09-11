const { loginUser, logoutUser } = require('../auth');
const express = require("express");
const router = express.Router();

router.post('/logout', (req, res) => {
    logoutUser(req, res);
    res.redirect('/');
  });

  module.exports = router;
