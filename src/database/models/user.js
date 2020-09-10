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
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(15),
      unique: false,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    privider: {
      type: DataTypes.STRING(20),
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