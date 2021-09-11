'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
  class Post extends Model {
    static associate ({ Thread, Score, User }) {
      Post.hasMany(Score, { foreignKey: 'postId', onDelete: 'CASCADE' });
      Post.belongsTo(Thread, { foreignKey: 'threadId' });
      Post.belongsTo(User, { foreignKey: 'userId' });
      Post.belongsToMany(User, {
        through: Score,
        foreignKey: 'postId',
        otherKey: 'userId'
      });
    }
  }

  Post.init({
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    threadId: DataTypes.INTEGER,
    isQuestion: DataTypes.BOOLEAN,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post'
  });

  return Post;
};
