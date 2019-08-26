const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const Trade = require('../models/trade');

const router = express.Router();
// Protect endpoints using JWT Strategy
router.use(
  passport.authenticate('jwt', { session: false, failWithError: true })
);

router.get('/', (req, res, next) => {
  const userId = req.user._id;
  Trade.find({ userId })
    .sort({ updatedAt: 'desc' })
    .then(results => {
      res.json(results);
      console.log('results', results);
    })
    .catch(err => next(err));
});
router.get('/:userId',(req,res,next)=>{
  // const { id } = req.params;
  const userId = req.user._id;
  // /***** Never trust users - validate input *****/
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   const err = new Error('The `id` is not valid');
  //   err.status = 400;
  //   return next(err);
  // }
  Trade.find({  userId })
    .then(result => {
      if (result) {
        res.json({
          data: result
        });
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});
router.post('/:userId', (req, res, next) => {
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userId` is not valid');
    err.status = 400;
    return next(err);
  }
  const { symbol, quantity, shares, price, balance } = req.body;
  const newTrade = {
    symbol,
    shares,
    price,
    quantity,
    balance,
    userId
  };
  Trade.create(newTrade)
    .then(result => {
      console.log('result',result);

      res.location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
