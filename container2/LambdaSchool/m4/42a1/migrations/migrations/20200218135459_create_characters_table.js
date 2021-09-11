// describes the changes => knex migrate:latest
exports.up = function(knex) {
  // DO NOT FORGET TO RETURN
  return knex.schema.createTable("characters", tbl => {
    // adds an id column that auto-increments
    tbl.increments(); // primary key

    tbl
      .string("name", 256)
      .notNullable()
      .index(); // makes searching by the name faster

    tbl.string("house", 128);

    tbl.string("origin", 256);

    // booleans are normally stores as 1 for true and 0 for false
    tbl.boolean("alive").defaultTo(false);
  });
};

// how to undo the changes => knex migrate:rollback
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("characters");
};
