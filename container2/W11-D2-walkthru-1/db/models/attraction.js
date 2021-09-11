'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attraction = sequelize.define('Attraction', {
    attractionName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    theme: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    opened: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ridersPerVehicle: {
      type: DataTypes.INTEGER
    }
  }, {});
  Attraction.associate = function(models) {
    Attraction.belongsTo(models.Park, {
      as: 'park',
      foreignKey: 'parkId'
    });
  };
  return Attraction;
};