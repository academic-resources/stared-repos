'use strict';
const faker = require('faker');

function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      const numUsers = 35;
      const followers = [];
      const createdAt = faker.date.past(1);
      for(let author = 1; author <= numUsers; author++) {
        for(let follower = 1; follower <= numUsers; follower++) {
          if(getRandom(10) <= 2) {
            followers.push(
              {
                userId: author,
                followerId: follower,
                createdAt,
                updatedAt: createdAt,
              }
            )
          }
        }
      }
      return queryInterface.bulkInsert('Followers', followers, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Followers', null, {});

  }
};
