'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
      },
      lastLogin: {
        allowNull: true,
        type: Sequelize.TIME
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      hashedPassword: {
        allowNull: true,
        type: Sequelize.STRING.BINARY
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING(50)
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
    return queryInterface.dropTable('Users');
  }
};
