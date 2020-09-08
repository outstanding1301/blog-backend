'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
      },
      nickname: {
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      registerDate: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.NOW
      }
    }, {
      modelName: 'User',
      underscored: true,
      timestamps: false
    });

    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
          type: Sequelize.DataTypes.STRING,
          unique: false,
          allowNull: false
      },
      title: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      contents: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false
      },
      postedDate: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.NOW
      },
      updatedDate: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.NOW
      }
    }, {
      modelName: 'Post',
      underscored: true,
      timestamps: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Posts');
  }
};
