exports.up = function(knex) {
  return createUsersTable(knex)
    .then(createPostsTable)
    .then(createTagsTable)
    .then(createPostTagsTable)
    .catch(error => {
      console.log(error);
      reject(error);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('posttags')
    .then(function() {
      console.log('dropping tags');
      return knex.schema.dropTableIfExists('tags');
    })
    .then(function() {
      console.log('dropping posts');
      return knex.schema.dropTableIfExists('posts');
    })
    .then(function() {
      console.log('dropping users');
      return knex.schema.dropTableIfExists('users');
    })
    .catch(error => console.log(error));
};

function createUsersTable(knex) {
  console.log('creating users table');

  return new Promise(function(resolve, reject) {
    knex.schema
      .createTable('users', function(users) {
        users.increments(); // id, integer, unsigned no sign as not negative numbers
        users
          .string('name', 128)
          .notNullable()
          .unique();

        console.log('users table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
}

function createPostsTable(knex) {
  console.log('creating posts table');

  return new Promise(function(resolve, reject) {
    knex.schema
      .createTable('posts', function(posts) {
        posts.increments();
        posts.text('text').notNullable();

        posts
          .integer('userId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users');

        console.log('posts table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
}

function createTagsTable(knex) {
  console.log('creating tags table');

  return new Promise(function(resolve, reject) {
    knex.schema
      .createTable('tags', function(tags) {
        tags.increments();
        tags
          .string('tag', 80)
          .notNullable()
          .unique('tag');

        console.log('tags table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
}

function createPostTagsTable(knex) {
  console.log('creating posttags table');

  return new Promise(function(resolve, reject) {
    knex.schema
      .createTable('posttags', function(posttags) {
        posttags.increments();
        posttags
          .integer('postId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('posts');
        posttags
          .integer('tagId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('tags');

        console.log('posttags table created');
        resolve(knex);
      })
      .catch(error => console.log(error));
  });
}
