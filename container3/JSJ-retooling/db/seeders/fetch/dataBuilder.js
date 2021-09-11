// const fetch = require('node-fetch');
const fs = require('fs');
const faker = require('faker');
const bcrypt = require('bcryptjs');
// const fsprom = fs.promises;
// const db = require('../../../models');

// const fetcher = async () => {
//   const fetchData = await fetch('https://api.stackexchange.com/2.2/questions?pagesize=100&order=desc&sort=votes&tagged=javascript&site=stackoverflow&filter=!td4SDmGtBjnw6xm9cNhTsfnlh2K.cxD');
//   const questionObj = await fetchData.json();
//   questionObj.items.forEach(async ({ body, title, answers, score }, idx) => {
//     await fsprom.appendFile(`${__dirname}/bulkData/question${idx + 1}.txt`, JSON.stringify({ body, title, answers, score }));
//   });
// };

const nameMaker = () => {
  const pNum = Math.floor(Math.random() * 9999);
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const userName = `${firstName.toLowerCase()}.${lastName}${pNum}`;
  const email = `${userName}@website.com`;
  const hashedPassword = bcrypt.hashSync(faker.internet.password(), 10);
  return { userName, email, hashedPassword, createdAt: new Date(), updatedAt: new Date() };
};

for (let i = 10000; i < 20000; i++) {
  fs.appendFileSync(`${__dirname}/users/users${Math.floor(i / 100) + 1}.txt`, JSON.stringify(nameMaker()) + '\n');
}
