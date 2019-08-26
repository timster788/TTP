const express = require('express');

const Holding = require('../db/models');
const router = express.Router();

router.get('/user/:userId', async (req, res, next) => {
  try {
    const holdings = await Holding.listHoldingsByUserId(req.params.userId);
    res.json(holdings);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
