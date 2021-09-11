exports.seed = function(knex) {
  return knex("hubs")
    .truncate()
    .then(function() {
      const hubs = [
        { name: "api-1" }, // 1
        { name: "api-2" }, // 2
        { name: "api-3" }, // 3
        { name: "api-4" } // 4
      ];

      return knex("hubs").insert(hubs);
    });
};
