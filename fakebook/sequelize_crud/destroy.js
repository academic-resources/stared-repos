const { User } = require('../models');

async function deleteUserByUsername(username) {
  // destroy is both a class and an instance method
  // when we call destroy on a class, we specify a where condition
  // this will delete all user records where username is jm, chris, or alec
  // await User.destroy({
  //   where: {
  //     username: ['jm', 'chris', 'alec'],
  //   },
  // });
  // delete a specific user based on the username arg
  // await User.destroy({
  //   where: {
  //     username,
  //   },
  // });
  const user = await User.create({ username: 'jm', email: 'jm@jm.com' });
  // calling destroy on a user instance will delete that specific record from the db
  await user.destroy();
}

deleteUserByUsername('dan');
