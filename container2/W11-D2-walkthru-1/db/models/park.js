'use strict';
module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define('Park', {
    parkName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    provinceState: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    opened: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  Park.associate = function(models) {
    Park.hasMany(models.Attraction, {
      as: 'attractions',
      foreignKey: 'parkId'
    });
  };
  return Park;
};