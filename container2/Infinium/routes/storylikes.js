const express = require('express');
const router = express.Router();
const { requireAuth } = require('../auth');
const { parseHexadecimal, getAuthor, isPublished } = require('./utils');

const { storyLike, Story } = require('../db/models');
const { asyncHandler } = require('./utils');

// POST for Likes fetch request
router.post(`/users/:id/stories/:storyId/upvote`, requireAuth, asyncHandler( async (req, res, next) => {
    let { storyId } = req.body
    let parsedStoryId = parseHexadecimal(storyId);
    let likes = await storyLike.findAll({
      where: {
        storyId: parsedStoryId
      }
    });

    let counter = 0;
    const userLimit = 50;
    let limitedOut = false;

    if (likes.length) {
      //Need to track if this user has ever given a like to this story
      let thisUsersFirstLike = true;

      likes.forEach( async (like) => {
        if (like.userId === res.locals.user.id) {
          thisUsersFirstLike = false; //User gave like before
          //Don't add one if the limit is already reached
          if (like.likesCount < userLimit) {
            like.likesCount += 1;
            //Need this before await to catch the value
            counter += like.likesCount;
            await like.save();
          } else {
            limitedOut = true;
            counter += like.likesCount;
          }
        }
        else {
          counter += like.likesCount;
        }
      });
      //If the user did not get added during the loop, this is their first like for this story
      if (thisUsersFirstLike) {
        firstLikeBetweenUserAndStory();
      }
    } else {
      //Create the very first like for a story if none existed
      firstLikeBetweenUserAndStory();
    }
    res.json({ likesCount: counter, limitedOut });

    //Helper function since it could be called in either case
    //of it being the storie's first like or the user's first like
    async function firstLikeBetweenUserAndStory() {
      counter += 1;
      await storyLike.create({
        likesCount: 1,
        userId: res.locals.user.id,
        storyId: parsedStoryId
      });
    }

  }));




module.exports = router;
