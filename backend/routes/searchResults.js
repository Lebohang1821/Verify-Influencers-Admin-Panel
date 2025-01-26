const express = require('express');
const router = express.Router();
const SearchResult = require('../models/SearchResult');

router.get('/', async (req, res) => {
  try {
    const searchResults = await SearchResult.find().sort({ createdAt: -1 });
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: `Error fetching search results: ${error.message}` });
  }
});

module.exports = router;
