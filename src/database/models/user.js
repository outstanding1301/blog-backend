'use strict';
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const {Model} = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, {as : 'Posts', foreignKey: 'author', sourceKey: 'id'})
    }

    static async findUserById(id) {
      const user = await User.findOne({
          attributes: ['id', 'username', 'nickname', 'email', 'registerDate'],
          where: {
              id
          },
          raw: true
      });
      return user;
    }
    static async findUserByUsername(username) {
      const user = await User.findOne({
          attributes: ['id', 'username', 'nickname', 'email', 'registerDate'],
          where: {
              username
          },
          raw: true
      });
      return user;
    }
    static async findUser(query) {
      const user = await User.findOne({
          attributes: ['id', 'username', 'nickname', 'email', 'registerDate'],
          where: query,
          raw: true
      });
      return user;
    }

    static generateToken(user) {
      const token = jwt.sign(
          {
              _id: user.id,
              username: user.username,
              email: user.email
          },
          process.env.JWT_SECRET,
          {
              expiresIn: '7d'
          }
      )
      return token;
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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