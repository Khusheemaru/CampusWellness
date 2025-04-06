const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const sentiment = new natural.SentimentAnalyzer();

const analyzeWellnessData = (data) => {
  const moodAnalysis = analyzeMoodTrends(data);
  const stressAnalysis = analyzeStressPatterns(data);
  const activityImpact = analyzeActivities(data);
  const riskScore = calculateRiskScore(data);

  return {
    moodAnalysis,
    stressAnalysis,
    activityImpact,
    riskScore,
    recommendations: generateRecommendations(data)
  };
};

const analyzeMoodTrends = (data) => {
  const moodScores = data.map(entry => ({
    mood: entry.mood,
    score: sentiment.getSentiment(tokenizer.tokenize(entry.journalEntry || ''))
  }));

  const averageScore = moodScores.reduce((acc, curr) => acc + curr.score, 0) / moodScores.length;
  return {
    trend: averageScore < -0.2 ? 'declining' : averageScore > 0.2 ? 'improving' : 'stable',
    score: averageScore
  };
};

const analyzeStressPatterns = (data) => {
  const stressLevels = data.map(entry => entry.stressLevel);
  const avgStress = stressLevels.reduce((a, b) => a + b, 0) / stressLevels.length;
  
  return {
    averageLevel: avgStress,
    isHighRisk: avgStress > 4,
    trend: stressLevels[0] > avgStress ? 'increasing' : 'decreasing'
  };
};

const analyzeActivities = (data) => {
  const activities = data.flatMap(entry => entry.activities);
  const activityCount = activities.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  return {
    mostFrequent: Object.entries(activityCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([activity]) => activity),
    diversity: Object.keys(activityCount).length
  };
};

const calculateRiskScore = (data) => {
  let score = 0;
  const recentData = data.slice(0, 7); // Last 7 days

  // Factors that increase risk score
  if (analyzeStressPatterns(recentData).averageLevel > 4) score += 3;
  if (analyzeMoodTrends(recentData).trend === 'declining') score += 2;
  if (recentData.some(entry => entry.mood === 'very_sad')) score += 2;
  if (recentData.length < 3) score += 1; // Infrequent check-ins

  return score;
};

const generateRecommendations = (data) => {
  const recommendations = [];
  const analysis = {
    mood: analyzeMoodTrends(data),
    stress: analyzeStressPatterns(data),
    activities: analyzeActivities(data)
  };

  if (analysis.stress.isHighRisk) {
    recommendations.push({
      type: 'stress',
      title: 'Stress Management',
      description: 'Practice deep breathing exercises and meditation'
    });
  }

  if (analysis.mood.trend === 'declining') {
    recommendations.push({
      type: 'mood',
      title: 'Mood Improvement',
      description: 'Consider scheduling a counseling session'
    });
  }

  if (analysis.activities.diversity < 3) {
    recommendations.push({
      type: 'activity',
      title: 'Activity Diversity',
      description: 'Try incorporating new activities into your routine'
    });
  }

  return recommendations;
};

module.exports = {
  analyzeWellnessData,
  calculateRiskScore
};