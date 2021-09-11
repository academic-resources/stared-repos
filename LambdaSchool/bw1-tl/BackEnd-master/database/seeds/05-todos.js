exports.seed = function(knex) {
  return knex("todos")
    .del()
    .then(function() {
      return knex("todos").insert([
        {
          title: "Create Database Schema",
          description: "Write down tables, columns, and foreign keys",
          is_completed: true,
          admin_id: 1,
          volunteer_id: 2
        },
        {
          title: "Build Back End API",
          description: "Build Week Unit 4 - School in the Cloud",
          is_completed: false,
          admin_id: 1,
          volunteer_id: 2
        },
        {
          title: "Deploy and Document API",
          description: "Use Heroku to deploy and Postman for documentation",
          is_completed: false,
          admin_id: 1,
          volunteer_id: 2
        }
      ]);
    });
};
