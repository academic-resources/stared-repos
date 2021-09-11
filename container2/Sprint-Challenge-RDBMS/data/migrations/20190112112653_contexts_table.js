
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contexts', table => {
      table.increments();
      table.string('context').notNullable();
      table.integer('action_id').unsigned();
      table.foreign('action_id').references('id').on('actions');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('contexts');
};
