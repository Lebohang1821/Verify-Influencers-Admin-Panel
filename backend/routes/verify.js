const express = require('express');
const router = express.Router();
const apiService = require('../services/apiService');
const SearchResult = require('../models/SearchResult');

router.get('/', async (req, res) => {
  const { prompt } = req.query;
  try {
    console.log('Received prompt:', prompt);
    const data = await apiService.fetchOpenAiData(prompt);
    console.log('OpenAI response data:', data);
    if (data.error) {
      console.error('OpenAI error:', data.error.message);
      throw new Error(data.error.message);
    }
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No choices returned from OpenAI API');
    }
    const searchResult = new SearchResult({
      influencerName: data.choices[0].message.content.trim(), // Adjust this based on the actual response structure
      claimsToAnalyze: data.claimsToAnalyze,
      selectedJournals: data.selectedJournals,
      includeRevenueAnalysis: data.includeRevenueAnalysis,
      verifyWithJournals: data.verifyWithJournals,
      timeRange: data.timeRange
    });
    console.log('SearchResult to be saved:', searchResult);
    await searchResult.save();
    res.json(data);
  } catch (error) {
    console.error('Error verifying claim:', error.message);
    res.status(500).json({ error: `Error verifying claim: ${error.message}` });
  }
});

module.exports = router;
