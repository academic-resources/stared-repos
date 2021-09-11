const express = require("express");
const router = express.Router();
const {requireAuth} = require('../auth')
const db = require("../models");
const { Op } = require("sequelize");
const { csrfProtection, asyncHandler } = require('./utils');


router.get('/dashboard', requireAuth, asyncHandler(async (req, res) => {
    const ownedSurveys = await db.Survey.findAll({
        where: {
            userId: {
                [Op.eq]: res.locals.user.id
            }
        },
        include: [db.Question, db.QuestionResponse, db.Upvote]
    });

    const ownedResponses = () => {
        let userArray = [];
        ownedSurveys.forEach(el =>{
            if (!userArray.includes(el.QuestionResponses)) {
                userArray.push(el.QuestionResponses)
            }
        })
        count= 0;
        userArray.forEach(el => {
            count+= el.length;
        })
        return count;
    }

    const mostPopular= () => {
        let winner = ownedSurveys[0];
        ownedSurveys.forEach(el => {
            if (el.Upvotes.length > winner.Upvotes.length) {
                winner = el
            }
        })
        if (winner) {
            return `"${winner.name}" with ${winner.Upvotes.length} upvotes!`;
        } else {
            return false;
        }
    }
    let mostPop = mostPopular()
    totalResp = ownedResponses()

    const drafts= ownedSurveys.filter(el => el.published === false)
    res.render('dashboard', {
        title: "SurveyDonkey Dashboard",
        ownedSurveys,
        drafts,
        totalResp,
        mostPop
    });
}));

module.exports = router;
