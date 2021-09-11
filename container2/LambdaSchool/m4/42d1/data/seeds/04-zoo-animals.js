
exports.seed = function(knex, Promise) {
  return knex('zoo_animals').insert([
    { zoo_id: 1, animal_id: 1 },
    { zoo_id: 1, animal_id: 2 },
    { zoo_id: 1, animal_id: 3 },
    { zoo_id: 1, animal_id: 4 },
    { zoo_id: 1, animal_id: 5 },
    { zoo_id: 1, animal_id: 8 },
    { zoo_id: 2, animal_id: 3 },
    { zoo_id: 2, animal_id: 5 },
    { zoo_id: 2, animal_id: 6 },
    { zoo_id: 2, animal_id: 7 },
    { zoo_id: 2, animal_id: 8 },
    { zoo_id: 2, animal_id: 9 },
    { zoo_id: 2, animal_id: 10 },
    { zoo_id: 2, animal_id: 11 }
  ]);
};
