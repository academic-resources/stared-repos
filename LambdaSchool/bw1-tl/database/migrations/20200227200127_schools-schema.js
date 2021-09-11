exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users
        .string("email")
        .notNullable()
        .unique();
      users.string("password").notNullable();
      users.string("first_name").notNullable();
      users.string("last_name").notNullable();
      users.string("role").notNullable();
    })
    .createTable("admin", admins => {
      admins.increments();
      admins
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("volunteer", vols => {
      vols.increments();
      vols.string("availability", 512).notNullable();
      vols.string("country").notNullable();
      vols
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("student", students => {
      students.increments();
      students
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("todos", todos => {
      todos.increments();
      todos.string("title", 256).notNullable();
      todos.string("description", 2056).notNullable();
      todos
        .boolean("is_completed")
        .notNullable()
        .defaultTo(false);
      todos
        .integer("admin_id")
        .unsigned()
        .references("id")
        .inTable("admin")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      todos
        .integer("volunteer_id")
        .unsigned()
        .references("id")
        .inTable("volunteer")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("todos")
    .dropTableIfExists("student")
    .dropTableIfExists("volunteer")
    .dropTableIfExists("admin")
    .dropTableIfExists("users");
};
