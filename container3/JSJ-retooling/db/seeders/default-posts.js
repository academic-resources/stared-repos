'use strict';

const fs = require('fs');
const path = require('path');

const postObjs = [];

for (let i = 1; i <= 100; i++) {
  const { body, score } = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./fetch/bulkData/questions-and-threads/question${i}.txt`), 'utf-8'));
  postObjs.push({ body, userId: Math.ceil(Math.random() * 3), threadId: i, isQuestion: true, score });
}

for (let i = 1; i <= 100; i++) {
  const { answers } = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./fetch/bulkData/questions-and-threads/question${i}.txt`), 'utf-8'));
  answers.forEach(({ body, score }) => {
    postObjs.push({ body, userId: Math.ceil(Math.random() * 3), threadId: i, isQuestion: false, score });
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', postObjs);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
