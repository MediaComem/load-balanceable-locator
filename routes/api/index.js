const express = require('express');
const createError = require('http-errors');
const r2 = require('r2');

const { version } = require('../../package.json');
const { route } = require('../utils');

const router = express.Router();

// GET /api
router.get('/', (req, res) => res.send({ version }));

// GET /api/location
router.post('/locations', route(async (req, res) => {

  const ip = req.body.ip || req.ip;
  if (typeof ip !== 'string' || !ip.match(/^\d+\.\d+\.\d+\.\d+$/)) {
    return res.sendStatus(422);
  }

  const location = await r2(`https://ipapi.co/${ip}/json/`).json;

  res.status(201).send({ location, ip });
}));

// Catch 404 and forward to error handler
router.use((req, res, next) => next(createError(404)));

// Error handler
router.use((err, req, res, next) => {

  const body = {
    message: getErrorMessage(err)
  };

  if (err.errors) {
    body.errors = err.errors;
  }

  res
    .set(err.headers || {})
    .status(getErrorStatus(err))
    .send(body);
});

module.exports = router;

function getErrorMessage(err) {
  if (err.name === 'ValidationError') {
    return 'Data is invalid';
  } else if (err.expose) {
    return err.message;
  } else {
    return 'An unexpected error occurred';
  }
}

function getErrorStatus(err) {
  if (err.name === 'ValidationError') {
    return 422;
  } else if (err.status) {
    return err.status;
  } else {
    return 500;
  }
}
