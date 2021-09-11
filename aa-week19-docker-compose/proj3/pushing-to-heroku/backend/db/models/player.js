'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        isEmail: true,
        len: [3, 255],
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        len: [1, 255],
      },
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validates: {
        len: [60, 60],
      },
    },
    tokenId: {
      type: DataTypes.STRING
    }
  }, {});

  Player.associate = function(models) {
  };

  Player.prototype.isValid = () => true;

  Player.prototype.setPassword = function (password) {
    this.hashedPassword = bcrypt.hashSync(password);
    return this;
  };

  Player.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }

  Player.prototype.toSafeObject = function () {
    return {
      createdAt: this.createdAt,
      email: this.email,
      id: this.id,
      name: this.name,
      updatedAt: this.updatedAt,
    };
  }

  return Player;
};
