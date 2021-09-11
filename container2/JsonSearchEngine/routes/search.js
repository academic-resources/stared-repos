const database = require("../database");
const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    database.search("crawled", {
        size: 20,
        from: 0,
        query: {
            multi_match: {
                query: req.query.q,
                fuzziness: 3 // decrease for more specific results
            }
        }
    }).then(results => {
        res.json(results.hits)
    })
});

module.exports = router;