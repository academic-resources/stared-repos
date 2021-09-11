'use strict';
const { Op, Model, ValidationError, ValidationErrorItem } = require('sequelize');
const { hashSync, compareSync } = require('bcryptjs');

module.exports = (sequelize, { DataTypes }) => {
  class User extends Model {
    validatePass (password) {
      return !!password && compareSync(password, this.password);
    }

    get info () {
      const { id, userName, email } = this;
      return { id, userName, email };
    }

    static async LogIn ({ identification, password }) {
      const errors = [];
      if (!identification) errors.push(new ValidationErrorItem('Please provide a username or email'));
      if (!password) errors.push(new ValidationErrorItem('Please provide a password'));
      if (errors.length) throw new ValidationError('Invalid login', errors);
      const potentialUser = await User.findOne({
        where: {
          [Op.or]: [
            { username: identification },
            { email: identification }
          ]
        }
      });
      if (!potentialUser || !potentialUser.validatePass(password)) {
        errors.push('Invalid username, email, or password');
        throw new ValidationError('Invalid login', errors);
      }
      return potentialUser;
    }

    static async SignUp ({ userName, email, password }) {
      const errors = [];
      if (!userName) errors.push(new ValidationErrorItem('Please provide a username'));
      if (!email) errors.push(new ValidationErrorItem('Please provide an email address'));
      if (!password) errors.push(new ValidationErrorItem('Please provide a password'));
      if (userName && await User.findOne({ where: { userName } })) {
        errors.push(new ValidationErrorItem('That username is already in use'));
      }
      if (email && await User.findOne({ where: { email } })) {
        errors.push(new ValidationErrorItem('That email address is already in use.'));
      }
      if (errors.length) throw new ValidationError('Could not create account', errors);
      const hashedPassword = hashSync(password);
      return (await User.create({ userName, email, hashedPassword })).info;
    }

    static associate ({ Post, Thread, Score }) {
      [Post, Thread, Score].forEach(model => User.hasMany(model, { foreignKey: 'userId' }));
      User.belongsToMany(Post, {
        through: 'Score',
        foreignKey: 'userId',
        otherKey: 'postId',
        as: 'VotedPosts'
      });
    }
  }

  User.init({
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  return User;
};
