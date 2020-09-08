'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.STRING,
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};