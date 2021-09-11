'use strict';
module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    name: DataTypes.STRING,
    mostRecentSubmission: DataTypes.TIME,
    userId: DataTypes.INTEGER,
    published: DataTypes.BOOLEAN
  }, {});
  Survey.associate = function(models) {
    Survey.belongsTo(models.User, {foreignKey:'userId'})
    Survey.hasMany(models.Question, {foreignKey: 'surveyId', onDelete: 'CASCADE', hooks: true})
    Survey.hasMany(models.QuestionResponse, {foreignKey: 'surveyId', onDelete: 'CASCADE', hooks: true})
    Survey.hasMany(models.Upvote, { foreignKey: 'surveyId', onDelete: 'CASCADE', hooks: true})
  };
  return Survey;
};
