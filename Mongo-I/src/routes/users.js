const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.route("/").get(UsersController.index).post(UsersController.newUser);

router
  .route("/:id")
  .get(UsersController.getUser)
  .delete(UsersController.deleteUser)
  .put(UsersController.replaceUser)
  .patch(UsersController.updateUser);

router
  .route("/:id/posts")
  .get(UsersController.getUserPosts)
  .post(UsersController.newUserPost);

module.exports = router;
