const express = require('express');
const router = express.Router();

const influencers = [
  {
    id: "1",
    name: "FitnessBunnie",
    followers: 2000000,
    engagement: 0.65,
    uploads: 1966,
    description: "FitnessBunnie"
  },
  {
    id: "2",
    name: "Jaco De Bruyn",
    followers: 1000000,
    engagement: 0.15,
    uploads: 5898,
    description: "Jaco De Bruyn"
  },
  {
    id: "3",
    name: "Dr Musa Mthombeni",
    followers: 771000,
    engagement: 3.65,
    uploads: 3814,
    description: "Dr Musa Mthombeni"
  },
  {
    id: "4",
    name: "Shudufhadzo Musiḓa",
    followers: 499000,
    engagement: 4.95,
    uploads: 421,
    description: "Shudufhadzo Musiḓa"
  },
  {
    id: "5",
    name: "Dr Tamaryn Green",
    followers: 421000,
    engagement: 5.00,
    uploads: 1304,
    description: "Dr Tamaryn Green"
  },
  {
    id: "6",
    name: "Mercy Mogase",
    followers: 396000,
    engagement: 2.00,
    uploads: 4,
    description: "Mercy Mogase"
  },
  {
    id: "7",
    name: "Clicks_SA",
    followers: 380000,
    engagement: 0.00,
    uploads: 2911,
    description: "Clicks_SA"
  },
  {
    id: "8",
    name: "Rolene Strauss",
    followers: 316000,
    engagement: 1.10,
    uploads: 1956,
    description: "Rolene Strauss"
  },
  {
    id: "9",
    name: "Dis-Chem",
    followers: 269000,
    engagement: 0.00,
    uploads: 4815,
    description: "Dis-Chem"
  },
  {
    id: "10",
    name: "Dr Nokukhanya Khanyile",
    followers: 233000,
    engagement: 3.10,
    uploads: 2058,
    description: "Dr Nokukhanya Khanyile"
  },
  {
    id: "11",
    name: "Caster Semenya",
    followers: 214000,
    engagement: 1.05,
    uploads: 1781,
    description: "Caster Semenya"
  },
  {
    id: "12",
    name: "Dr Lungile F. Mhlongo",
    followers: 103000,
    engagement: 0.65,
    uploads: 1960,
    description: "Dr Lungile F. Mhlongo"
  },
  {
    id: "13",
    name: "Judie Sbahle Kama",
    followers: 103000,
    engagement: 3.15,
    uploads: 461,
    description: "Judie Sbahle Kama"
  },
  {
    id: "14",
    name: "Chad",
    followers: 102000,
    engagement: 0.00,
    uploads: 42,
    description: "Chad"
  },
  {
    id: "15",
    name: "TRUELOVE Magazine",
    followers: 102000,
    engagement: 0.30,
    uploads: 2639,
    description: "TRUELOVE Magazine"
  },
  {
    id: "16",
    name: "Angelique Daubermann",
    followers: 102000,
    engagement: 1.25,
    uploads: 2749,
    description: "Angelique Daubermann"
  },
  {
    id: "17",
    name: "Dr Langa Mngoma",
    followers: 88000,
    engagement: 0.45,
    uploads: 99,
    description: "Dr Langa Mngoma"
  },
  {
    id: "18",
    name: "Zuraida Jardine",
    followers: 81000,
    engagement: 0.35,
    uploads: 1032,
    description: "Zuraida Jardine"
  },
  {
    id: "19",
    name: "Mrs Rushda Moosajee",
    followers: 76000,
    engagement: 0.55,
    uploads: 3201,
    description: "Mrs Rushda Moosajee"
  },
  {
    id: "20",
    name: "Discovery South Africa",
    followers: 75000,
    engagement: 0.20,
    uploads: 1405,
    description: "Discovery South Africa"
  },
  {
    id: "21",
    name: "Tatjana Schoenmaker",
    followers: 72000,
    engagement: 6.10,
    uploads: 222,
    description: "Tatjana Schoenmaker"
  },
  {
    id: "22",
    name: "Dr Sivuyile Madikana",
    followers: 63000,
    engagement: 1.00,
    uploads: 2453,
    description: "Dr Sivuyile Madikana"
  },
  {
    id: "23",
    name: "Dr Riaad Moosa",
    followers: 59000,
    engagement: 2.55,
    uploads: 409,
    description: "Dr Riaad Moosa"
  },
  {
    id: "24",
    name: "Fitness Magazine",
    followers: 51000,
    engagement: 0.00,
    uploads: 3832,
    description: "Fitness Magazine"
  },
  {
    id: "25",
    name: "FUTURELIFE",
    followers: 43000,
    engagement: 0.15,
    uploads: 1604,
    description: "FUTURELIFE"
  },
  {
    id: "26",
    name: "NOURISH'D",
    followers: 29000,
    engagement: 0.40,
    uploads: 1073,
    description: "NOURISH'D"
  },
  {
    id: "27",
    name: "REVIV SA",
    followers: 26000,
    engagement: 0.00,
    uploads: 2374,
    description: "REVIV SA"
  },
  {
    id: "28",
    name: "Planet Fitness",
    followers: 24000,
    engagement: 0.20,
    uploads: 1906,
    description: "Planet Fitness"
  },
  {
    id: "29",
    name: "Mens Fitness Magazine SA",
    followers: 22000,
    engagement: 1.00,
    uploads: 1725,
    description: "Mens Fitness Magazine SA"
  },
  {
    id: "30",
    name: "Jean De Villiers",
    followers: 20000,
    engagement: 1.95,
    uploads: 93,
    description: "Jean De Villiers"
  }
];

router.get('/', (req, res) => {
  try {
    res.json(influencers);
  } catch (error) {
    console.error('Error fetching influencers:', error.message);
    res.status(500).json({ error: 'Error fetching influencers' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const influencer = influencers.find(inf => inf.id === req.params.id);
    if (!influencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }
    res.json(influencer);
  } catch (error) {
    console.error('Error fetching influencer details:', error.message);
    res.status(500).json({ error: 'Error fetching influencer details' });
  }
});

module.exports = router;
