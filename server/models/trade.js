const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  symbol: { type: String },
  shares: { type: Number },
  price: { type: Number },
  quantity: { type: Number },
  balance: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

tradeSchema.set('timestamps', true);

tradeSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Trade', tradeSchema);
