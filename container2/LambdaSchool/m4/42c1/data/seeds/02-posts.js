exports.seed = function(knex, Promise) {
  return knex('posts').insert([
    {
      contents:
        'Let your workings remain a mystery. Just show people the results.',
      user_id: 1,
    },
    {
      contents:
        "True mastery can be gained by letting things go their own way. It can't be gained by interfering.",
      user_id: 1,
    },
    {
      contents:
        'Not-knowing is true knowledge. Presuming to know is a disease.',
      user_id: 1,
    },
    { contents: 'Success or failure: which is more destructive?', user_id: 1 },
    {
      contents:
        'When two great forces oppose each other the victory will go to the one that knows how to yield.',
      user_id: 1,
    },
    {
      contents:
        "Things arise and she let's them come; things disappear and she let's them go.",
      user_id: 1,
    },
    { contents: 'Beware of the barrenness of a busy life.', user_id: 2 },
    {
      contents: 'I cannot reach anybody anything. I can only make them think.',
      user_id: 2,
    },
    {
      contents: 'True knowledge exists in knowing that you know nothing.',
      user_id: 2,
    },
    {
      contents:
        'Trusting everyone is as much a fault as trusting no one (though I should call the first the worthier and the second the safer behaviour.',
      user_id: 3,
    },
    {
      contents:
        'At whatever point you leave life if you leave it in the right way, it is a whole.',
      user_id: 3,
    },
  ]);
};
