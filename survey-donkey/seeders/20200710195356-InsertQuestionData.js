'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      { questionText: 'what is that', surveyId: 3, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { questionText: 'what is this', surveyId: 1, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { questionText: 'what are those', surveyId: 2, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { questionText: 'who is that', surveyId: 1, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { questionText: 'who is this', surveyId: 2, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { questionText: 'yadda yadda', surveyId: 2, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { questionText: 'blah blah', surveyId: 3, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { questionText: 'how many grapes?', surveyId: 3, questionType: 'free-response', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { questionText: 'the reason you cant take the survey is because there is no survey', surveyId: 3, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: null, opFive: null, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
