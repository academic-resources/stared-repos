'use strict';
const faker = require('faker');

function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      const numStories = 50;
      const numUsers = 35;
      const likesMax = 50;
      const likes = [];
      const createdAt = faker.date.past(1);

      for(let user = 1; user <= numUsers; user++) {
        for(let story = 1; story <= numStories; story++) {
          if(getRandom(10) <= 5) {
            likes.push(
              {
                likesCount: Math.min(getRandom(likesMax) + 10, getRandom(likesMax)),
                storyId: story,
                userId: user,
                createdAt,
                updatedAt: createdAt,
              }
            );
          }
        }
      }
      return queryInterface.bulkInsert('storyLikes', likes, {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('storyLikes', null, {});
  }
};
