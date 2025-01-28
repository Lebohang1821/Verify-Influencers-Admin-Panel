const express = require('express');
const router = express.Router();

const influencers = [
  {
    rank: 1,
    name: "Kayla Itsines",
    category: "Fitness & Nutrition",
    trustScore: "High",
    trend: "Rising",
    followers: "16.1M",
    verifiedClaims: 120
  },
  {
    rank: 2,
    name: "Andrew Huberman",
    category: "Neuroscience",
    trustScore: "High",
    trend: "Rising",
    followers: "6.2M",
    verifiedClaims: 110
  },
  {
    rank: 3,
    name: "Dr. Mikhail Varshavski",
    category: "Medicine",
    trustScore: "High",
    trend: "Stable",
    followers: "4.4M",
    verifiedClaims: 100
  },
  {
    rank: 4,
    name: "Mark Hyman",
    category: "Functional Medicine",
    trustScore: "High",
    trend: "Rising",
    followers: "1.3M",
    verifiedClaims: 90
  },
  {
    rank: 5,
    name: "Massy Arias",
    category: "Fitness & Nutrition",
    trustScore: "High",
    trend: "Rising",
    followers: "1.5M",
    verifiedClaims: 85
  },
  {
    rank: 6,
    name: "Vani Hari",
    category: "Nutrition",
    trustScore: "High",
    trend: "Stable",
    followers: "1.2M",
    verifiedClaims: 80
  },
  {
    rank: 7,
    name: "Dr. Michael Greger",
    category: "Nutrition",
    trustScore: "High",
    trend: "Stable",
    followers: "1.3M",
    verifiedClaims: 75
  },
  {
    rank: 8,
    name: "Graeme Tomlinson",
    category: "Fitness",
    trustScore: "High",
    trend: "Stable",
    followers: "1.4M",
    verifiedClaims: 70
  },
  {
    rank: 9,
    name: "Dr. Nicole LePera",
    category: "Mental Health",
    trustScore: "High",
    trend: "Rising",
    followers: "9.1M",
    verifiedClaims: 65
  },
  {
    rank: 10,
    name: "Jessie Inchauspe",
    category: "Biochemistry",
    trustScore: "High",
    trend: "Rising",
    followers: "3.2M",
    verifiedClaims: 60
  }
];

router.get('/', (req, res) => {
  res.json(influencers);
});

module.exports = router;