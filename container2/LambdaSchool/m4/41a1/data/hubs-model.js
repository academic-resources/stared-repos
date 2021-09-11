const knex = require("knex");

const knexfile = require("../knexfile.js");

const environment = process.env.NODE_ENV || "development";
const knexConfiguration = knexfile[environment];
const db = knex(knexConfiguration);

module.exports = {
  find,
  findById,
  add,
  remove,
  update
};

async function find(query = {}) {
  const { page = 1, limit = 10, sortby = "id", sortdir = "asc" } = query;
  const offset = limit * (page - 1);

  let rows = await db("hubs")
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db("hubs")
    .where({ id })
    .first();
}

async function add(hub) {
  const [id] = await db("hubs").insert(hub, "id");

  return findById(id);
}

async function remove(id) {
  const removed = await findById(id);

  await db("hubs")
    .where({ id })
    .del();

  return removed;
}

async function update(id, changes) {
  await db("hubs")
    .where({ id })
    .update(changes);

  return findById(id);
}
