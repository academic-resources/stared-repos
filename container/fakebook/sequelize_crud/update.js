const { User } = require('../models/index');

async function updateUser() {
  const user = await User.create({ username: 'jim', email: 'jim@jim.com' });
  // we can reassign properties like we normally would
  user.username = 'dan';
  // calling save will make the necessary db update
  await user.save();
  console.log(user.toJSON());

  // update as a class method
  // first argument is an object with the fields we intend to update
  // second is our options object where we can specify our where condition
  // this will update the email of every user with the username jm
  await User.update({ email: 'didthiswork@gmail.com' }, { where: { username: 'jm' } });
}

updateUser();
