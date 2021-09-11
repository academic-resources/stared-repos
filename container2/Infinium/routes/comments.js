const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { Comment, User } = db;
const { asyncHandler, parseHexadecimal } = require('./utils');
const commentValidator = require('../validations/comments');
const { sequelize } = require('../db/models');
const{requireAuth} = require('../auth');

const commentNotFoundError = (id) => {
    const error = new Error(`Comment ${id} not found`);
    error.title = 'Comment not found';
    error.status = 404;
    return error;
}

router.post('/', commentValidator, requireAuth, asyncHandler(async (req, res) => {
    const { comment, storiesId } = req.body;
    const storyId = parseHexadecimal(storiesId)

    const userId = res.locals.user.id;

    const newComment =  Comment.build({
        comment,
        storyId,
        userId,
    });

    const validateErrors = validationResult(req);

    if (validateErrors.isEmpty()) {
        await newComment.save();
        //User can have more than one comment on a a story, so
        //need a findAll here and then grab the "last" comment
        //to return the newest one
        let getComment = await Comment.findAll({
            where: {
                userId
            },
            include: User,
        });
        //Grabbing newest comment from this user on this story
        getComment = getComment[getComment.length - 1];
        const username = getComment.User.username;
        const commentId = getComment.id;

        res.json({username, commentId});
        res.status(204).end();
    } else {
        const errors = validateErrors.array().map(error => error.msg);
        res.render('comments', {
            errors,
        });
    }
}));

router.put('/:id(\\d+)', commentValidator, requireAuth, asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const oldComment = await Comment.findByPk(id);

    const validateErrors = validationResult(req);

    if (validateErrors.isEmpty()) {
        const { comment } = req.body;
        oldComment.comment = comment;
        await oldComment.save();
        res.status(204).end();
    }
    else {
        const errors = validateErrors.array().map(error => error.msg);
        res.render('comments', {
            errors,
        });
    }
}));

router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const comment = await Comment.findByPk(id);

    if (comment) {
        await comment.destroy();
        res.status(204).end();
    } else {
        const errors = validateErrors.array().map(error => error.msg);
        res.render('comments', {
            errors,
        });
    }
}));

module.exports = router;
