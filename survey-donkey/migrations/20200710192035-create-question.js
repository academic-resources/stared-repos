'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionText: {
        type: Sequelize.STRING(500)
      },
      surveyId: {
        type: Sequelize.INTEGER,
        references: { model: 'Surveys' }
      },
      questionType: {
        type: Sequelize.STRING(50)
      },
      opOne: {
        type: Sequelize.STRING(255)
      },
      opTwo: {
        type: Sequelize.STRING(255)
      },
      opThree: {
        type: Sequelize.STRING(255)
      },
      opFour: {
        type: Sequelize.STRING(255)
      },
      opFive: {
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
    return queryInterface.dropTable('Questions');
  }
};
