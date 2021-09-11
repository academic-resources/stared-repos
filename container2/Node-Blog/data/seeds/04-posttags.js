exports.seed = function(knex, Promise) {
  return knex('posttags')
    .del() // delete existing posttags
    .then(function() {
      return knex('posttags').insert([
        { postId: 1, tagId: 3 },
        { postId: 1, tagId: 11 },
        { postId: 1, tagId: 2 },
        { postId: 2, tagId: 3 },
        { postId: 2, tagId: 1 },
        { postId: 2, tagId: 2 },
        { postId: 3, tagId: 2 },
        { postId: 3, tagId: 3 },
        { postId: 3, tagId: 5 },
        { postId: 5, tagId: 6 },
        { postId: 5, tagId: 2 },
        { postId: 5, tagId: 1 },
        { postId: 18, tagId: 9 },
        { postId: 18, tagId: 2 },
        { postId: 18, tagId: 11 },
        { postId: 21, tagId: 9 },
        { postId: 21, tagId: 2 },
        { postId: 21, tagId: 11 },
        { postId: 29, tagId: 4 },
        { postId: 29, tagId: 2 },
        { postId: 29, tagId: 8 },
      ]);
    });
};
