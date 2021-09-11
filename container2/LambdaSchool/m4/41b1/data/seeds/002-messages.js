exports.seed = function(knex, Promise) {
  return knex('messages').insert([
    {
      sender: 'Frodo',
      text: 'Go back Sam, I am goin gto Mordor alone',
      hub_id: 1,
    },
    {
      sender: 'Sam',
      text: 'Of course you are, and I am coming with you',
      hub_id: 1,
    },
    {
      sender: 'Boromir',
      text: 'One does nto simply walk into Mordor',
      hub_id: 1,
    },
    {
      sender: 'Aragorn',
      text: 'Deeds will not be less valiant because they are unpraised',
      hub_id: 2,
    },
    {
      sender: 'Lady Galadriel',
      text: 'Even the smallest person can change the course of  history',
      hub_id: 2,
    },
    {
      sender: 'Sam',
      text:
        "There is some good in this world, Mr. Frodo... and it's worth figting for",
      hub_id: 2,
    },
    {
      sender: 'Aragorn',
      text:
        'A hunted man sometimes wearies of distrust and longs for friendship',
      hub_id: 2,
    },
    {
      sender: 'Lord Elrond',
      text:
        'Yet such is oft the course of deeds that move the wheels of the world: small hands do them because the must, while the eyes of the great are elsewhere',
      hub_id: 2,
    },
    {
      sender: 'Boromir',
      text:
        'It is a strange fate that we should suffer so much fear and doubt over so small a thing... such a little thing',
      hub_id: 2,
    },
    {
      sender: 'Gandalf',
      text:
        'He that breaks a thing to find out what it is, has left the path of wisdom',
      hub_id: 2,
    },
    {
      sender: 'Gandalf',
      text:
        'All we have to decide is what to do with the time that is given us',
      hub_id: 2,
    },
    {
      sender: 'Gandalf',
      text:
        'The burned hand teaches best. After that advice about fire goes to the heart',
      hub_id: 2,
    },
    { sender: 'Gimli', text: 'Never toss a dwarf!', hub_id: 2 },
    {
      sender: 'Gimli',
      text: 'Faithless is he that says farewell when the road darkens',
      hub_id: 2,
    },
    {
      sender: 'Arwen',
      text:
        'Your time will come. You will face the same Evil, and you will defeat it',
      hub_id: 3,
    },
    {
      sender: 'Gandalf',
      text:
        'A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to',
      hub_id: 3,
    },
    {
      sender: 'Sam',
      text: "It's the job that's never started as takes longest to finish",
      hub_id: 3,
    },
    {
      sender: 'Frodo',
      text: 'I will take the Ring, though I do not know the way',
      hub_id: 3,
    },
    {
      sender: 'Lady Galadriel',
      text: 'Seeing is both good and perilous',
      hub_id: 3,
    },
    {
      sender: 'Aragorn',
      text:
        'It is but a shadow and a thought that you love. I cannot give you what you seek',
      hub_id: 3,
    },
    {
      sender: 'Frodo',
      text: "I don't know and I would rather not guess",
      hub_id: 3,
    },
    {
      sender: 'Bilbo Baggins',
      text:
        "It's a dangerous business, Frodo, going out your door. You step onto the road, and if you don't keep your feet, there's no knowing where you might be swept off to",
      hub_id: 3,
    },
  ]);
};
