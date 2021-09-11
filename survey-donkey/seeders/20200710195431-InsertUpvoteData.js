'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Upvotes', [
        {  surveyId: 1, userId: 1, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        {  surveyId: 1, userId: 1, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        {  surveyId: 2, userId: 1, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        { surveyId: 2, userId: 1, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        { surveyId: 1, userId: 1, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        { surveyId: 2, userId: 1, upvote: 1, createdAt: new Date(), updatedAt: new Date() }

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Upvotes', null, {});
  }
};
