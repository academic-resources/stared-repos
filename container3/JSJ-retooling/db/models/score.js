'use strict';
module.exports = (sequelize, { Model, DataTypes }) => {
  class Score extends Model {
    static associate ({ User, Post }) {
      Score.belongsTo(User, { foreignKey: 'userId' });
      Score.belongsTo(Post, { foreignKey: 'postId' });
    }
  }

  Score.init({
    isLiked: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Score'
  });

  return Score;
};
