exports.up = function(knex, Promise) {
  return knex.schema.createTable('hobbits', tbl => {
    tbl.increments();

    tbl.string('name', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists('hobbits');
};
