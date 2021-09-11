'use strict';
module.exports = (sequelize, DataTypes) => {
  const Composer = sequelize.define('Composer', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      },
    },
  }, {});
  Composer.associate = function(models) {
    Composer.hasMany(models.Song, {foreignKey: 'composerId'});
  };
  return Composer;
};
