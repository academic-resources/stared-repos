"use strict";

const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@test.com", hashedPassword: bcrypt.hashSync("test"), userName: "Demo", bio: "This is just a demo", createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: `In west Philadelphia born and raised
          On the playground was where I spent most of my days`,
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: "I exist as I am and that's enough...",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: "Nashville native in Los Angeles, writing prose but not for the the pros",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: "musician / saxophone / fur babies",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: "I pledge allegiance to the flag of the United States of America",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: "Say hello to my little friend.",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: "Luke I am your father",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: "I had a dream today oh my about a lucky man who made the grade.",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: "There's a lady who says all that glitters is gold.",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          bio: "If you don't eat your meat you can't have any pudding.",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
