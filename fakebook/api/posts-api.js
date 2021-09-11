const express = require('express');
const router = express.Router();
const { Post, User } = require('../models/index.js');

router.get('/posts', async (req, res) => {
  // query for posts, and then render a template with all posts
  const posts = await Post.findAll({ include: User });
  res.json(posts)
});

module.exports = router;
