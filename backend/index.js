require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const influencersRouter = require("./routes/influencers");
const claimsRouter = require("./routes/claims");
const verifyRouter = require("./routes/verify");

app.use("/api/influencers", influencersRouter);
app.use("/api/claims", claimsRouter);
app.use("/api/verify", verifyRouter);

// Add the chat route
const chatRouter = require("./routes/chat");
app.use("/api/chat", chatRouter);

// Add the Twitter route
const twitterRouter = require('./routes/twitter');
app.use('/api/twitter', twitterRouter);

// Add the search results route
const searchResultsRouter = require('./routes/searchResults');
app.use('/api/search-results', searchResultsRouter);

// Dummy route for summary data
app.get("/api/summary", (req, res) => {
  res.json({
    totalInfluencers: 10,
    totalClaims: 50,
    verifiedClaims: 35,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
