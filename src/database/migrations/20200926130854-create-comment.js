'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      comment: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      postedDate: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
      },
      updatedDate: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
      }
    }, {
      modelName: 'Comment',
      tableName: 'Comments',
      timestamps: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};