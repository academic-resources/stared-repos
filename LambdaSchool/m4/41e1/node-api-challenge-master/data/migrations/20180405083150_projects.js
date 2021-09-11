exports.up = function(knex) {
    return knex.schema.createTable("projects", function(projects) {
        projects.increments();

        projects.string("name", 128).notNullable();
        projects.text("description").notNullable();
        projects.boolean("completed").defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("projects");
};
