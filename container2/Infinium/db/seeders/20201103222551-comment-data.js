'use strict';
const faker = require('faker');

const randomComments = [
  "Loved this!",
  "Really?",
  "This is the worst article ever!",
  "Ditto",
  "Great article",
  "Good article",
  "Worth the read",
  "Loved the title",
  "You are a great author",
  "Ian lives!",
  "App Academy, just do it! (You got this!)",
  "Another good article on this subject",
  "I've read better...",
  "Positively the most positive take about positively nothing",
  "Shout out to Mike, Dale, Rhys, and Scott!",
  "Delete me if you can :-)",
  "Marvelous article",
  "True, masterful gibberish",
  "Great. Just great...",
  "You should come visit my website...",
  "An imaginative take",
  "I know a superhero for real",
  "What?! No way. Don't believe it."
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    const numStories = 50; //match to stories seeder
    const numUsers = 35; //match total users
    const comments = [];
    const numComments = 70;

    function getRandom(max) {
      return Math.floor(Math.random() * max) + 1;
    }

    for(let i =0; i<numComments; i++) {
      const createdAt = faker.date.past(0);
      const userId = getRandom(numUsers);
      const storyId = getRandom(numStories);
      const comment = randomComments[getRandom(randomComments.length) - 1];

      comments.push({
        comment,
        storyId,
        userId,
        createdAt,
        updatedAt: faker.date.between(createdAt, new Date()),
      })
    }
    return queryInterface.bulkInsert('Comments', comments, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
}
