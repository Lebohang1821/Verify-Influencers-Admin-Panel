require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const influencersRouter = require("./routes/influencers");
const claimsRouter = require("./routes/claims");
const verifyRouter = require("./routes/verify");
const chatRouter = require("./routes/chat");
const twitterRouter = require('./routes/twitter');
const searchResultsRouter = require('./routes/searchResults');
const summaryRouter = require('./routes/summary');

app.use("/api/influencers", influencersRouter);
app.use("/api/claims", claimsRouter);
app.use("/api/verify", verifyRouter);
app.use('/api/chat', chatRouter);
app.use('/api/twitter', twitterRouter);
app.use('/api/search-results', searchResultsRouter);
app.use('/api/summary', summaryRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
