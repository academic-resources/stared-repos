
exports.seed = function(knex, Promise) {
  return knex('zoos').insert([   
    { zoo_name: 'San Diego Zoo', address: "2920 Zoo Dr, San Diego, CA 92101" },
    { zoo_name: 'St. Louis Zoo', address: "Government Dr, St. Louis, MO 63110" }
  ]);
};
