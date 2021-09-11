const { check } = require('express-validator');

const storyDraftValidators = [
  check('title')
    .isLength({max: 100})
    .withMessage('Title cannot exceed 100 characters'),
  check('draft')
    .exists({ checkFalsy: true })
    .withMessage('Oops, did you mean to write something so short? Please write more and try publishing again.')
];

const storyPublishValidators = [
  ...storyDraftValidators,
  check('subtitle')
    .isLength({max: 100})
    .withMessage('Subtitle cannot exceed 100 characters'),
  check('imageLink')
    .isLength({max: 255})
    .withMessage('Subtitle cannot exceed 100 characters'),
];

module.exports = {
  storyDraftValidators,
  storyPublishValidators
};
