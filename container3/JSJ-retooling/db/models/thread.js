'use strict';

module.exports = (sequelize, { Model, DataTypes }) => {
  class Thread extends Model {
    static associate ({ User, Post }) {
      Thread.belongsTo(User, { foreignKey: 'userId' });
      Thread.hasMany(Post, { foreignKey: 'threadId' });
    }

    async createSeedQuestion ({ body, score }) {
      return await this.createPost({ body, score, isQuestion: true, userId: this.userId });
    }

    async createSeedAnswer ({ body, score, userId }) {
      return await this.createPost({ body, score, userId, isQuestion: false });
    }

    async createQuestion ({ body }) {
      return await this.createPost({ body, score: 0, isQuestion: true, userId: this.userId });
    }

    async createAnswer ({ body, userId }) {
      return await this.createPost({ body, score: 0, isQuestion: false, userId });
    }
  }

  Thread.init({
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Thread'
  });

  return Thread;
};
