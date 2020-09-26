'use strict';
const Sequelize = require('sequelize');
const {
  Model, Op
} = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {foreignKey: 'postId', targetKey: 'id'});
      this.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id'});
    }
    static async getComments(postId) {
      const {User} = require('@models');
        const comments = await Comment.findAll({
            attributes: ['id', ['User.id', 'userId'], ['User.username', 'username'], ['User.nickname', 'nickname'], 'comment', 'postedDate', 'updatedDate'],
            where: {
              postId
            },
            include: [
                {
                    model: User,
                    required: false,
                    attributes: [id, nickname]
                }
            ],
            order: [
              ['postedDate', 'ASC'],
            ],
            raw: true
        });
        return comments;
    }
    
    static async writeComment(user, postId, comment) {
      const userId = user.id;
      const result = await Comment.create({
          userId, postId, comment
      });
      return result;
    }
  };
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    postedDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: false
  });
  return Comment;
};