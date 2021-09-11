'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Surveys', [
{createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Surveys', null, {});
  }
};
