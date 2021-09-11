'use strict';

const { types } = require('../models/pokemonTypes');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pokemons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attack: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      defense: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM(types),
      },
      moves: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING(30)),
      },
      playerId: {
        allowNull: false,
        references: {
          model: {
            tableName: 'Players',
          },
        },
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
    return queryInterface.dropTable('Pokemons');
  }
};
