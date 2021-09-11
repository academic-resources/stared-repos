const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where({ id: Number(id) })
    .first();
}

function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}
