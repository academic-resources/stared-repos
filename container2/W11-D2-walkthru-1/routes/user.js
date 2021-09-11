const express = require('express')
const router = express.Router()
const db = require('../db/models')
const { check, validationResult } = require('express-validator')

const { csrfProtection, asyncHandler } = require('./utils')

router.get('/user/register', csrfProtection, asyncHandler(async (req, res) => {
    const user = await db.User.build()
    res.render('user-register', { title: 'User-register', user, csrfToken: req.csrfToken() })
}))

const userValidators = [

]
router.post('/user/register', csrfProtection, userValidators, asyncHandler(async (req, res) => {

}))



module.exports = router
