const csrf = require('csurf');
const { User, Story } = require('../db/models');
const { Op } = require("sequelize");
const fs = require('fs');

const csrfProtection = csrf({cookie: true});

const asyncHandler = (handler) => {
    return (req, res, next) => {
        return handler(req, res, next).catch(err => next(err));
    };
};

/* Two helper functions for converting to hexadecimal for story URL routes */
const setHexadecimal = number => number.toString(16);

const parseHexadecimal = hexString => parseInt(hexString, 16);

/* Used to build a cleaner story object to send in requests, including the hexId for the URL path */
const preProcessStories = (stories, username) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const processed = stories.map(story => {
        story = story.toJSON();
        story.hexId = story.id ? setHexadecimal(story.id) : null;
        story.author = username || story.User.username;
        story.authorId = story.User ? story.User.id : null;
        story.authorAvatar = story.User ? story.User.avatar : null;
        story.date = story.updatedAt ? story.updatedAt.toLocaleDateString("en-US", dateOptions) : null;
        delete story.User;
        return story;
    });
    return processed;
};

/* Reads request to determine if a JSON response is wanted, else HTML is sent */
const wantsJSON = req => {
    return /application\/json/.test(req.get('accept'));
}

/* Used to create the "where" query for stories, based on whether it is all users, one user, or one user's particular story */
const isPublished = (userId, storyId) => {
    const published = {
        [Op.and]: [{[Op.ne]: ''}, {[Op.ne]: null}]
    }
    if (userId) {
        if (storyId) {
            return {
                id: storyId,
                userId,
                published
            }
        }

        return {
            userId,
            published
        }
    }
    else {
        return {published}
    }
}

const isDraft = (userId, storyId) => {
    //When finding all a user's draft stories, it looks for empty published fields
    //However, when both userId and storyId is given, it is assumed that a published story
    //is returning to draft status
    const draft = {
        [Op.and]: [{[Op.ne]: ''}, {[Op.ne]: null}]
    }
    if (userId) {
        if (storyId) {
            return {
                id: storyId,
                userId,
                draft,
            }
        }

        return {
            userId,
            draft,
        }
    }
}

/* Used for include statements in routes to get author name of a story */
const getAuthor = () => {
    return [{
        model: User,
        attributes: ['username', 'id', 'description', 'avatar']
    }];
}

/* User to route the response as either JSON or HTML based on request */
const sendStoryList = (byJSON, res, stories, title) => {
    if(byJSON) {
        res.json({stories});
    }
    else {
        res.render('story-list', {
            title,
            stories
        });
    }
}

/* Trending filter callback */
const getTrending = (stories, req) => {
    //TODO implement actual trending logic, probably in the db query
    //Just randomly selecting trending stories
    const limits = req.params[1] ? parseInt(req.params[1],10) : 6;
    let limit = Math.min(limits, stories.length);

    let trending = [];
    if (stories) {
      for(let i=0; i<limit; i++) {
        const getIdx = Math.floor(Math.random() * stories.length);
        trending.push(...stories.splice(getIdx, 1));
      }
    }
    return trending;
}

/* Highlights filter callback */
const getHighlights = (stories) => {
    //TODO implement actual highlight logic, probably in the db query
    //Just randomly selecting highlight stories
    const limits = 5;
    let limit = Math.min(limits, stories.length);

    let highlight = [];
    if (stories) {
      for(let i=0; i<limit; i++) {
        const getIdx = Math.floor(Math.random() * stories.length);
        highlight.push(...stories.splice(getIdx, 1));
      }
    }
    return highlight
}

/* Get a list of stories based on critera; all parameters are optional, passed within an object for destructuring, but if storyId then userId is required; any filter function expects at least the stories list, possibly req and/or res */
const getStoryList = async ({req, res, userId, storyId, limits, ordering, filter, group='published'} = {}) => {
    if (group === 'published') {
        group = isPublished(userId, storyId);
    }
    else {
        group = isDraft(userId, storyId)
    }

    const queryParams = {
        where: group,
        include: getAuthor(),
    };

    if (limits) queryParams.limit = limits;
    if (ordering) queryParams.order = ordering;

    let stories = await Story.findAll(queryParams);

    if(stories) {
        stories = preProcessStories(stories);
        if(filter) stories = filter(stories, req, res);
    }

    return stories;
}

/* Constructs a title from the draft if no title was given */
const buildMissingStoryTitle = (draft) => {

    //Get length of string or first 100 characters
    let title = draft.slice(0, Math.min(draft.length - 1, 100));

    if (title.length === 100) {
        //Break at last whitespace character that is at least 3 spaces from end
        while(title.length > 97) {
            const match = title.match(/\s/g);
            if (!match) {
                title = title.slice(0, 97);
            } else {
                const whitespace = match[match.length - 1];
                const spaceIndex = title.lastIndexOf(whitespace);
                title = title.slice(0, spaceIndex);
            }
        }
        title += '...';
    }
    return title;
}

const prepareStoryEditorDetails = (req, story, name) => {

    [story] = preProcessStories([story], name);

    name = story.author;

    const details = {
      userId: story.userId,
      name,
      contextMessage: `Draft by ${name}`,
      contextControls: `story-edit-with-publish`,
      formAction: req.originalUrl,
      csrfToken: req.csrfToken(),
      title: story.title,
      subtitle: story.subtitle,
      author: name,
      authorId: story.authorId,
      authorAvatar: story.authorAvatar,
      date: story.date,
      draft: story.draft,
      imageLink: story.imageLink,
    };

    return details;
}

const checkEmpty = text => {
    return !text || text.match(/^\s*$/)
}

module.exports = {
    csrfProtection,
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
}
