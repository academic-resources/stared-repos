'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      body: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here

    // many side of our one-to-many relationship between posts and a user
    Post.belongsTo(models.User, { foreignKey: 'userId' });

    // set up many-to-many relationship
    Post.belongsToMany(models.User, {
      through: 'Like', // specifying our join table
      otherKey: 'userId', // foreign key on the join table that points to the entity we want to end up at
      foreignKey: 'postId', // foreign key on join table pointing to this entity
      as: 'likes', // we provide an alias here, which becomes the name of this specific association
      // sequelize will use this alias when creating getter/setter methods (getLikes, addLike, etc...)
      // will also be used when we query for a post and want to include users that have liked it
    });
  };
  return Post;
};
