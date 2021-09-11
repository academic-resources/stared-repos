const { User, Post } = require('../models');

async function createUser(username, email) {
  // when creating this new user, we have a couple options
  // we can do it in two steps...use the build method on the User class, and then call save on the user instance
  // const user = User.build({ username: username, email: email });
  // await user.save();

  // alternatively, we can do both in one step by calling create
  const user = await User.create({ username, email });
  // we call toJSON here to clean up our terminal output
  // this will convert the user object into a POJO with only the properties from our DB
  console.log(user.toJSON());
}

// createUser('charlie', 'charlie@joe.com');

async function createPost(body, userId) {
  const post = await Post.create({ body, userId });
  console.log(post.toJSON());
}

// createPost('sequelize is scary cool', 1);

async function createLike() {
  const user = await User.create({ username: 'maisie', email: 'maisie@maisie.com' });
  const post = await Post.create({ body: 'cats are the best', userId: 1 });
  // the associations set up on the post model give us access to a number of helper methods
  // calling addLike on the post, passing in a user instance will create new entry in our Likes table with the appropriate userId and postId
  await post.addLike(user);
}

// createLike();
