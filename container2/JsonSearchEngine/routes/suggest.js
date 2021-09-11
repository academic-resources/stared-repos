const database = require("../database");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({message: "NOT INTEGRATED YET!"})
});

module.exports = router;