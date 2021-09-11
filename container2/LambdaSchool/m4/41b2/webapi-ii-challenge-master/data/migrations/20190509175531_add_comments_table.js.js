exports.up = function(knex) {
  return knex.schema.createTable('comments', tbl => {
      tbl.increments();
      tbl
        .string('text')
        .notNullable()
      tbl.timestamps(true, true);

      tbl
        .integer('post_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};
