'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    questionText: DataTypes.STRING,
    surveyId: DataTypes.INTEGER,
    questionType: DataTypes.STRING,
    opOne: DataTypes.STRING,
    opTwo: DataTypes.STRING,
    opThree: DataTypes.STRING,
    opFour: DataTypes.STRING,
    opFive: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.Survey,{foreignKey:'surveyId'})
    Question.hasMany(models.QuestionResponse, { foreignKey: 'questionId', onDelete: 'CASCADE', hooks: true})
  };
  return Question;
};
