
exports.seed = function(knex) {
  return knex('schemes').insert([
    {scheme_name: 'World Domination'},
    {scheme_name: 'Get Rich Quick'},
    {scheme_name: 'Revenge'},
    {scheme_name: 'More Instagram Followers'},
    {scheme_name: 'Find the Holy Grail'},
    { scheme_name: 'Steal Coworker\'s Identity'}
  ]);
};
