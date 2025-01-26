const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/", async (req, res) => {
  const {
    influencerName,
    claimsToAnalyze,
    timeRange,
    includeRevenueAnalysis,
    verifyWithJournals,
  } = req.body;
  console.log("Received request:", req.body);

  const prompt = `Analyze the influencer "${influencerName}" with the following parameters:
  - Claims to analyze: ${claimsToAnalyze}
  - Time range: ${timeRange}
  - Include revenue analysis: ${includeRevenueAnalysis}
  - Verify with journals: ${verifyWithJournals}`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Gemini API response:", response.data);
    const content =
      response.data.candidates[0]?.content?.parts
        ?.map((part) => part.text)
        .join("\n") || "No results available.";
    res.json({ results: content });
  } catch (error) {
    console.error(
      "Error communicating with Gemini:",
      error.response ? error.response.data : error.message
    );
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.code === "insufficient_quota"
    ) {
      res.status(429).json({
        error:
          "You have exceeded your current quota. Please check your plan and billing details.",
      });
    } else {
      res.status(500).json({
        error: "Error communicating with Gemini",
        details: error.response ? error.response.data : error.message,
      });
    }
  }
});

module.exports = router;
