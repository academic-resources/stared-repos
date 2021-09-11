'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionResponse = sequelize.define('QuestionResponse', {
    surveyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    questionResponseValue: DataTypes.STRING
  }, {});
  QuestionResponse.associate = function (models) {
    QuestionResponse.belongsTo(models.Question, { foreignKey: 'questionId' })
    QuestionResponse.belongsTo(models.User, { foreignKey: 'userId' })
    QuestionResponse.belongsTo(models.Survey, { foreignKey: 'surveyId' })
  };
  return QuestionResponse;
};
