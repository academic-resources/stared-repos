const router = require("express").Router();

const Todos = require("./todos-model");

// api/todos
router.get("/", (req, res) => {
  Todos.find()
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});


module.exports = router;
