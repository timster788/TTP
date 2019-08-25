const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Holding = require('../models/holding');

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
router.get('/:userId',(req,res,next)=>{
  const { id } = req.params;
  const userId = req.user._id;
  // /***** Never trust users - validate input *****/
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   const err = new Error('The `id` is not valid');
  //   err.status = 406;
  //   return next(err);
  // }
  Holding.findOne({ _id: id , userId })
    .then(result => {
      console.log(result,'results1111111')
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


module.exports = router;
