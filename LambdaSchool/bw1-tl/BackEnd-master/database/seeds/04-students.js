exports.seed = function(knex) {
  return knex("student")
    .del()
    .then(function() {
      return knex("student").insert([
        {
          user_id: 1
        }
      ]);
    });
};
