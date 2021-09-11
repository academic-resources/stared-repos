const express = require("express");
const router = express.Router();
const {requireAuth} = require('../auth')
const db = require("../models");
const { Op } = require("sequelize");
const { csrfProtection, asyncHandler } = require('./utils');


router.get('/feed', requireAuth, asyncHandler(async (req, res) => {

    const nameFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote],
        order: [['name', 'ASC']]
    });

    res.render('feed', {
        title: "SurveyDonkey Feed",
        nameFeedSurveys,
    })
}))

router.get('/feed/name', requireAuth, asyncHandler(async (req, res) => {

    const nameFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote],
        order: [['name', 'ASC']]
    });

    res.render('feed', {
        title: "SurveyDonkey Feed",
        nameFeedSurveys,
    })
}))

router.get('/feed/created', asyncHandler(async (req, res) => {

    const createFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote],
        order: [['createdAt', 'ASC']]
    });

    res.render('feed', {
        title: "SurveyDonkey Feed",
        createFeedSurveys
    })
}))

router.get('/feed/upvotes', asyncHandler(async (req, res) => {

    const upvoteFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote]
    });

    function merge(leftArray, rightArray) {
        const sorted = [];
        while (leftArray.length > 0 && rightArray.length > 0) {
          const leftItem = leftArray[0];
          const rightItem = rightArray[0];

          if (leftItem.Upvotes.length > rightItem.Upvotes.length) {
            sorted.push(rightItem);
            rightArray.shift();
          } else {
            sorted.push(leftItem);
            leftArray.shift();
          }
        }

        while (leftArray.length !== 0) {
          const value = leftArray.shift();
          sorted.push(value);
        }

        while (rightArray.length !== 0) {
          const value = rightArray.shift();
          sorted.push(value);
        }

        return sorted
      }

      function mergeSort(array) {
        const length = array.length;

        if (array.length < 2){
          return array;
        }

        const middleIndex = Math.ceil(length / 2);
        let leftArray = array.slice(0, middleIndex);
        let rightArray = array.slice(middleIndex, length);

        leftArray = mergeSort(leftArray);
        rightArray = mergeSort(rightArray);

        return merge(leftArray, rightArray);
      }

    let upvoteSorted = mergeSort(upvoteFeedSurveys).reverse();
    res.render('feed', {
        title: "SurveyDonkey Feed",
        upvoteSorted
    })
}))


router.get('/feed/modified', asyncHandler(async (req, res) => {

    const  modFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote],
        order: [['updatedAt', 'ASC']]
    });

    res.render('feed', {
        title: "SurveyDonkey Feed",
        modFeedSurveys
    })
}))


router.get('/feed/questions', asyncHandler(async (req, res) => {

    const questionsFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote]
    });

    function merge(leftArray, rightArray) {
        const sorted = [];
        while (leftArray.length > 0 && rightArray.length > 0) {
          const leftItem = leftArray[0];
          const rightItem = rightArray[0];

          if (leftItem.Questions.length > rightItem.Questions.length) {
            sorted.push(rightItem);
            rightArray.shift();
          } else {
            sorted.push(leftItem);
            leftArray.shift();
          }
        }

        while (leftArray.length !== 0) {
          const value = leftArray.shift();
          sorted.push(value);
        }

        while (rightArray.length !== 0) {
          const value = rightArray.shift();
          sorted.push(value);
        }

        return sorted
      }

      function mergeSort(array) {
        const length = array.length;

        if (array.length < 2){
          return array;
        }

        const middleIndex = Math.ceil(length / 2);
        let leftArray = array.slice(0, middleIndex);
        let rightArray = array.slice(middleIndex, length);

        leftArray = mergeSort(leftArray);
        rightArray = mergeSort(rightArray);

        return merge(leftArray, rightArray);
      }

    let questionsSorted = mergeSort(questionsFeedSurveys).reverse();
    res.render('feed', {
        title: "SurveyDonkey Feed",
        questionsSorted
    })
}))


module.exports = router;
