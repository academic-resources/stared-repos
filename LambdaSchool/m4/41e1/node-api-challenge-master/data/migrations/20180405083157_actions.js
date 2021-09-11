exports.up = function(knex) {
    return knex.schema.createTable("actions", function(actions) {
        actions.increments();

        actions
            .integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("projects")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

        actions.string("description", 128).notNullable();
        actions.text("notes").notNullable();
        actions.boolean("completed").defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("actions");
};
