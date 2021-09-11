"use strict";

const bcrypt = require("bcryptjs");

function createPassword() {
  return bcrypt.hashSync("password");
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Players", [
      r({
        name: "Demo-lition",
        email: "demo@example.com",
        hashedPassword: createPassword(),
      }),
      r({
        name: "Yusuke",
        email: "yusuke@example.com",
        hashedPassword: createPassword(),
      }),
      r({
        name: "Peta",
        email: "petra@example.com",
        hashedPassword: createPassword(),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Players");
  },
};
