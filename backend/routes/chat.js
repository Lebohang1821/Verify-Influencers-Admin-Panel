const express = require("express");
const router = express.Router();
const axios = require("axios");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI, {
  useUnifiedTopology: true, // Use the new engine
  useNewUrlParser: true, // Use the new URL parser
});

client.connect()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

async function callPerplexityAI(promptText) {
  const response = await axios.post(
    "https://api.perplexity.ai/chat/completions",
    {
      model: "sonar",
      messages: [{ role: "user", content: promptText }],
    },
    {
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}` },
    }
  );

  if (!response.data || !response.data.choices || !response.data.choices[0]) {
    console.error("Invalid data received from Perplexity AI:", response.data);
    throw new Error("Invalid data received from Perplexity AI");
  }

  return response.data.choices[0].message.content;
}

router.post("/", async (req, res) => {
  const { influencerName, claimsToAnalyze, timeRange, includeRevenueAnalysis, verifyWithJournals, scientificJournals } = req.body;
  console.log("Received request:", req.body);

  const prompt = `Provide a detailed analysis for the influencer "${influencerName}" including the following information:
  1. Total number of followers with a breakdown by platform.
  2. Category of the influencer.
  3. Trust score of the influencer.
  4. Current trend of the influencer.
  5. Analysis of ${claimsToAnalyze} claims made by the influencer.
  6. Time range: ${timeRange}.
  7. Include revenue analysis: ${includeRevenueAnalysis}.
  8. Verify claims with the following journals: ${Object.keys(scientificJournals).filter(journal => scientificJournals[journal]).join(", ")}.`;

  try {
    const content = await callPerplexityAI(prompt);

    console.log("Extracted content:", content);

    const instagramFollowersMatch = content.match(/Instagram.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const twitterFollowersMatch = content.match(/Twitter.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const youtubeFollowersMatch = content.match(/YouTube.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const tiktokFollowersMatch = content.match(/TikTok.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const categoryMatch = content.match(/Category.*?:\s*(.*?)(?:\n|$)/i);

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

    let category = "Health";
    if (categoryMatch) {
      const additionalCategories = ["nutrition", "fitness", "medicine", "mental health"];
      additionalCategories.forEach((cat) => {
        if (categoryMatch[1].toLowerCase().includes(cat)) {
          category += `, ${cat.charAt(0).toUpperCase() + cat.slice(1)}`;
        }
      });
    }

    // Set trust score based on total followers
    let trustScore;
    if (totalFollowers > 10000000) {
      trustScore = 95;
    } else if (totalFollowers > 5000000) {
      trustScore = 90;
    } else if (totalFollowers > 1000000) {
      trustScore = 85;
    } else if (totalFollowers > 500000) {
      trustScore = 80;
    } else if (totalFollowers > 100000) {
      trustScore = 75;
    } else if (totalFollowers > 50000) {
      trustScore = 70;
    } else if (totalFollowers > 10000) {
      trustScore = 65;
    } else if (totalFollowers > 5000) {
      trustScore = 60;
    } else if (totalFollowers > 1000) {
      trustScore = 55;
    } else {
      trustScore = 50;
    }

    // Set trend based on trust score
    const trend = trustScore >= 75 ? "Up" : "Down";

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

    const validatedTotalFollowers = isNaN(totalFollowers) ? 0 : totalFollowers;

    const research = {
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
    };

    const db = client.db("yourDatabaseName");
    const collection = db.collection("researches");
    await collection.insertOne(research, {
      writeConcern: { w: 'majority', j: true, wtimeout: 5000 }
    });

    res.json(research);
  } catch (error) {
    console.error("Error communicating with Perplexity:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : error.message,
    });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const db = client.db("yourDatabaseName");
    const collection = db.collection("researches");
    const leaderboard = await collection.find().sort({ trustScore: -1 }).toArray();
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});

function parseFollowers(followersString, unit) {
  if (!followersString) return 0;
  let followers = parseFloat(followersString.replace(/[^\d.]/g, ""));
  if (isNaN(followers)) return 0;
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
