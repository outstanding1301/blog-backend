'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Posts');

    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      username: {
        type: Sequelize.DataTypes.STRING(15),
        unique: true,
        allowNull: false
      },
      nickname: {
        type: Sequelize.DataTypes.STRING(15),
        unique: false,
        allowNull: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      privider: {
        type: Sequelize.DataTypes.STRING(20),
      },
      registerDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    }, {
      modelName: 'User',
      tableName: 'Users',
      timestamps: false
    });


    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      author: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      },
      title: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
          defaultValue: "제목 없음"
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
