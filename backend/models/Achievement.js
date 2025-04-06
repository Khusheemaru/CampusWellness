const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['streak', 'milestone', 'challenge'],
    required: true
  },
  name: String,
  description: String,
  dateEarned: {
    type: Date,
    default: Date.now
  },
  points: Number,
  badge: String
});

module.exports = mongoose.model('Achievement', achievementSchema);