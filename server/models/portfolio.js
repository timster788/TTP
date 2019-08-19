const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  stock: { type: String },
  shares: { type: Number },
  quantity: { type: Number },
  balance: {
    type: Number,
    required: true,
    default: 5000
  },
  userId: { type: String, ref: 'User', required: true }
});

portfolioSchema.set('timestamps', true);

portfolioSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
