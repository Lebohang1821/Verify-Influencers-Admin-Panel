const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// Define a schema for storing research requests and results
const researchSchema = new mongoose.Schema({
  influencerName: { type: String, default: "Unknown" },
  category: { type: String, default: "Not Available" },
  trustScore: { type: Number, default: 0 },
  trend: { type: String, default: "Not Available" },
  estimatedFollowers: { type: Number, default: 0 },
  claimsToAnalyze: { type: Number, default: 50 },
  timeRange: { type: String, default: "Last Month" },
  includeRevenueAnalysis: { type: Boolean, default: false },
  verifyWithJournals: { type: Boolean, default: false },
  scientificJournals: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

const Research = mongoose.model("Research", researchSchema);

router.post("/", async (req, res) => {
  const { influencerName, claimsToAnalyze, timeRange, includeRevenueAnalysis, verifyWithJournals, scientificJournals } = req.body;
  console.log("Received request:", req.body);

  const prompt = `Estimate the total number of followers, category, trust score, and trend for the influencer "${influencerName}" and analyze the following parameters:
  - Claims to analyze: ${claimsToAnalyze}
  - Time range: ${timeRange}
  - Include revenue analysis: ${includeRevenueAnalysis}
  - Verify with journals: ${verifyWithJournals}
  - Scientific journals: ${Object.keys(scientificJournals).filter(journal => scientificJournals[journal]).join(", ")}`;

  try {
    const response = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      {
        model: "sonar", // Specify the model
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        },
      }
    );

    console.log("Perplexity API response:", response.data);

    // Extract the data from the response
    const content = response.data.choices[0].message.content;
    console.log("Extracted content:", content);

    // Match follower counts and other details
    const instagramFollowersMatch = content.match(/Instagram.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const twitterFollowersMatch = content.match(/Twitter.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const youtubeFollowersMatch = content.match(/YouTube.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const tiktokFollowersMatch = content.match(/TikTok.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const categoryMatch = content.match(/Category.*?:\s*(.*?)(?:\n|$)/i);
    const trustScoreMatch = content.match(/Trust Score.*?:\s*(\d+(\.\d+)?)/i);
    const trendMatch = content.match(/Trend.*?:\s*(.*?)(?:\n|$)/i);

    // Parse follower counts
    const instagramFollowers = instagramFollowersMatch
      ? parseFollowers(instagramFollowersMatch[1], instagramFollowersMatch[2])
      : 0;
    const twitterFollowers = twitterFollowersMatch
      ? parseFollowers(twitterFollowersMatch[1], twitterFollowersMatch[2])
      : 0;
    const youtubeFollowers = youtubeFollowersMatch
      ? parseFollowers(youtubeFollowersMatch[1], youtubeFollowersMatch[2])
      : 0;
    const tiktokFollowers = tiktokFollowersMatch
      ? parseFollowers(tiktokFollowersMatch[1], tiktokFollowersMatch[2])
      : 0;

    const totalFollowers = instagramFollowers + twitterFollowers + youtubeFollowers + tiktokFollowers;

    // Parse category, trust score, and trend
    const category = categoryMatch ? categoryMatch[1].trim() : "Not Available";
    const trustScore = trustScoreMatch ? parseFloat(trustScoreMatch[1]) : 0;
    const trend = trendMatch ? trendMatch[1].trim() : "Not Available";

    console.log("Extracted data:", {
      instagramFollowers,
      twitterFollowers,
      youtubeFollowers,
      tiktokFollowers,
      totalFollowers,
      category,
      trustScore,
      trend,
    });

    // Validate numerical values
    const validatedTotalFollowers = isNaN(totalFollowers) ? 0 : totalFollowers;

    // Save the request and response to MongoDB
    const research = new Research({
      influencerName,
      category,
      trustScore,
      trend,
      estimatedFollowers: validatedTotalFollowers,
      claimsToAnalyze,
      timeRange,
      includeRevenueAnalysis,
      verifyWithJournals,
      scientificJournals
    });

    await research.save();

    res.json({
      influencerName,
      category,
      trustScore,
      trend,
      estimatedFollowers: validatedTotalFollowers,
      claimsToAnalyze,
      timeRange,
      includeRevenueAnalysis,
      verifyWithJournals,
      scientificJournals
    });
  } catch (error) {
    console.error("Error communicating with Perplexity:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : error.message,
    });
  }
});

function parseFollowers(followersString, unit) {
  if (!followersString) return 0; // Fallback if followersString is undefined
  let followers = parseFloat(followersString.replace(/[^\d.]/g, "")); // Remove non-numeric characters
  if (isNaN(followers)) return 0; // Fallback if parsing fails
  if (unit) {
    unit = unit.toLowerCase();
    if (unit === "million" || unit === "m") {
      followers *= 1e6;
    } else if (unit === "k") {
      followers *= 1e3;
    }
  }
  return followers;
}

module.exports = router;
