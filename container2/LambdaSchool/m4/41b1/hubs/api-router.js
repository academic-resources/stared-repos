const express = require('express');

const hubsRouter = require('../hubs/hubs-router');

const router = express.Router();

// handle /api/hubs
router.use('/hubs', hubsRouter);

module.exports = router;
