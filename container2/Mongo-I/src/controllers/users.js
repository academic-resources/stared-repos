const User = require('../models/users');
const Post = require('../models/posts');

module.exports = {
  // [GET] /users This route will return an array of all users.
  index: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [POST] /users This route should save a new user to the server.
  newUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /users/:id This route will return the user with the matching id (_id on the db document) property.
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [DELETE] /users/:id This route should delete the specified user.
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndRemove(id);
      res.status(200).json({ success: `User ${id} was removed.` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [PUT] /users/:id This route should update user by replacing all fields
  replaceUser: async (req, res) => {
    // Todo: Enforce require all fields?
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      const result = await User.findByIdAndUpdate(id, updatedUser);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [PATCH] /users/:id This route should update user by patching select fields
  updateUser: async (req, res) => {
    // Todo: Enforce require some fields?
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      const result = await User.findByIdAndUpdate(id, updatedUser);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /users/:id/posts Lists all posts by specified user
  getUserPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate('posts');
      res.status(200).json(user.posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [POST] /users/:id/posts Saves new post for specified user
  newUserPost: async (req, res) => {
    try {
      const { id } = req.params;
      const newPost = new Post(req.body);
      const user = await User.findById(id);
      newPost.author = user;
      await newPost.save();
      user.posts.push(newPost);
      await user.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
