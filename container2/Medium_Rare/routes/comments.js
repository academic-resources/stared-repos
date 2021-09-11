const express = require("express");
const commentRouter = express.Router();
const { asyncHandler } = require("../utils");
const db = require("../db/models");
const { Article, Comment } = db;
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const { router } = require("../app");
const userRouter = require("./users");

commentRouter.use(express.urlencoded());

commentRouter.get("/:id(\\d+)/", (req, res) => {
  //console.log(req)

    res.render('create-comment');
});
commentRouter.post("/:id(\\d+)/", requireAuth, asyncHandler( async(req, res) => {
    const { message } = req.body;

    const comment = await Comment.create({
      comment: message,
      userId: req.user.id,
      articleId: req.params.id
    });

    res.redirect('/');

}));
module.exports = commentRouter;
