const { User, Post } = require('../models');
const { Op } = require('sequelize');

async function getUserByIdAndUpdate(id, username) {
  // find a user based on given id, specify that we only want the username returned
  const user = await User.findByPk(id, { attributes: ['username'] });

  // we can update the username property and then save the changes to the db
  // user.username = username;
  // await user.save();
  console.log(user.toJSON());
}

// getUserByIdAndUpdate(1, 'joeeeee');

async function getPosts(searchTerm) {
  // find all posts where the body column contains the given search term
  const posts = await Post.findAll({
    where: {
      body: {
        // https://sequelize.org/v5/manual/querying.html#operators
        [Op.substring]: searchTerm,
      },
    },
  });
  console.log(posts.map((post) => post.toJSON()));
}

getPosts('a');
