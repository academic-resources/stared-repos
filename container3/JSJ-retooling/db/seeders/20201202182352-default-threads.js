'use strict';

const fs = require('fs');
const path = require('path');

const threadObjs = [];

let random;

for (let i = 1; i <= 100; i++) {
  const threadJSON = fs.readFileSync(path.resolve(__dirname, `./fetch/bulkData/questions-and-threads/question${i}.txt`), 'utf-8');
  threadObjs.push({
    title: JSON.parse(threadJSON).title,
    userId: ((random = Math.floor(1 + Math.random() * 5)) || true) && Math.round(random / 2)
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Threads', threadObjs);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Threads', null, {});
  }
};
