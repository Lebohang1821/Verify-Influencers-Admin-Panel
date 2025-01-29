const express = require('express');
const router = express.Router();
const { MongoClient } = require("mongodb");
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
