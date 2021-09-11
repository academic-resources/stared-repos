const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('users');
    if (id) {
      query.where('id', Number(id)).first();
    }

    return query;
  },
  getUserPosts: function(userId) {
    return db('posts as p')
      .join('users as u', 'u.id', 'p.userId')
      .select('p.id', 'p.text', 'u.name as postedBy')
      .where('p.userId', userId);
  },
  insert: function(user) {
    return db('users')
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, user) {
    return db('users')
      .where('id', id)
      .update(user);
  },
  remove: function(id) {
    return db('users')
      .where('id', id)
      .del();
  },
};
