exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.text('username', 128)
        .unique()
        .notNullable();
    })
    .createTable('posts', tbl => {
      tbl.increments();
      tbl.text('contents');
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
