require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const influencersRouter = require('./routes/influencers');
const claimsRouter = require('./routes/claims');
const verifyRouter = require('./routes/verify');

app.use('/api/influencers', influencersRouter);
app.use('/api/claims', claimsRouter);
app.use('/api/verify', verifyRouter);

// Dummy route for summary data
app.get('/api/summary', (req, res) => {
  res.json({
    totalInfluencers: 10,
    totalClaims: 50,
    verifiedClaims: 35,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
