const validateWellnessLog = (req, res, next) => {
  const { mood, stressLevel, activities } = req.body;

  if (!mood) {
    return res.status(400).json({ message: 'Mood is required' });
  }

  if (!stressLevel || stressLevel < 1 || stressLevel > 5) {
    return res.status(400).json({ message: 'Stress level must be between 1 and 5' });
  }

  if (activities && !Array.isArray(activities)) {
    return res.status(400).json({ message: 'Activities must be an array' });
  }

  next();
};

module.exports = validateWellnessLog;