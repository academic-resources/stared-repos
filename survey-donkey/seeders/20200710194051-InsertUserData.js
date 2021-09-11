'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      { createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "da", role: "s", hashedPassword: "a", firstName: "ds" },
      { createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "dr", role: "s", hashedPassword: "a", firstName: "dsaf" },
      { createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "t", role: "s", hashedPassword: "a", firstName: "dsaf" },
      { createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "y", role: "s", hashedPassword: "a", firstName: "dsf" },
      { createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "u", role: "s", hashedPassword: "a", firstName: "dfadsf" },
      { createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "d", role: "s", hashedPassword: "a", firstName: "dasf" }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
