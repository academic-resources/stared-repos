const { Post, Thread, User } = require('../db/models');

module.exports = async (id, sort) => await Thread.findAll({
  where: { id },
  include: [
    {
      model: Post,
      attributes: ['isQuestion', 'score']
    }, User
  ]
});
