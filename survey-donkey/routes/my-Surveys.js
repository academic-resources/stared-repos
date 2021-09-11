const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser } = require('../auth');

const db = require("../models");
const { csrfProtection, asyncHandler } = require("./utils");

const router = express.Router();

router.get('/dashboard', requireAuth, asyncHandler(async (req, res) => {
  const feedSurveys = await db.Survey.findAll();
}))


module.exports = router;