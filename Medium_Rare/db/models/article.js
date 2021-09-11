"use strict";
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      cover: {
        type: DataTypes.TEXT,
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      delta: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      claps: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Article.associate = function (models) {
    Article.belongsTo(models.User, { foreignKey: "userId" }),
      Article.hasMany(models.Comment, {
        foreignKey: "articleId",
        as: "comments",
      });
  };
  return Article;
};
