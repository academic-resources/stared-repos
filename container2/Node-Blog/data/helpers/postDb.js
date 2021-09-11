const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('posts as p');

    if (id) {
      query
        .join('users as u', 'p.userId', 'u.id')
        .select('p.text', 'u.name as postedBy')
        .where('p.id', id);

      const promises = [query, this.getPostTags(id)]; // [ posts, tags ]

      return Promise.all(promises).then(function(results) {
        let [posts, tags] = results;
        let post = posts[0];
        post.tags = tags.map(t => t.tag);

        return post;
      });
    }

    return query;
  },
  getPostTags: function(postId) {
    return db('tags as t')
      .join('posttags as pt', 't.id', 'pt.tagId')
      .select('t.tag')
      .where('pt.postId', postId);
  },
  insert: function(post) {
    return db('posts')
      .insert(post)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, post) {
    return db('posts')
      .where('id', id)
      .update(post);
  },
  remove: function(id) {
    return db('posts')
      .where('id', id)
      .del();
  },
};
