'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Attractions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parkId: {
        allowNull: false,
        references: {
          model: 'Parks',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      attractionName: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      theme: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      opened: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      ridersPerVehicle: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Attractions');
  }
};