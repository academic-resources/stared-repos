'use strict';

const Sequelize = require('sequelize');
const config = require('../../config/database.js');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {
  User: require('./user')(sequelize, Sequelize),
  Post: require('./post')(sequelize, Sequelize),
  Score: require('./score')(sequelize, Sequelize),
  Thread: require('./thread')(sequelize, Sequelize),
  sequelize,
  Sequelize
};

Object.values(db).forEach(model => model.associate && model.associate(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
