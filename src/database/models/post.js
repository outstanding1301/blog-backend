'use strict';
const Sequelize = require('sequelize');
const {
  Model
} = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
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