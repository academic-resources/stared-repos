const express = require("express");
const followRouter = express.Router();
const { check, validationResult } = require("express-validator");

const { asyncHandler } = require("../utils");
const db = require("../db/models");
const { User, Following } = db;
const { requireAuth } = require("../auth");
const { router } = require("../app");
const userRouter = require("./users");

followRouter.use(express.urlencoded());

followRouter.post("/:id(\\d+)/addFollow", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const { userId } = req.body;

    const follow = await Following.create({
        authorId: id,
        followerId: userId
    });

    res.json({ follow })
}));

followRouter.get("/:id(\\d+)/followedAuthors", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const author = await User.findByPk(id, {
        include: {
            model: User,
            as: 'followedAuthors'
        }
    });
    const followedAuthors = author.followedAuthors.map((author) => ({username: author.userName, email: author.email, id: author.id}));
    res.json({ followedAuthors });
    console.log(followedAuthors.length);
}));

followRouter.get("/:id(\\d+)/followers", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const author = await User.findByPk(id, {
        include: {
            model: User,
            as: 'followers'
        }
    });
    const followers = author.followers.map((follower) => ({username: follower.userName, email: follower.email, id: follower.id}));
    res.json({ followers });
}));

followRouter.get("/:id(\\d+)/followers/test", asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const author = await User.findByPk(id);
        res.render('follow-test', { author });
}));

module.exports = followRouter;
