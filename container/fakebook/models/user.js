'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING(50),
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(100),
        validate: {
          notEmpty: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here

    // one side of the one-to-many relationship between users and posts
    User.hasMany(models.Post, { foreignKey: 'userId' });
    User.belongsToMany(models.Post, {
      through: 'Like', // specifying our join table
      foreignKey: 'userId', // foreign key on the join table that points to the entity we want to end up at
      otherKey: 'postId', // foreign key on join table pointing to this entity
      as: 'likedPosts', // we provide an alias here, which becomes the name of this specific association
      // sequelize will use this alias when creating getter/setter methods (getLikedPosts, addLikedPost, etc...)
      // will also be used when we query for a user and want to include posts that the user has liked
    });
  };
  return User;
};
