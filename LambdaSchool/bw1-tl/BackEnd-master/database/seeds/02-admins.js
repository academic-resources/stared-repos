exports.seed = function(knex) {
  return knex("admin")
    .del()
    .then(function() {
      return knex("admin").insert([
        {
          user_id: 1
        }
      ]);
    });
};
