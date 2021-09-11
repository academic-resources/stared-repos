exports.seed = function(knex) {
  return knex("volunteer")
    .del()
    .then(function() {
      return knex("volunteer").insert([
        {
          availability: "Monday - Thursday 8am - 2pm",
          country: "USA",
          user_id: 1
        }
      ]);
    });
};
