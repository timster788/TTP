const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  symbol: { type: String },
  shares: { type: Number },
  quantity: { type: Number },
  balance: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

transactionSchema.set('timestamps', true);

transactionSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
