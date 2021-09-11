const express = require("express");
const articleRouter = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");
const db = require("../db/models");
const { Article, Comment, User } = db;
const { check } = require("express-validator");
const { requireAuth } = require("../auth");

articleRouter.use(express.urlencoded());

// *** GET: All Articles in Database ***
articleRouter.get("/", async (req, res, next) => {
  const articles = await Article.findAll({ include: "User" });
  if (articles) {
    res.send({ articles });
  } else {
    next();
  }
});

articleRouter.get("/test", (req, res) => {
  res.render("test");
});

articleRouter.get("/new", (req, res) => {
  res.render("create-article");
});
const articleValidations = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title.")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters."),
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please provide article content."),
  handleValidationErrors,
];

const articleNotFoundError = (articleId) => {
  const error = new Error();
  error.title = "Article Not Found";
  error.status = 404;
  error.message = `${articleId} was not found.`;
  return error;
};

// *** Fetch Specific Article via ID ***
articleRouter.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const article = await Article.findByPk(id, {
      include: { model: Comment, as: "comments", include: "User" },
    });
    // const userId = article.userId;
    // const user = await User.findbyPk(userId)
    if (article === null) {
      next(articleNotFoundError(article));
    } else {
      res.send({
        article,
        // user,
        comments: article.comments,
      });
    }
  })
);

// Renders Invidual Article View
articleRouter.get(
  "/view/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const article = await Article.findByPk(id, {
      include: { model: Comment, as: "comments", include: "User" },
    });
    const userId = article.userId;
    const user = await User.findByPk(userId)
    if (article === null) {
      next(articleNotFoundError(article));
    } else {
      res.render("article-view", {
        article,
        user,
        comments: article.comments,
      });
    }
  })
);

// *** Post New Article to Database ***
articleRouter.post(
  "/",
  requireAuth,
  articleValidations,
  asyncHandler(async (req, res) => {
    const article = await Article.create(req.body);
    if (article) {
      return res.json({ article });
    }
  })
);

articleRouter.get("/new", (req, res) => {
  res.render("create-article");
});

articleRouter.put(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { body } = req.body;
    const articleId = await Article.findByPk(req.params.id);
    if (articleId === null) {
      next(articleNotFoundError(articleId));
    } else {
      articleId.body = `${body}`;
      await articleId.save();
      res.json({ articleId });
    }
  })
);

articleRouter.put(
  "/:id(\\d+)/clap",
  requireAuth,
  asyncHandler(async (req, res) => {
    const article = await Article.findByPk(req.params.id);
    article.claps += 1;
    await article.save();
    res.json({ claps: article.claps });
  })
)

articleRouter.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const articleId = await Article.findByPk(req.params.id);
    if (articleId === null) {
      next(articleNotFoundError(articleId));
    } else {
      await articleId.destroy({
        where: {
          articleId,
        },
      });
    }
    res.redirect("/");
  })
);

module.exports = articleRouter;
