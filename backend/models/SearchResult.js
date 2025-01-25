const mongoose = require('mongoose');

const searchResultSchema = new mongoose.Schema({
  influencerName: String,
  claimsToAnalyze: Number,
  selectedJournals: [String],
  includeRevenueAnalysis: Boolean,
  verifyWithJournals: Boolean,
  timeRange: String,
  createdAt: { type: Date, default: Date.now }
});

const SearchResult = mongoose.model('SearchResult', searchResultSchema);

module.exports = SearchResult;
