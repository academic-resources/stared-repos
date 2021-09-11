const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');

router
  .route('/')
  .get(PostsController.index)
  .post(PostsController.newPost);

router
  .route('/:id')
  .get(PostsController.getPost)
  .delete(PostsController.deletePost)
  .put(PostsController.replacePost)
  .patch(PostsController.updatePost);

module.exports = router;
