const mongoose = require('mongoose');

const searchResultSchema = new mongoose.Schema({
  influencerName: String,
  claimsToAnalyze: Number,
  timeRange: String,
  includeRevenueAnalysis: Boolean,
  verifyWithJournals: Boolean,
  results: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SearchResult', searchResultSchema);
