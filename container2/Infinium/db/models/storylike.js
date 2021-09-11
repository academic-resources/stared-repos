'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyLike = sequelize.define('storyLike', {
    likesCount: {
      type: DataTypes.INTEGER,
      max: 50,
    },
    storyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  storyLike.associate = function(models) {
    storyLike.belongsTo(models.Story, { foreignKey: 'storyId' }),
    storyLike.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return storyLike;
};
