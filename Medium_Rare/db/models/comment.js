'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
   {
     comment: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    articleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: "userId" }),
    Comment.belongsTo(models.Article, { foreignKey: "articleId" })
  };
  return Comment;
};
