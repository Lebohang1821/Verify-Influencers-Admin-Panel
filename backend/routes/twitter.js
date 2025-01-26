const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitterService');
const SearchResult = require('../models/SearchResult');

router.get('/tweets', async (req, res) => {
  const { query } = req.query;
  try {
    const tweets = await twitterService.fetchTweets(query);
    const searchResult = new SearchResult({
      influencerName: query,
      claimsToAnalyze: 0, // Adjust as needed
      timeRange: '',
      includeRevenueAnalysis: false,
      verifyWithJournals: false,
      results: tweets
    });
    await searchResult.save();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: `Error fetching tweets: ${error.message}` });
  }
});

module.exports = router;
