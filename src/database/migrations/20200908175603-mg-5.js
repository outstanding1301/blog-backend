'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    });

    await queryInterface.dropTable('Posts');

    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
