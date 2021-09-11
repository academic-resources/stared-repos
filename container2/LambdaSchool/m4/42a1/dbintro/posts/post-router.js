const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // list of posts
  // select from posts
  // all database operations return a promise
  db.select("*")
    .from("posts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to get the list of posts" });
    });
});

router.get("/:id", (req, res) => {
  // a post by it's id
  // select * from posts where id = :id
  getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to get the post" });
    });
});

router.post("/", (req, res) => {
  // add a post
  // insert into posts () values ()
  db("posts")
    .insert(req.body, "id") // will generate a warning on console when using sqlite, ignore that
    .then(ids => {
      // adding that return sends any errors up the chain to be
      // handled by the catch in line 50. Reading up on Promises will make it clearer.
      return getById(ids[0]).then(inserted => {
        res.status(201).json(inserted);
      });
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to add the post" });
    });
});

router.put("/:id", (req, res) => {
  // update a post
  const id = req.params.id;
  const changes = req.body;
  db("posts")
    .where({ id }) // remember to filter or all records will be updated (BAD PANDA!!)
    .update(changes) // could be partial changes, only one column is enough
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to update the post" });
    });
});

router.delete("/:id", (req, res) => {
  // removes a post
  const id = req.params.id;
  db("posts")
    .where({ id }) // remember to filter or all records will be deleted (BAD PANDA!!)
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to remove the post" });
    });
});

module.exports = router;

function getById(id) {
  return db("posts")
    .where({ id })
    .first();
}
