'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QuestionResponses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      surveyId: {
        references: { model: 'Surveys' },
        type: Sequelize.INTEGER
      },
      userId: {
        references: {model: 'Users'},
        type: Sequelize.INTEGER
      },
      questionId: {
        references: {model: 'Questions'},
        type: Sequelize.INTEGER
      },
      questionResponseValue: {
        type: Sequelize.STRING(255)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('QuestionResponses');
  }
};