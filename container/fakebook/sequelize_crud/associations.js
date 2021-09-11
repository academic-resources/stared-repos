const { User, Post } = require('../models');

async function getUserAndPosts(id) {
  // lazy loading
  // query for a specific user
  const user = await User.findByPk(id);

  // then fetch all their posts, using the getPosts method (provided by sequelize once we set up appropriate association)
  const userPosts = await user.getPosts();
  console.log('user', user.toJSON());
  console.log(
    'posts',
    userPosts.map((post) => post.toJSON())
  );

  // eager loading
  // in one query, we fetch a user AND all of their associated posts by using include
  const user = await User.findByPk(id, {
    include: Post,
  });
  console.log(user.toJSON());
}

getUserAndPosts(1);

async function getLikedPosts(userId) {
  // another example of eager loading, this time we query for a user and all of their liked posts
  const user = await User.findByPk(userId, {
    // we specified the alias 'likedPosts' when setting up the belongsToMany association, so we must also specify that here in our include
    include: { model: Post, as: 'likedPosts' },
  });

  console.log(user.toJSON());
}

getLikedPosts(8);
