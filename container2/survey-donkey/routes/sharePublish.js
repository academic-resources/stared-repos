const express = require("express");
const router = express.Router();
const {requireAuth} = require('../auth')
const db = require("../models");
const { Op } = require("sequelize");
const { csrfProtection, asyncHandler } = require('./utils');

router.get('/share/:id', requireAuth, asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10));
    res.render('share', {
        survey
    })
}))


router.post('/publish/:id', requireAuth, asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10));
    survey.published = true;
    await survey.save()
    res.render('share', {
        survey,
        publish: true
    })

}))



module.exports = router;
