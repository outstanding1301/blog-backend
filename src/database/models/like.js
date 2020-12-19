'use strict';
const Sequelize = require('sequelize');
const {
  Model, Op
} = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {foreignKey: 'postId', targetKey: 'id'});
      this.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id'});
    }

    static async getLikes(postId) {
      const {sequelize} = require('@models');
        const sql = `
        SELECT "Like"."userId"
        , "Like"."postId"
        , "Like"."likeDate"
        , "User"."nickname" AS "nickname"
        , "User"."username" AS "username"
        FROM "Likes" AS "Like" 
        LEFT OUTER JOIN "Users" AS "User" 
        ON "Like"."userId" = "User"."id" 
        WHERE "Like"."postId" = '${postId}' 
        ORDER BY "Like"."likeDate" ASC;
        `
        const likes = sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          raw: true,
          logging: false,
        })
        return likes;
    }

    static async likePost(user, postId) {
      const {sequelize} = require('@models');
      const userId = user.id;

      const like = await Like.count({
        where: {
          userId, postId
        }
      });
      console.log(like);
      if (like == 0) {
        const sql = `INSERT INTO "Likes" ("userId","postId","likeDate") VALUES ('${userId}','${postId}','${new Date().toUTCString()}');`

        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.INSERT,
          raw: true
        });
        return {
          userId, postId,
          like: true
        }
      }

      await Like.destroy({
        where: {
          userId, postId
        }
      });

      return {
        userId, postId,
        like: false
      }
  }
  
  };
  Like.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    likeDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'Likes',
    timestamps: false
  });
  return Like;
};