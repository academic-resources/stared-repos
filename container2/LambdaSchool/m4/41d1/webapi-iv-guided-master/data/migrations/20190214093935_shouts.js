exports.up = function(knex, Promise) {
  return knex.schema.createTable('shoutouts', tbl => {
    tbl.increments();
    tbl.string('message').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shoutouts');
};
