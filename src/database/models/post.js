'use strict';
const Sequelize = require('sequelize');
const {
  Model, Op
} = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'author', targetKey: 'id'});
      this.hasMany(models.Comment, {as : 'Comments', foreignKey: 'postId', sourceKey: 'id'});
    }
    static async findPostById(id) {
      const {User, Like, Comment} = require('@models');
      const post = await Post.findOne({
        attributes: ['id', 'author', 'User.nickname', 'User.username', 'title', 'contents', 'postedDate', 'updatedDate'],
        where: {
            id
        },
        include: [
            {
                model: User,
                required: false,
                attributes: []
            },
        ],
        raw: true
      });

      const likes = await Like.getLikes(id);
      const comments = await Comment.getComments(id);

      post['likes'] = likes;
      post['comments'] = comments;
      return post;
    }
    
    static async findPostsByAuthor(author, limit=10, isNew, id) {
      const {sequelize, Comment, Like} = require('@models');
      isNew = isNew !== 'false';
      let condition = '';

      if(id) {
        condition = ` AND "Post"."id" ${isNew ? '>' : '<'} ${id}`;
      }
      const query = `
      SELECT "Post"."id", "Post"."author"
      , "User"."nickname", "User"."username"
      , "Post"."title", "Post"."contents"
      , "Post"."postedDate", "Post"."updatedDate"
      FROM "Posts" AS "Post" 
      LEFT OUTER JOIN "Users" AS "User" 
      ON "Post"."author" = "User"."id" 
      WHERE "User"."username" LIKE '%${author}%' ${condition} 
      ORDER BY "Post"."postedDate" DESC, "Post"."id" DESC
      LIMIT ${limit};`

      const posts = await sequelize.query(
        query, {
          type: Sequelize.QueryTypes.SELECT,
          raw: true,
        });

        await Promise.all(posts.map(async post => {
          const likes = await Like.getLikes(post.id);
          const comments = await Comment.getComments(post.id);
  
          post['likes'] = likes;
          post['comments'] = comments;
  
          return post;
        }));
        
      return posts;
    }

    static async findPosts(limit=10, isNew=true, id) {
      const {sequelize, Comment, Like} = require('@models');

      isNew = isNew !== 'false';
      console.log({limit, isNew, id});
      const where = {};
      let condition = ``;
      if(id) {
        condition = ` WHERE "Post"."id" ${isNew ? '>' : '<'} ${id}`;
        // console.log(isNew);
        //   where['id'] = {
        //     [isNew ? Op.gt : Op.lt]: id
        //   }
      }

      const query = `
      SELECT "Post"."id", "Post"."author"
      , "User"."nickname", "User"."username"
      , "Post"."title", "Post"."contents"
      , "Post"."postedDate", "Post"."updatedDate"
      FROM "Posts" AS "Post" 
      LEFT OUTER JOIN "Users" AS "User" 
      ON "Post"."author" = "User"."id" 
      ${condition} 
      ORDER BY "Post"."postedDate" DESC, "Post"."id" DESC
      LIMIT ${limit};`

      const posts = await sequelize.query(
        query, {
          type: Sequelize.QueryTypes.SELECT,
          raw: true,
        });

        await Promise.all(posts.map(async post => {
          const likes = await Like.getLikes(post.id);
          const comments = await Comment.getComments(post.id);
  
          post['likes'] = likes;
          post['comments'] = comments;
  
          return post;
        }));

      // const {User} = require('@models');
      //   const posts = await Post.findAll({
      //       attributes: ['id', 'author', 'User.nickname', 'User.username', 'title', 'contents', 'postedDate', 'updatedDate'],
      //       where: where,
      //       include: [
      //           {
      //               model: User,
      //               required: false,
      //               attributes: []
      //           }
      //       ],
      //       order: [
      //         ['postedDate', 'DESC'],
      //         ['id', 'DESC'],
      //       ],
      //       limit: limit,
      //       raw: true
      //   });
        return posts;
    }

    static async deletePost(user, id) {
        const author = user.id;
        const res = await Post.destroy({
          where: {
            id, author
          }
        })
        return res;
    }

    static async createPost(user, title, contents) {
      const author = user.id;
      const result = await Post.create({
          author, title, contents
      });
      return result;
    }
  };
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    author: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "제목 없음"
    },
    contents: {
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
    modelName: 'Post',
    tableName: 'Posts',
    timestamps: false
  });
  return Post;
};