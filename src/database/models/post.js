'use strict';
const Sequelize = require('sequelize');
const {
  Model
} = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'author', targetKey: 'id'});
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
        type: DataTypes.STRING(15),
        unique: false,
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
        defaultValue: Sequelize.NOW
    },
    updatedDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'Posts',
    timestamps: false
  });
  return Post;
};