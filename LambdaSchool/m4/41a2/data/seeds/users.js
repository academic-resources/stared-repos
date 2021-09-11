exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          name: 'Samwise Gamgee',
          bio: 'Gardener and poet. Married to Rose Cotton',
        },
        {
          name: 'Frodo Baggins',
          bio: 'The ring bearer',
        },
      ]);
    });
};
