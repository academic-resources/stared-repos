exports.seed = function(knex, Promise) {
  return knex('tags')
    .del() // delete existing tags
    .then(function() {
      return knex('tags').insert([
        { tag: 'shire' }, // 1
        { tag: 'fellowship of the ring' }, // 2
        { tag: 'frodo' }, // 3
        { tag: 'rivendell' }, // 4
        { tag: 'bree' }, // 5
        { tag: 'sam' }, // 6
        { tag: 'merry' }, // 7
        { tag: 'gimli' }, // 8
        { tag: 'gandalf' }, // 9
        { tag: 'aragorn' }, // 10
        { tag: 'moria' }, // 11
        { tag: 'boromir' }, // 12
        { tag: 'legolas' }, // 13
        { tag: 'prancing pony' }, // 14
      ]);
    });
};
