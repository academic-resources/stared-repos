const express = require('express');
const path = require('path');
const fs = require('fs');

const { storyDraftValidators, storyPublishValidators } = require('../validations/stories');
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");
const { requireAuth, checkUserRouteAccess, getRouteUserId } = require('../auth');

const { User, Story, storyLike, Comment, Follower } = require('../db/models');

const { csrfProtection,
  asyncHandler,
  setHexadecimal,
  parseHexadecimal,
  preProcessStories,
  wantsJSON,
  isPublished,
  isDraft,
  getAuthor,
  sendStoryList,
  getStoryList,
  getHighlights,
  getTrending,
  buildMissingStoryTitle,
  prepareStoryEditorDetails,
  checkEmpty,
} = require('./utils');

const router = express.Router();

/* GET all published stories */
router.get(`/all`, asyncHandler(async (req, res) => {
  const stories = await getStoryList();
  sendStoryList(wantsJSON(req), res, stories, 'Stories since the beginning of time...');
}));

/* GET all recent stories (limit 5 unless optional route indicates differently) */
router.get(/\/recent(\/(\d+))?/, asyncHandler(async (req, res) => {
  const limits = req.params[1] ? parseInt(req.params[1], 10) : 5;
  const stories = await getStoryList({ ordering: [['updatedAt', 'DESC']], limits });
  sendStoryList(wantsJSON(req), res, stories, `The ${limits} most recent stories`);
}));

/* GET all trending stories (limit 3 unless optional route indicates differently) */
router.get(/\/trending(\/(\d+))?/, asyncHandler(async (req, res) => {
  const stories = await getStoryList({ filter: getTrending, req });
  sendStoryList(wantsJSON(req), res, stories, `Trending stories`);
}));

/* GET highlight stories (limit 5) */
router.get('/highlights', asyncHandler(async (req, res) => {
  const stories = await getStoryList({ filter: getHighlights });
  sendStoryList(wantsJSON(req), res, stories, `Highlight stories`);
}));

/* GET new story */
router.get('/new-story', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const id = res.locals.user.id;
  const user = await User.findByPk(id);

  res.render('story-edit', {
    userId: user.id,
    name: user.username,
    contextMessage: `Draft by ${user.username}`,
    contextControls: `story-edit`,
    formAction: req.originalUrl,
    csrfToken: req.csrfToken(),
  });
}));

