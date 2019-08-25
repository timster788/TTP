const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  stock: { type: String },
  shares: { type: Number },
  
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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
