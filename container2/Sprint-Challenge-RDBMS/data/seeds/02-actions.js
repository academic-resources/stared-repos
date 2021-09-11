
exports.seed = function(knex, Promise) {
  return knex('actions').truncate()
    .then(function () {
      return knex('actions').insert([
        {action_description: "Dig a hole", action_notes: "6 ft deep, 10x10, fortify with wire", completed: 1, project_id: 1},
        {action_description: "Build the coop", action_notes: "Follow designs and paint with enthusiasm", completed: 0, project_id: 1},
        {action_description: "Setup night cameras", action_notes: "Order from amazon", completed: 0, project_id: 1},
        {action_description: "Purchase ingredients", action_notes: "", completed: 0, project_id: 2},
        {action_description: "Bake and decorate", action_notes: "Channel your inner Martha", completed: 0, project_id: 2},
        {action_description: "Get a piano teacher", action_notes: "Setup weekly lessons", completed: 1, project_id: 3},
        {action_description: "Practice", action_notes: "At least 30 min daily", completed: 0, project_id: 3},
      ]);
    });
};
