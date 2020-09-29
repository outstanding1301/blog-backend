'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER TABLE "Likes" ADD CONSTRAINT "likeId" PRIMARY KEY ("userId", "postId")');
  },

  down: async (queryInterface, Sequelize) => {
  }
};