/* POST save new story for the first time */
router.post('/new-story', requireAuth, csrfProtection, storyDraftValidators, asyncHandler(async (req, res) => {
  let { title, draft } = req.body;
  const userId = res.locals.user.id;
  const name = res.locals.user.username;

  //If no title, build one from the body
  if (checkEmpty(title) && !checkEmpty(draft)) {
    title = buildMissingStoryTitle(draft);
  }

  let story = Story.build({
    title,
    draft,
    userId,
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    story = await story.save();
    const hexId = setHexadecimal(story.id);
    res.redirect(`/users/${userId}/stories/${hexId}/draft`);
  }
  else {
    const errors = validatorErrors.array().map(error => error.msg);
    const details = prepareStoryEditorDetails(req, story, name);
    res.render('story-edit', {
      ...details,
      errors,
    });
  }

}));

/* USER route integrated story display */
/* GET for ANY user to see a single user story to read */
router.get(/\/([0-9a-f]+)$/, csrfProtection, asyncHandler(async (req, res, next) => {
  const userId = getRouteUserId(req);
  const storyId = parseHexadecimal(req.params[0]);
  let story = await Story.findOne({
    where: isPublished(userId, storyId),
    include: getAuthor()
  });

  let storyLikes = await storyLike.findAll({
    where: {
      storyId
    }
  });

  let count = 0
  storyLikes.forEach((likes) => {
    count += likes.likesCount
  })

  const author = story.User.username;
  const description = story.User.description;
  const avatar = story.User.avatar;

  const findAllFollowers = await Follower.findAll({
    where: {
      userId: userId
    }
  });
  const findAllFollowing = await Follower.findAll({
    where: {
      followerId: userId
    }
  });

  const followerCount = findAllFollowers.length;
  const followingCount = findAllFollowing.length;
  let authUser = null;
  let followCompare = null;
  if (res.locals.authenticated) { //Only check logged in users
    authUser = res.locals.user.id;

    followCompare = await Follower.findOne({
      where: {
        [Op.and]: [
          { userId: userId },
          { followerId: authUser }
        ]
      }
    })
  }
  const authCompare = parseInt(authUser, 10) === parseInt(userId, 10);

  const comments = await Comment.findAll({
    where: { storyId },
    include: User,
    order: [['createdAt', 'DESC']],
  });

  let loggedInUser = null;
  if (res.locals.authenticated) loggedInUser = res.locals.user.id;

  comments.forEach(comment => {
      if (comment.userId === loggedInUser) {
          comment.authCompare = true;
      }
  });

  if (!story) next(); //Become a 404
  [story] = preProcessStories([story]);

  const details = {
    title: story.title,
    subtitle: story.subtitle,
    author: story.author,
    authorId: story.authorId,
    authorAvatar: story.authorAvatar,
    date: story.date,
    storyBody: story.published,
  };
  if (wantsJSON(req)) {
    res.json(details);
  }
  else {
    res.render('story-id', {
      ...details,
      userId,
      story,
      comments,
      followerCount,
      followingCount,
      followCompare,
      authCompare,
      author,
      storyId,
      storyLikes: count,
      description,
      avatar,
      token: req.csrfToken()
    });
  }
}));

/* GET all user's own stories by the specific logged in user */

router.get(
  '/', // This route handles /users/<id>/stories
  requireAuth,
  checkUserRouteAccess,
  asyncHandler(async (req, res, next) => {

    const userId = res.locals.user.id;
    const published = await getStoryList({ userId, ordering: [['updatedAt', 'DESC']] });
    const drafts = await getStoryList({ userId, ordering: [['updatedAt', 'DESC']], group: 'drafts' });
    if (!published && !drafts) res.redirect(`/users/${userId}`);

    const storySet = true;

    res.render('story-list', {
      title: `Your stories`,
      storySet,
      published,
      drafts,
      contextControls: 'not-home',
    });
  })
);

/* GET single user's own saved story draft */
router.get(
  /\/([0-9a-f]+)\/draft$/,
  requireAuth,
  checkUserRouteAccess,
  csrfProtection,
  storyDraftValidators,
  asyncHandler(
    async (req, res, next) => {
      const userId = res.locals.user.id;
      const storyId = parseHexadecimal(req.params[0]);

      let story = await Story.findOne({
        where: {id: storyId},
        include: getAuthor(),
      });

      if (!story) next(); //Become a 404

      //Move story out of published status if needed
      if (!story.draft) {
        story.draft = story.published;
        story.published = '';
        await story.update({ published: '', draft: story.draft })
      }

      const details = prepareStoryEditorDetails(req, story);

      res.render('story-edit', { ...details });
    })
);

/* POST single user's own saved story draft to save edits */
router.post(
  /\/([0-9a-f]+)\/draft$/,
  requireAuth,
  checkUserRouteAccess,
  csrfProtection,
  storyDraftValidators,
  asyncHandler(
    async (req, res, next) => {
      const userId = res.locals.user.id;
      const storyId = parseHexadecimal(req.params[0]);
      let { title, draft } = req.body;

      let story = await Story.findOne({
        where: isDraft(userId, storyId),
        include: getAuthor(),
      });

      if (!story) next(); //Become a 404

      //If no title, build one from the body
      if (checkEmpty(title) && !checkEmpty(draft)) {
        title = buildMissingStoryTitle(draft);
      }

      const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {
        story = await story.update({
          title,
          draft,
        });

        const details = prepareStoryEditorDetails(req, story);

        res.render('story-edit', { ...details });
      }
      else {
        const errors = validatorErrors.array().map(error => error.msg);
        story.title = title;
        story.draft = draft;
        const details = prepareStoryEditorDetails(req, story);
        res.render('story-edit', {
          ...details,
          errors,
        });
      }

  })
);

/* POST single user's own publish story draft */
router.post(
  /\/([0-9a-f]+)\/draft\/publish$/,
  requireAuth,
  checkUserRouteAccess,
  csrfProtection,
  storyPublishValidators,
  asyncHandler(
    async (req, res, next) => {
      const userId = res.locals.user.id;
      const storyId = parseHexadecimal(req.params[0]);
      let { title, draft, subtitle, imageLink } = req.body;

      let story = await Story.findOne({
        where: isDraft(userId, storyId),
        include: getAuthor(),
      });

      if (!story) next(); //Become a 404

      //If no title, build one from the body
      if (checkEmpty(title) && !checkEmpty(draft)) {
        title = buildMissingStoryTitle(draft);
      }

      const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {
        story = await story.update({
          title,
          subtitle,
          imageLink,
          published: draft,
          draft: null,
        });

        const captureUrl = req.originalUrl.match(/^(?<url>.*)\/draft\/publish$/).groups;
        res.redirect(captureUrl.url)
      }
      else {
        const publishErrors = validatorErrors.array().map(error => error.msg);
        story.title = title;
        story.draft = draft;
        story.subtitle = subtitle;
        story.imageLink = imageLink;
        const details = prepareStoryEditorDetails(req, story);
        res.render('story-edit', {
          ...details,
          publishErrors,
        });
      }
  })
);

/* GET user's own request to delete their story */
router.delete(
  /\/([0-9a-f]+)$/,
  requireAuth,
  checkUserRouteAccess,
  asyncHandler(async (req, res, next) => {
    const storyId = parseHexadecimal(req.params[0]);
    const story = await Story.findByPk(storyId);
    if (story) {
      await story.destroy();
      res.status(204).end();
    }
    else {
      const err = new Error(`Story database id ${storyId} (hexId: ${req.params[0]}) not found.`)
      err.status = 404;
      return next(err);;
    }
  })
);

/* Redirect /stories to root '/' */
router.get('/', asyncHandler(async (req, res) => {
  res.redirect('/');
}));

module.exports = router;
