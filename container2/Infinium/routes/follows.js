const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Op } = require("sequelize");

const db = require('../db/models');
const { User, Follower } = db;
const { asyncHandler } = require('./utils');
const { sequelize } = require('../db/models');
const { requireAuth } = require('../auth');

/* Need to add a validator!*/


/* Create a follower */

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { currentUserId } = req.body;
  const userId = parseInt(currentUserId, 10)
  const followerId = res.locals.user.id;
  const exists = await Follower.findOne({
    where: {
      [Op.and]: [
        { userId: userId },
        { followerId: followerId }
      ]
    }
  })
  if (!exists) {
    const newFollower = Follower.build({
      userId,
      followerId
    });

    const validateErrors = validationResult(req);

    if (validateErrors.isEmpty()) {
      await newFollower.save();
      res.status(204).end();
    } else {
      const errors = validateErrors.array().map(error => error.msg);
      res.render('user', {
        errors,
      });
    }
  } else {
    return
  }
}));


/* Delete a follower */


router.delete('/', requireAuth, asyncHandler(async (req, res) => {
  const { currentUserId } = req.body;
  const userId = parseInt(currentUserId, 10)
  const followerId = res.locals.user.id;
  const follow = await Follower.findOne({
    where: {
      [Op.and]: [
        { userId: userId },
        { followerId: followerId }
      ]
    }
  })

  if (follow) {
      await follow.destroy();
      res.status(204).end();
  } else {
      const errors = validateErrors.array().map(error => error.msg);
      res.render('user', {
          errors,
      });
  }
}));

module.exports = router;
