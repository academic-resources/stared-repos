'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('QuestionResponses', [
      { surveyId: 1, userId: 3, questionId: 4, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { surveyId: 1, userId: 3, questionId: 4, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { surveyId: 1, userId: 2, questionId: 2, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { surveyId: 1, userId: 1, questionId: 2, questionResponseValue: "option five", createdAt: new Date(), updatedAt: new Date() },
      { surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option two", createdAt: new Date(), updatedAt: new Date() },
      { surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option two", createdAt: new Date(), updatedAt: new Date() },
      { surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option three", createdAt: new Date(), updatedAt: new Date() },
      { surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option four", createdAt: new Date(), updatedAt: new Date() },
      { surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option five", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('QuestionResponses', null, {});
  }
};
