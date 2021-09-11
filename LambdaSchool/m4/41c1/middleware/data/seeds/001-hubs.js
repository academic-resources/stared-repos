exports.seed = function(knex, Promise) {
  return knex('hubs').insert([
    { name: 'api-1' }, // 1
    { name: 'api-2' }, // 2
    { name: 'api-3' }, // 3
    { name: 'api-4' }, // 4
    { name: 'db-1' }, // 5
    { name: 'db-2' }, // 6
    { name: 'db-3' }, // 7
    { name: 'db-4' }, // 8
    { name: 'auth-1' }, // 9
    { name: 'auth-2' }, // 10
    { name: 'auth-3' }, // 11
    { name: 'auth-4' }, // 12
    { name: 'testing-1' }, // 13
    { name: 'testing-2' }, // 14
    { name: 'testing-3' }, // 15
    { name: 'testing-4' }, // 16
    { name: 'build-1' }, // 17
    { name: 'build-2' }, // 18
    { name: 'build-3' }, // 19
    { name: 'build-4' }, // 20
  ]);
};
