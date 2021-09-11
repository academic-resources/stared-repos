"use strict";
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      happiness: DataTypes.INTEGER,
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        validates: {
          isUrl: true,
          len: [0, 255],
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validates: {
          len: [0, 255],
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pokemonId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Item.associate = function (models) {
    Item.belongsTo(models.Pokemon, { foreignKey: "pokemonId", as: "pokemon" });
  };
  return Item;
};
