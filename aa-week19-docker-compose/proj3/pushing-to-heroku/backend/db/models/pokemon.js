"use strict";

const { types } = require("./pokemonTypes");

module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define(
    "Pokemon",
    {
      attack: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
      },
      defense: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
      },
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        validates: {
          isUrl: true,
          len: [10, 255],
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validates: {
          len: [10, 255],
        },
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM(types),
        values: types,
      },
      moves: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING(30)),
      },
      playerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Pokemon.associate = function (models) {
    Pokemon.belongsTo(models.Player, { foreignKey: "playerId", as: "player" });
    Pokemon.hasMany(models.Item, { foreignKey: "pokemonId", as: "items" });
  };
  return Pokemon;
};
