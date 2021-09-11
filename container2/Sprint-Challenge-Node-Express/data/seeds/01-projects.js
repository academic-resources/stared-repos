exports.seed = function(knex, Promise) {
  return knex('projects')
    .del()
    .then(function() {
      return knex('projects').insert([
        {
          name: 'Complete Node.js and Express Challenge',
          description:
            'Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!',
        },
      ]);
    });
};
