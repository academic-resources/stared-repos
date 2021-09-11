const db = require("../database/dbConfig");

module.exports = {
  addTodo,
  find,
  findBy,
  findById
  // update,
  // remove
};

function find() {
  return db("todos");
}

function findById(id) {
  return db("todos")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("todos").where(filter);
}

async function addTodo(todo, admin_id, volunteer_id) {
  let newTodo = {
    title: todo.title,
    description: todo.description,
    is_completed: todo.is_completed || false,
    admin_id,
    volunteer_id
  };
  const [id] = await db("todos").insert(newTodo);
  return findById(id);
}
