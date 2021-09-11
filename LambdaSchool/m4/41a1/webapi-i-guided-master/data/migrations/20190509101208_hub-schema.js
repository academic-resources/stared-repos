exports.up = function(knex) {
  return knex.schema.createTable("hubs", tbl => {
    tbl.increments();

    tbl
      .string("name")
      .notNullable()
      .unique();

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("hubs");
};
