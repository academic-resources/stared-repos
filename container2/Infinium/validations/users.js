const { check, oneOf } = require('express-validator');
const db = require('../db/models');
const { User } = db;


const userRegValidators = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for User Name')
        .isLength({ max: 50 })
        .withMessage('User Name must not be more than 50 characters long')
        .matches(/[^@]/)
        .withMessage('User Name cannot contain @ symbol')
        .custom(async (value) => {
            const username = await User.findOne({where: {username: value}})
            if(username) {
                throw new Error('User Name already in use. Please choose another.')
            }
            return true;
        }),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email')
        .isLength({ max: 50 })
        .withMessage('Email must not be more than 50 characters long')
        .isEmail()
        .withMessage('Email is not a valid email')
        .custom(async (value) => {
            const email = await User.findOne({where: {email: value}})
            if(email) {
                throw new Error('Email already in use. Please sign-in or choose another email to register.');
            }
            return true;
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ min: 8, max: 50 })
        .withMessage('Password must be at least 8 characters long and not more than 50 characters long')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
        .withMessage('Password must contain at least one capital letter, one lower case letter, one number and one symbol'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Confirm Password does not match Password');
            }
            return true;
        }),
]

const userSignInValidators = [
    oneOf([
        check('usernameOrEmail')
            .exists({ checkFalsy: true })
            .isLength({ max: 50 }),
        check('password')
            .exists({ checkFalsy: true })
            .isLength({ min: 8, max: 50 })
    ], 'Please provide a value that is less than 50 characters'),
]


module.exports = {userRegValidators, userSignInValidators };
