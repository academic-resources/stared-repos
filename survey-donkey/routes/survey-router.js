const { Op } = require('sequelize')
const express = require('express')
const { check, validationResult } = require('express-validator')
const db = require('../models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

const router = express.Router()


router.get('/surveys/preview/:id', asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10), { include: { model: db.Question } });
    const questions = await db.Question.findAll({ where: { surveyId: parseInt(req.params.id, 10) } })
    const responses = questions.map(el => JSON.stringify(el));
    res.status(200)
    res.send(responses);
}));

router.get('/surveys/create', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    res.render('name-survey', {
        title: 'New Survey',
        token: req.csrfToken()
    })
}))

router.post('/surveys/create', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    console.log("ASDFASDFASDFASDFASFASDFSASDFASFASDFASDFASDFASDFADSFASDF", res.locals.user.id)
    const newSurvey = await db.Survey.create({
        name: req.body.surveyName,
        userId: res.locals.user.id,
        published: false,
    })
    res.redirect(`/surveys/create/${newSurvey.id}`)
}))

router.get('/surveys/create/:id', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(req.params.id);
    if (survey.userId === res.locals.user.id) {
        res.render('create-new-survey', { title: 'Create Survey', name: survey.name, token: req.csrfToken(), surveyId: req.params.id })
    } else {
        res.send("You don\'t own this survey!")
    }
}))

router.patch('/surveys/questions/update/:id', csrfProtection, asyncHandler(async (req,res) => {
    const question = await db.Question.findByPk(parseInt(req.params.id,10))
    console.log("questionText: ",req.body.questionText)
    const updatedQuestion = await question.update({
        questionText: req.body.questionText,
        opOne: req.body.opOne,
        opTwo: req.body.opTwo,
        opThree: req.body.opThree,
        opFour: req.body.opFour,
        opFive: req.body.opFive,
    })
    console.log(updatedQuestion)
    questionInfo = JSON.stringify(updatedQuestion)
    res.status(200)
    res.send(questionInfo)
    console.log("questionText: ",req.body.questionText)
}))

router.get('/surveys/questions/all/:id', csrfProtection, asyncHandler(async (req,res)=>{
    console.log(req.params.id)
    const questions = await db.Question.findAll({ where: { surveyId: parseInt(req.params.id, 10) } });
    console.log(questions)
    const questionInfo = JSON.stringify(questions)
    res.status(200)
    res.send(questionInfo)
    console.log(req.params.id)
    console.log(questionInfo)
    console.log
}))

router.post('/surveys/create/:id', csrfProtection, asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(req.body.surveyId);
    if (survey.userId === res.locals.user.id) {
        const question = await db.Question.create({
            questionText: req.body.prompt,
            surveyId: req.body.surveyId,
            questionType: req.body.questionType,
            opOne: req.body.opOne,
            opTwo: req.body.opTwo,
            opThree: req.body.opThree,
            opFour: req.body.opFour,
            opFive: req.body.opFive,
        })
        res.status(200)
        const jsonQuestion = JSON.stringify(question)
        res.send(jsonQuestion)
    } else {
        res.send("You don\'t own this survey!")
    }
}))

router.get('/surveys/questions/:id', requireAuth, csrfProtection,asyncHandler(async (req,res) => {
    console.log("req.id ASDFASDFASDFASDFASDF:  ",req.params.id)
    const question = await db.Question.findByPk(parseInt(req.params.id,10));
    res.send(question)
}))

router.post('/surveys/questions/:id',requireAuth, csrfProtection, asyncHandler(async(req,res)=>{
    const question = await db.Question.findByPk(parseInt(req.params.id,10));
    const survey = await db.Survey.findByPk(question.surveyId)
    if (survey.userId === res.locals.user.id) {
        db.Question.destroy({ where: { id: req.body.questionId } })
        res.status(200)
        res.send('question-deleted')
    } else {
        res.send("You don\'t own this survey!")
    }
}))

router.get('/surveys/:id', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10), { include: { model: db.Question } });
    const userResponses = await db.QuestionResponse.findAll({ where: { surveyId: parseInt(req.params.id, 10), userId: parseInt(req.session.auth.userId) } });
    res.render('results', { title: `Survey #${parseInt(req.params.id, 10)}`, token: req.csrfToken(), survey, userResponses });
}));

router.get('/surveys/:id/shortans/:qid', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const resShortans = await db.QuestionResponse.findAll({ where: { surveyId: parseInt(req.params.id, 10), questionId: parseInt(req.params.qid, 10) }, include: { model: db.Question } });
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10));
    const question = resShortans.map(el => el.Question)
    const questionText = question[0].questionText
    res.render('shortans', { title: `Survey #${parseInt(req.params.id, 10)}`, token: req.csrfToken(), resShortans, survey, questionText });
}))

router.get('/surveys/:id/questions/:qid', csrfProtection, asyncHandler(async (req, res) => {
    const surveyResponses = await db.QuestionResponse.findAll({ where: { surveyId: parseInt(req.params.id, 10), questionId: parseInt(req.params.qid, 10) }, include: { model: db.Question } });
    res.send(surveyResponses)
}));

router.post('/surveys/:id/questions/:qid', csrfProtection, asyncHandler(async (req, res) => {
    const response = await db.QuestionResponse.create({
        surveyId: req.params.id,
        userId: parseInt(req.session.auth.userId),
        questionId: req.params.qid,
        questionResponseValue: req.body.responseText.toLowerCase()
    });
    res.status(200)
    res.send('response updated')
}));

router.post('/surveys/delete/:id', asyncHandler(async (req, res) => {
    const surveyId = parseInt(req.params.id, 10);
    const survey = await db.Survey.findByPk(surveyId);
    await survey.destroy();
    res.redirect('back');
}));

router.get('/surveys/:id/votes', asyncHandler(async (req, res) => {
    const votes = await db.Upvote.findAll({ where: { surveyId: parseInt(req.params.id, 10) } });
    res.send(votes);
}));

router.post('/surveys/upvote/:id', asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(req.params.id, {
        include: [db.Upvote]
    })

    survey.Upvotes.forEach(el => {
        if (el.userId===req.session.auth.userId) {
            res.send('You upvoted that survey already!');
        }
    })

    const vote = await db.Upvote.create({
        surveyId: req.params.id,
        userId: parseInt(req.session.auth.userId),
        upvote: 1
    });
    res.status(200)
    res.redirect('back')
}))


module.exports = router;
