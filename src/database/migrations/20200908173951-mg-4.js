'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'createdAt');
    queryInterface.removeColumn('Posts', 'createdAt');
    queryInterface.removeColumn('Users', 'updatedAt');
    queryInterface.removeColumn('Posts', 'updatedAt');
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
