const express = require('express');
const router = express.Router();
const apiService = require('../services/apiService');

router.get('/', async (req, res) => {
  const { prompt } = req.query;
  try {
    const data = await apiService.fetchOpenAiData(prompt);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching claim data');
  }
});

module.exports = router;
