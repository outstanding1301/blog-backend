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