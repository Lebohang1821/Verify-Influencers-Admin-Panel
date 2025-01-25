const express = require('express');
const router = express.Router();
const claimVerificationService = require('../services/claimVerificationService');

router.get('/', async (req, res) => {
  const { claims } = req.query;
  try {
    const verifiedClaims = await claimVerificationService.verifyClaims(claims);
    res.json(verifiedClaims);
  } catch (error) {
    res.status(500).send('Error verifying claims');
  }
});

module.exports = router;
