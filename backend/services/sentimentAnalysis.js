const natural = require('natural');
const analyzer = new natural.SentimentAnalyzer();

const analyzeSentiment = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);
  const score = analyzer.getSentiment(tokens);

  return {
    score,
    analysis: interpretScore(score)
  };
};

const interpretScore = (score) => {
  if (score <= -0.5) return 'negative';
  if (score >= 0.5) return 'positive';
  return 'neutral';
};

module.exports = { analyzeSentiment };