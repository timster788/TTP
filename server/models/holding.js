const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
  stock: { type: String },
  shares: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

holdingSchema.set('timestamps', true);

holdingSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Holding', holdingSchema);
