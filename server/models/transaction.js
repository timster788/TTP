const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  stock: { type: String },
  shares: { type: Number },
  quantity: { type: Number },
  balance: { type: Number, ref: 'Portfolio' },
  userId: { type: String, ref: 'User', required: true }
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
