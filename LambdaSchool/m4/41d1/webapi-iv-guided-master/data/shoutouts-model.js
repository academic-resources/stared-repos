const db = require('./db.js');

module.exports = {
  find,
  add
};

function find() {
  return db('shoutouts');
}

function add(shout) {
  return db('shoutouts').insert(shout)
  .then(ids => {
    return db('shoutouts').where({ id: ids[0] }).first();
  });
}