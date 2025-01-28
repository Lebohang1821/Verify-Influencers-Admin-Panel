const express = require("express");
const router = express.Router();
const axios = require("axios");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const AI1_API_KEY = process.env.AI1_API_KEY;

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

async function callAIForNewInfluencers() {
  const response = await axios.post(
    "https://api.perplexity.ai/chat/completions",
    {
      model: "sonar",
      messages: [{ role: "user", content: "List 10 new health influencers." }],
    },
    {
      headers: { Authorization: `Bearer ${AI1_API_KEY}` },
    }
  );

  if (!response.data || !response.data.choices || !response.data.choices[0]) {
    console.error("Invalid data received from AI:", response.data);
    throw new Error("Invalid data received from AI");
  }

  return response.data.choices[0].message.content;
}

router.post("/", async (req, res) => {
  const { influencerName, claimsToAnalyze, timeRange, includeRevenueAnalysis, verifyWithJournals, scientificJournals } = req.body;
  console.log("Received request:", req.body);

  const prompt = `Provide the following information for the influencer "${influencerName}":
  1. Total number of followers on Instagram.
  2. Total number of followers on Twitter (if available).
  3. Total number of followers on YouTube (if available).
  4. Category of the influencer.
  5. Trust score of the influencer.`;

  try {
    const content = await callPerplexityAI(prompt);

    console.log("Extracted content:", content);

    const instagramFollowersMatch = content.match(/Instagram.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const twitterFollowersMatch = content.match(/Twitter.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const youtubeFollowersMatch = content.match(/YouTube.*?([\d,.]+)\s*(million|M|k|K)?/i);
    const categoryMatch = content.match(/Category.*?:\s*(.*?)(?:\n|$)/i);
    const trustScoreMatch = content.match(/Trust score.*?:\s*(\d+)/i);

    const instagramFollowers = instagramFollowersMatch
      ? parseFollowers(instagramFollowersMatch[1], instagramFollowersMatch[2])
      : 0;
    const twitterFollowers = twitterFollowersMatch
      ? parseFollowers(twitterFollowersMatch[1], twitterFollowersMatch[2])
      : 0;
    const youtubeFollowers = youtubeFollowersMatch
      ? parseFollowers(youtubeFollowersMatch[1], youtubeFollowersMatch[2])
      : 0;

    const totalFollowers = instagramFollowers + twitterFollowers + youtubeFollowers;

    let category = "Health";
    if (categoryMatch) {
      const additionalCategories = ["nutrition", "fitness", "medicine", "mental health"];
      additionalCategories.forEach((cat) => {
        if (categoryMatch[1].toLowerCase().includes(cat)) {
          category += `, ${cat.charAt(0).toUpperCase() + cat.slice(1)}`;
        }
      });
    }

    const trustScore = trustScoreMatch ? parseInt(trustScoreMatch[1], 10) : 50;

    // Set trend based on trust score
    const trend = trustScore >= 75 ? "Up" : "Down";

    console.log("Extracted data:", {
      instagramFollowers,
      twitterFollowers,
      youtubeFollowers,
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
      scientificJournals,
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

router.post("/new-influencers", async (req, res) => {
  try {
    const content = await callAIForNewInfluencers();
    const influencers = content.split("\n").filter((line) => line.trim() !== "");
    res.json({ influencers });
  } catch (error) {
    console.error("Error fetching new influencers:", error.message);
    res.status(500).json({ error: "Failed to fetch new influencers" });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const db = client.db("yourDatabaseName");
    const collection = db.collection("researches");
    const leaderboard = await collection.find().sort({ trustScore: -1 }).toArray();
    const filteredLeaderboard = leaderboard.map((entry) => {
      const { influencerName, category, trustScore, trend, estimatedFollowers } = entry;
      return { influencerName, category, trustScore, trend, estimatedFollowers };
    });
    res.json(filteredLeaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const db = client.db("yourDatabaseName");
    const collection = db.collection("researches");
    const summary = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalClaims: { $sum: "$claimsToAnalyze" },
          verifiedClaims: { $sum: "$trustScore" }
        }
      }
    ]).toArray();
    res.json(summary[0]);
  } catch (error) {
    console.error("Error fetching summary:", error.message);
    res.status(500).json({ error: "Error fetching summary" });
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
