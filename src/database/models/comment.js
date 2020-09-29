'use strict';
const Sequelize = require('sequelize');
const {
  Model, Op
} = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id'});
      this.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id'});
    }
    static async getComments(postId) {
      const {sequelize} = require('@models');
        const sql = `
        SELECT "Comment"."id"
        , "Comment"."postId"
        , "Comment"."userId"
        , "Comment"."comment"
        , "Comment"."postedDate"
        , "Comment"."updatedDate"
        , "User"."nickname" AS "nickname"
        , "User"."username" AS "username"
        FROM "Comments" AS "Comment" 
        LEFT OUTER JOIN "Users" AS "User" 
        ON "Comment"."userId" = "User"."id" 
        WHERE "Comment"."postId" = '${postId}' 
        ORDER BY "Comment"."postedDate" ASC;
        `
        const comments = sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          raw: true,
          logging: false,
        })
        return comments;
    }

    static async deleteComment(user, id) {
        const userId = user.id;
        const res = await Comment.destroy({
          where: {
            id, userId
          }
        })
        return res;
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