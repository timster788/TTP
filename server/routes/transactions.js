const express = require('express');
const passport = require('passport');

const Transaction = require('../models/transaction');

const router = express.Router();
// Protect endpoints using JWT Strategy
router.use(
  passport.authenticate('jwt', { session: false, failWithError: true })
);
router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const { stock, shares, quantity } = req.body;
  const newTransaction = {
    stock,
    shares,
    quantity,

    userId: id
  };
  Transaction.create(newTransaction)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('This transaction already exists');
        err.status = 400;
      }
      next(err);
    });
});

module.exports = router;
