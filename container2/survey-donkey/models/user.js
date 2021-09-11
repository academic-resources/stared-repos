'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    lastLogin: DataTypes.TIME,
    role: DataTypes.STRING,
    hashedPassword: DataTypes.STRING.BINARY,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Survey, { foreignKey: 'userId' })
    User.hasMany(models.QuestionResponse, { foreignKey: 'userId' })
  };
  return User;
};
