'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [
      { username: "Mike", email: "mike@mike.com", hashedPassword: bcrypt.hashSync("Pas$w0rd", 10), avatar: "/images/Michael-Jensen.jpeg", description: "Home page maker, can't login without him (you gotta 'Like' his likes, too)", createdAt: faker.date.past(3), updatedAt: new Date() },
      { username: "Scott", email: "scott@scott.com", hashedPassword: bcrypt.hashSync("Pas$w0rd", 10), avatar: "/images/Scott-Smith.jpeg", description: "Story master; scrummer; seeder man, too", createdAt: faker.date.past(3), updatedAt: new Date() },
      { username: "Dale", email: "dale@dale.com", hashedPassword: bcrypt.hashSync("Pas$w0rd", 10), avatar: "/images/Dale-Sakamoto.jpeg", description: "All around helper, a real 'user' guide and 'follower' guy", createdAt: faker.date.past(3), updatedAt: new Date() },
      { username: "Rhys", email: "rhys@rhys.com", hashedPassword: bcrypt.hashSync("Pas$w0rd", 10), avatar: "/images/Rhys-Previte.jpeg", description: "'Comments'? Leave it to me!", createdAt: faker.date.past(3), updatedAt: new Date() },
      { username: "Ian", email: "ian@ian.com", hashedPassword: bcrypt.hashSync("Pas$w0rd", 10), avatar: "/images/ET.jpg", description: "A an expert a/A instructor and motivator", createdAt: faker.date.past(3), updatedAt: new Date() },
      { username: "Demo", email: "demo@demo.com", hashedPassword: bcrypt.hashSync("Some5&#Ha", 10), avatar: "", description: "A user to experience the site as a demonstration", createdAt: faker.date.past(3), updatedAt: new Date() },
    ];

    const extraUsers = 30;
    const descriptions = [
      "Just your average fantasy lover.",
      "Sci-fi, all the time, that's what keeps me going!",
      "I like speculative fiction in all its forms.",
      "Roleplaying, movies, and Magic: The Gathering are my interests.",
      "Superheros are my super delight!"
    ]

    for(let i = 0; i < extraUsers; i++) {
      const gender = i % 2 ? 'male' : 'female';
      const genderGroup = i % 2 ? 'men' : 'women';
      const createdAt = faker.date.past(3);
      const first = faker.name.firstName(gender);
      const last = faker.name.lastName(gender);
      users.push({
        username: faker.internet.userName(first, last),
        email: faker.internet.email(first, last),
        hashedPassword: bcrypt.hashSync(faker.internet.password(8, false, null, 'Ca!7'), 10),
        avatar: `https://randomuser.me/api/portraits/${genderGroup}/${99-i}.jpg`, //0-99 max on pics,
        description: descriptions[i % 5],
        createdAt,
        updatedAt: faker.date.between(createdAt, faker.date.recent()),
      });
    }

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
