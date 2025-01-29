const express = require('express');
const router = express.Router();
const { MongoClient, Int32 } = require("mongodb");
require("dotenv").config();

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

router.get('/', async (req, res) => {
  try {
    const db = client.db("yourDatabaseName");
    const collection = db.collection("researches");
    const influencers = await collection.find().toArray();
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ error: `Error fetching influencers: ${error.message}` });
  }
});

router.post("/", async (req, res) => {
  const { influencerName, category, trustScore, trend, estimatedFollowers, claimsToAnalyze, timeRange, includeRevenueAnalysis, verifyWithJournals, scientificJournals, verifiedClaims } = req.body;

  const newInfluencer = {
    influencerName,
    category,
    trustScore: Int32(trustScore),
    trend,
    estimatedFollowers: String(estimatedFollowers),
    claimsToAnalyze,
    timeRange,
    includeRevenueAnalysis,
    verifyWithJournals,
    scientificJournals,
    verifiedClaims,
    createdAt: new Date(),
  };

  try {
    const db = client.db("yourDatabaseName");
    const collection = db.collection("researches");
    const savedInfluencer = await collection.insertOne(newInfluencer, {
      writeConcern: { w: 'majority', j: true, wtimeout: 5000 }
    });
    res.status(201).json(savedInfluencer.ops[0]);
  } catch (error) {
    res.status(500).json({ error: `Error saving influencer: ${error.message}` });
  }
});

module.exports = router;