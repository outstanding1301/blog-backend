'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};