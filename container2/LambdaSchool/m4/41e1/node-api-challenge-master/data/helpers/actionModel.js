const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  let query = db("actions");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then(action => {
        if (action) {
          return mappers.actionToBody(action);
        } else {
          return null;
        }
      });
  } else {
    return query.then(actions => {
      return actions.map(action => mappers.actionToBody(action));
    });
  }
}

function insert(action) {
  return db("actions")
    .insert(action)
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db("actions")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("actions")
    .where("id", id)
    .del();
}
