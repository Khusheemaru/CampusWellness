const mongoose = require('mongoose');

const wellnessLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  mood: {
    type: String,
    required: true,
    enum: ['very_happy', 'happy', 'neutral', 'sad', 'very_sad']
  },
  stressLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  activities: [{
    type: String
  }],
  sleepHours: {
    type: Number,
    min: 0,
    max: 24,
    default: 8
  },
  journalEntry: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WellnessLog', wellnessLogSchema);