const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/email');

router.post('/send-verification', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.EMAIL_SECRET,
      { expiresIn: '1d' }
    );

    await sendVerificationEmail(email, verificationToken);
    res.json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/verify/:token', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    await User.findByIdAndUpdate(decoded.userId, { isVerified: true });
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;