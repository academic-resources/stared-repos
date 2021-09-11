const post = require("../models/users");
const Post = require("../models/posts");

module.exports = {
  // [GET] /posts This route will return an array of all posts.
  index: async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [POST] /posts This route should save a new blog post to the server.
  newPost: async (req, res) => {
    try {
      const newPost = new Post(req.body);
      const post = await newPost.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /posts/:id This route will return the post with the matching id (_id on the db document) property.
  getPost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [DELETE] /posts/:id This route should delete the specified blog post.
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndRemove(id);
      res.status(200).json({ success: `Post ${id} was removed.` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [PUT] /posts/:id This route should update post by replacing all fields
  replacePost: async (req, res) => {
    // Todo: Enforce require all fields?
    try {
      const { id } = req.params;
      const updatedPost = req.body;
      const result = await Post.findByIdAndUpdate(id, updatedPost);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [PATCH] /posts/:id This route should update post by patching select fields
  updatePost: async (req, res) => {
    // Todo: Enforce require some fields?
    try {
      const { id } = req.params;
      const updatedPost = req.body;
      const result = await Post.findByIdAndUpdate(id, updatedPost);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
