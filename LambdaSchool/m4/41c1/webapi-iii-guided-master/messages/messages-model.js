const db = require('../data/dbConfig.js')

module.exports = {
  find,
  findById,
  add,
  remove,
  update
};

function find(query) {
  let { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('messages')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('messages')
    .where({ id })
    .first();
}

async function add(message) {
  const [id] = await db('messages').insert(message);

  return findById(id);
}

function remove(id) {
  return db('messages')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('messages')
    .where({ id })
    .update(changes, '*');
}
