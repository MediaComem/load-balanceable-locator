const express = require('express');

const { backgroundColor, baseUrl } = require('../config');

const router = express.Router();

// GET /
router.get('/', (req, res) => res.render('index', { backgroundColor, baseUrl }));

module.exports = router;
