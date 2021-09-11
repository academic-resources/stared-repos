const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('tags');
    if (id) {
      query.where('id', id).first();
    }

    return query;
  },
  insert: function(tag) {
    return db('tags')
      .insert(tag)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, tag) {
    return db('tags')
      .where('id', id)
      .update(tag);
  },
  remove: function(id) {
    return db('tags')
      .where('id', id)
      .del();
  },
};
