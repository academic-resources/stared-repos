exports.seed = function(knex) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          email: "admin@admin.com",
          password: "lambda",
          first_name: "john",
          last_name: "doe",
          role: "admin"
        },
        {
          email: "volunteer@volunteer.com",
          password: "lambda",
          first_name: "jane",
          last_name: "doe",
          role: "volunteer"
        },
        {
          email: "student@student.com",
          password: "lambda",
          first_name: "vivienne",
          last_name: "marie",
          role: "student"
        }
      ]);
    });
};
