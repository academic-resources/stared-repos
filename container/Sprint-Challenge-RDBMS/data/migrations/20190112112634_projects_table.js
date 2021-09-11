
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', table => {
      table.increments();
      table.string('project_name').notNullable().unique();
      table.string('project_description').notNullable();
      table.boolean('completed').defaultTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};
