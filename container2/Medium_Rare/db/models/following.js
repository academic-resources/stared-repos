'use strict';
module.exports = (sequelize, DataTypes) => {
  const Following = sequelize.define('Following', {
    authorId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  Following.associate = function(models) {
    // associations can be defined here
  };
  return Following;
};