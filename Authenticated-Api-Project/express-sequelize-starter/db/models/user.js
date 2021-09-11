"use strict";
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Tweet, {
      as: "tweets",
      foreignKey: "userId",
    });
  };

  User.prototype.validatePassword = function (password) {
    return bCryptoKey.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};
