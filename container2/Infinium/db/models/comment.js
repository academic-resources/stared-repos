'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    storyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: 'Stories'}
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: 'Users'}
    },
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' }),
    Comment.belongsTo(models.Story, { foreignKey: 'storyId' })
  };
  return Comment;
};
