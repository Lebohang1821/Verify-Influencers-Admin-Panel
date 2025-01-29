const express = require("express");
const router = express.Router();
const axios = require("axios");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
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

  return response.data.choices[0].message.content.replace(/[*#]/g, ''); // Remove ** and ## characters
}

async function callAIForNewInfluencers() {
  const prompt = `Provide a list of new 10 health influencers to analyze:
                -Social followers in one number:
                -Categories:
                -Trust Score`;
  const response = await callPerplexityAI(prompt);
  return response.split("\n").filter(influencer => influencer.trim() !== "");
}

router.post("/", async (req, res) => {
  const { influencerName, claimsToAnalyze, timeRange, includeRevenueAnalysis, verifyWithJournals, scientificJournals, notes } = req.body;
  console.log("Received request:", req.body);

  const prompt = `Analyze and provide detailed information for the health influencer "${influencerName}":
  1. Number of followers on all social media platforms:
  6. Category of the influencer. Specify all relevant categories such as Health, Nutrition, Fitness, etc.
  7. Trust Score (0-100, based on credibility, engagement, and expert reviews):  
  - Provide a reasoning for the given trust score.
  8. Trend Analysis (Up, Down, Stable) & Explanation:
  - How has their influence changed over time?
  9. Notes: ${notes}
  Please ensure to provide the follower counts for all the platforms mentioned above.
  Additionally, provide a brief preview paragraph about the influencer, summarizing their background, expertise, any notable achievements or recognitions including
  and include links to prove all thats provided below:
    1. Revenue Estimation (if applicable):  
  - Sources of income: sponsorships, brand deals, product sales, etc.  
  - Estimated yearly earnings (if available).  
    2. Claims Analysis:  
  - Analyze ${claimsToAnalyze} claims made by this influencer.  
  - Verify claims using scientific journals: ${Object.keys(scientificJournals).filter(journal => scientificJournals[journal]).join(", ")}.
    3. Sources & Verification:  
  - Prioritize official social media profiles, verified reports, and peer-reviewed journals.  
  - If data is unavailable, state "No verifiable information found."`;

  try {
    let content = await callPerplexityAI(prompt);

    console.log("Extracted content:", content);

    // Remove ** and # characters
    content = content.replace(/[*#]/g, '');

    res.json({ fullContent: content }); // Return the full content in the response
  } catch (error) {
    console.error("Error communicating with Perplexity:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : error.message,
    });
  }
});

router.post("/new-influencers", async (req, res) => {
  try {
    const influencers = await callAIForNewInfluencers();
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
    const filteredLeaderboard = leaderboard.map((entry, index) => {
      const { influencerName, category, trustScore, trend, estimatedFollowers, verifiedClaims } = entry;
      return { rank: index + 1, influencerName, category, trustScore, trend, estimatedFollowers, verifiedClaims };
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
          totalInfluencers: { $sum: 1 },
          totalClaims: { $sum: "$claimsToAnalyze" },
          verifiedClaims: { $sum: "$verifiedClaims" }
        }
      }
    ]).toArray();
    res.json(summary[0]);
  } catch (error) {
    res.status(500).json({ error: `Error fetching summary: ${error.message}` });
  }
});

module.exports = router;
