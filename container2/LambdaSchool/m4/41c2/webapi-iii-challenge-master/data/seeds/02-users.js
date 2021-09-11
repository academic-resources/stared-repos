exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { name: 'Frodo Baggins' }, // 1
    { name: 'Samwise Gamgee' }, // 2
    { name: 'Meriadoc Brandybuck' }, // 3
    { name: 'Peregrin Took' }, // 4
    { name: 'Mithrandir' }, // 5
    { name: 'Boromir' }, // 6
    { name: 'Legolas' }, // 7
    { name: 'Gimli' }, // 8
    { name: 'Aragorn' }, // 9
  ]);
};
