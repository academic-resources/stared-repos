exports.up = function(knex) {
  return knex.schema
    .createTable('hubs', tbl => {
      tbl.increments();
      tbl.string('name').notNullable();
      tbl.timestamps(true, true);

      tbl.unique('name');
    })
    .createTable('messages', tbl => {
      tbl.increments();
      tbl
        .string('sender')
        .notNullable()
        .index();
      tbl.text('text').notNullable();
      tbl.timestamps(true, true);

      tbl
        .integer('hub_id')
        .unsigned()
        .references('id')
        .inTable('hubs')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('hubs');
};
