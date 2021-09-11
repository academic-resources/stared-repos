'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@email.com',
        firstName: 'Demo',
        lastName: 'User',
        artistName: 'DemoArtist',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'hilary@email.com',
        firstName: 'Hilary',
        lastName: 'Hahn',
        artistName: 'Hilary Hahn',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'cordova.quartet@gmail.com',
        firstName: 'Matt',
        lastName: 'Kufchak',
        artistName: 'Cordova Quartet',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'yo-yo@email.com',
        firstName: 'Yo-Yo',
        lastName: 'Ma',
        artistName: 'Yo-Yo Ma',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'janos@email.com',
        firstName: 'János',
        lastName: 'Starker',
        artistName: 'János Starker',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'beethoven4tet@email.com',
        firstName: 'Dmitri',
        lastName: 'Tsyganov',
        artistName: 'Beethoven Quartet',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'emerson4tet@email.com',
        firstName: 'David',
        lastName: 'Finckel',
        artistName: 'Emerson String Quartet',
        hashedPassword: bcrypt.hashSync('emerson'),
      },
      {
        email: 'takacs@email.com',
        firstName: 'Károly',
        lastName: 'Schranz',
        artistName: 'Takács Quartet',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        artistName: faker.random.word(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        artistName: faker.random.word(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
