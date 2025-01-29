const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  followers: { type: Number, required: true },
  trustScore: { type: Number, required: true },
  trend: { type: String, required: true },
  revenueEstimation: { type: String, required: true },
  claimsAnalysis: { type: String, required: true },
  sourcesVerification: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Influencer", influencerSchema);
