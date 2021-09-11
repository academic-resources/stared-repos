
exports.seed = function(knex, Promise) {
  return knex('contexts').truncate()
    .then(function () {
      return knex('contexts').insert([
        {context: "Errands", action_id: 4},
        {context: "Online", action_id: 3},
        {context: "At home", action_id: 5},
        {context: "At the farm", action_id: 1},
        {context: "At the farm", action_id: 2},
        {context: "At home", action_id: 7 },
      ]);
    });
};
