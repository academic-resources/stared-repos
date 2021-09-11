'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    draft: DataTypes.TEXT,
    published: DataTypes.TEXT,
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    subtitle: DataTypes.STRING(100),
    imageLink: DataTypes.STRING(255),
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
    publishAfter: DataTypes.DATE
  }, {});
  Story.associate = function(models) {
    Story.belongsTo(models.User, {foreignKey: 'userId'}),
    Story.hasMany(models.Comment, {foreignKey: 'storyId'}),
    Story.hasMany(models.storyLike, {foreignKey: 'storyId'})
  };
  return Story;
};
