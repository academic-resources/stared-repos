const express = require('express');
const router = express.Router();
const { Post, User } = require('../models/index.js');

router.get('/', async (req, res) => {
  // query for posts, and then render a template with all posts
  const posts = await Post.findAll({ include: User });
  res.render('posts', { posts: posts, title: 'Posts' });
});

module.exports = router;
