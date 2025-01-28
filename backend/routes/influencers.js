const express = require('express');
const router = express.Router();

// Define your influencer routes here
router.get('/', (req, res) => {
  res.send('Influencer API');
});

module.exports = router;