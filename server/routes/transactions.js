const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');

const router = express.Router();
// Protect endpoints using JWT Strategy
router.use(
  passport.authenticate('jwt', { session: false, failWithError: true })
);
router.post('/', (req, res, next) => {
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userId` is not valid');
    err.status = 400;
    return next(err);
  }
  const { symbol, quantity } = req.body;
  const newTransaction = {
    symbol,
    quantity,
    userId
  };
  Transaction.create(newTransaction)
    .then(result => {
      console.log('result', result);

      res

        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
