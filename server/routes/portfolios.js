const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Portfolio = require('../models/portfolio');

const router = express.Router();
// Protect endpoints using JWT Strategy
router.use(
  passport.authenticate('jwt', { session: false, failWithError: true })
);

router.get('/', (req, res, next) => {
  const userId = req.user.id;

  let filter = { userId };

  Portfolio.find(filter)

    .sort({ updatedAt: 'desc' })
    .then(results => {
      console.log(results);
      res.json({
        data: results
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
