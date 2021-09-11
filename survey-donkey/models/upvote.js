'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    surveyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    upvote: DataTypes.INTEGER,
    downvote: DataTypes.BOOLEAN
  }, {});
  Upvote.associate = function (models) {
    Upvote.belongsTo(models.Survey, { foreignKey: 'surveyId'})
    Upvote.belongsTo(models.User, { foreignKey: 'userId'})
  };
  return Upvote;
};
