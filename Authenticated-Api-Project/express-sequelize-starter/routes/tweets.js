const express = require("express");
const db = require("../db/models");
const { check } = require("express-validator");
const { Tweet, User } = db;
const router = express.Router();
const cors = require("cors");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { requireAuth } = require("../auth");

router.use(requireAuth);

const tweetNotFoundError = (id) => {
  const err = new Error(`Associated Tweet with ID ${id} could not be found!`);
  err.title = "Tweet not found.";
  err.status = 404;
  return err;
};

const tweetValidations = [
  check("message")
    .exists({ checkFalsy: true })
    .withMessage("Tweet does not Exist!")
    .isLength({ max: 280 })
    .withMessage("Tweet may not be more than 280 characters"),
];

// GET /tweets
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll({
      include: [{ model: User, as: "user", attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
      attributes: ["message"],
    });
    res.json({ tweets });
  })
);

// GET /tweets/:id
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const key = parseInt(req.params.id, 10);
    const tweet = await Tweet.findByPk(key);

    if (tweet) {
      res.json({ tweet });
    } else {
      next(tweetNotFoundError(key));
    }
  })
);

// POST /tweets
router.post(
  "/",
  tweetValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { message } = req.body;
    const tweet = await Tweet.create({ message, userId: req.user.id });
    res.status(201).json({ tweet });
  })
);

// PUT /tweets/:id
router.put(
  "/:id(\\d+)",
  tweetValidations,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const tweetId = parseInt(req.params.id, 10);
    const tweet = await Tweet.findByPk(tweetId);

    if (tweet) {
      await tweet.update({ message: req.body.message });
      res.json({ tweet });
    } else {
      next(tweetNotFoundError(tweetId));
    }
  })
);

// DELETE /tweets/:id
router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const tweetId = parseInt(req.params.id, 10);
    const tweet = await Tweet.findByPk(tweetId);

    if (tweet) {
      await tweet.destroy();
      res.status(204).end();
    } else {
      next(tweetNotFoundError(tweetId));
    }
  })
);

module.exports = router;
