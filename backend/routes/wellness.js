const express = require('express');
const router = express.Router();
const WellnessLog = require('../models/WellnessLog');
const auth = require('../middleware/auth');
const { analyzeWellnessData } = require('../services/aiService');
const validateWellnessLog = require('../middleware/validateWellnessLog');

// Submit new wellness log
router.post('/log', [auth, validateWellnessLog], async (req, res) => {
  try {
    // Log the request data for debugging
    console.log('Request body:', req.body);
    console.log('User ID:', req.user?.id);

    // Validate user ID
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: 'User authentication failed',
        error: 'No user ID found'
      });
    }

    const newLog = new WellnessLog({
      userId: req.user.id,
      ...req.body
    });

    // Log the constructed object
    console.log('New log object:', newLog);

    // Validate the object before saving
    const validationError = newLog.validateSync();
    if (validationError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationError.errors
      });
    }

    const savedLog = await newLog.save();
    console.log('Saved successfully:', savedLog);
    
    res.json(savedLog);
  } catch (err) {
    console.error('Full error object:', err);
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      details: err.errors || err
    });
  }
});

// Get user's wellness history
router.get('/history', auth, async (req, res) => {
  try {
    const logs = await WellnessLog.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(30);
    res.json(logs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get analytics for user's wellness data
router.get('/analytics', auth, async (req, res) => {
  try {
    const logs = await WellnessLog.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(30);
    const analysis = analyzeWellnessData(logs);
    res.json(analysis);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add this route to check data
router.get('/test', async (req, res) => {
  try {
    const allLogs = await WellnessLog.find();
    res.json({
      count: allLogs.length,
      logs: allLogs
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;