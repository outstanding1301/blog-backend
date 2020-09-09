'use strict';
const Sequelize = require('sequelize');
const {Model} = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, {as : 'Posts', foreignKey: 'author', sourceKey: 'id'})
    }
  };
  User.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registerDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
  });
  
  return User;
};