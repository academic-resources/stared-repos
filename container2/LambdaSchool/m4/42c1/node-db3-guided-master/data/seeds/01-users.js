exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: 'lao_tzu' },
    { username: 'socrates' },
    { username: 'seneca' },
  ]);
};
