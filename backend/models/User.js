const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'counselor'],
    default: 'student'
  },
  name: String,
  studentId: String,
  department: String,
  joinDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);