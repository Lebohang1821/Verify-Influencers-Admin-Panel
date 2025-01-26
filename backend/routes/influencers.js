const express = require('express');
const router = express.Router();

const influencers = [
  {
    id: "1",
    name: "FitnessBunnie",
    followers: 2000000,
    engagement: 0.65,
    uploads: 1966,
    category: "Fitness",
    trustScore: 85,
    trend: "up",
    description: "FitnessBunnie"
  },
  {
    id: "2",
    name: "Jaco De Bruyn",
    followers: 1000000,
    engagement: 0.15,
    uploads: 5898,
    category: "Fitness",
    trustScore: 80,
    trend: "up",
    description: "Jaco De Bruyn"
  },
  {
    id: "3",
    name: "Dr Musa Mthombeni",
    followers: 771000,
    engagement: 3.65,
    uploads: 3814,
    category: "Health",
    trustScore: 90,
    trend: "up",
    description: "Dr Musa Mthombeni"
  },
  {
    id: "4",
    name: "Shudufhadzo Musiḓa",
    followers: 499000,
    engagement: 4.95,
    uploads: 421,
    category: "Health",
    trustScore: 88,
    trend: "up",
    description: "Shudufhadzo Musiḓa"
  },
  {
    id: "5",
    name: "Dr Tamaryn Green",
    followers: 421000,
    engagement: 5.00,
    uploads: 1304,
    category: "Health",
    trustScore: 92,
    trend: "up",
    description: "Dr Tamaryn Green"
  },
  {
    id: "6",
    name: "Mercy Mogase",
    followers: 396000,
    engagement: 2.00,
    uploads: 4,
    category: "Health",
    trustScore: 75,
    trend: "down",
    description: "Mercy Mogase"
  },
  {
    id: "7",
    name: "Clicks_SA",
    followers: 380000,
    engagement: 0.00,
    uploads: 2911,
    category: "Health",
    trustScore: 70,
    trend: "down",
    description: "Clicks_SA"
  },
  {
    id: "8",
    name: "Rolene Strauss",
    followers: 316000,
    engagement: 1.10,
    uploads: 1956,
    category: "Health",
    trustScore: 85,
    trend: "up",
    description: "Rolene Strauss"
  },
  {
    id: "9",
    name: "Dis-Chem",
    followers: 269000,
    engagement: 0.00,
    uploads: 4815,
    category: "Health",
    trustScore: 65,
    trend: "down",
    description: "Dis-Chem"
  },
  {
    id: "10",
    name: "Dr Nokukhanya Khanyile",
    followers: 233000,
    engagement: 3.10,
    uploads: 2058,
    category: "Health",
    trustScore: 88,
    trend: "up",
    description: "Dr Nokukhanya Khanyile"
  },
  {
    id: "11",
    name: "Caster Semenya",
    followers: 214000,
    engagement: 1.05,
    uploads: 1781,
    category: "Fitness",
    trustScore: 80,
    trend: "up",
    description: "Caster Semenya"
  },
  {
    id: "12",
    name: "Dr Lungile F. Mhlongo",
    followers: 103000,
    engagement: 0.65,
    uploads: 1960,
    category: "Health",
    trustScore: 75,
    trend: "down",
    description: "Dr Lungile F. Mhlongo"
  },
  {
    id: "13",
    name: "Judie Sbahle Kama",
    followers: 103000,
    engagement: 3.15,
    uploads: 461,
    category: "Health",
    trustScore: 85,
    trend: "up",
    description: "Judie Sbahle Kama"
  },
  {
    id: "14",
    name: "Chad",
    followers: 102000,
    engagement: 0.00,
    uploads: 42,
    category: "Fitness",
    trustScore: 60,
    trend: "down",
    description: "Chad"
  },
  {
    id: "15",
    name: "TRUELOVE Magazine",
    followers: 102000,
    engagement: 0.30,
    uploads: 2639,
    category: "Health",
    trustScore: 70,
    trend: "down",
    description: "TRUELOVE Magazine"
  },
  {
    id: "16",
    name: "Angelique Daubermann",
    followers: 102000,
    engagement: 1.25,
    uploads: 2749,
    category: "Health",
    trustScore: 75,
    trend: "up",
    description: "Angelique Daubermann"
  },
  {
    id: "17",
    name: "Dr Langa Mngoma",
    followers: 88000,
    engagement: 0.45,
    uploads: 99,
    category: "Health",
    trustScore: 70,
    trend: "down",
    description: "Dr Langa Mngoma"
  },
  {
    id: "18",
    name: "Zuraida Jardine",
    followers: 81000,
    engagement: 0.35,
    uploads: 1032,
    category: "Health",
    trustScore: 65,
    trend: "down",
    description: "Zuraida Jardine"
  },
  {
    id: "19",
    name: "Mrs Rushda Moosajee",
    followers: 76000,
    engagement: 0.55,
    uploads: 3201,
    category: "Health",
    trustScore: 75,
    trend: "up",
    description: "Mrs Rushda Moosajee"
  },
  {
    id: "20",
    name: "Discovery South Africa",
    followers: 75000,
    engagement: 0.20,
    uploads: 1405,
    category: "Health",
    trustScore: 70,
    trend: "down",
    description: "Discovery South Africa"
  },
  {
    id: "21",
    name: "Tatjana Schoenmaker",
    followers: 72000,
    engagement: 6.10,
    uploads: 222,
    category: "Fitness",
    trustScore: 90,
    trend: "up",
    description: "Tatjana Schoenmaker"
  },
  {
    id: "22",
    name: "Dr Sivuyile Madikana",
    followers: 63000,
    engagement: 1.00,
    uploads: 2453,
    category: "Health",
    trustScore: 80,
    trend: "up",
    description: "Dr Sivuyile Madikana"
  },
  {
    id: "23",
    name: "Dr Riaad Moosa",
    followers: 59000,
    engagement: 2.55,
    uploads: 409,
    category: "Health",
    trustScore: 85,
    trend: "up",
    description: "Dr Riaad Moosa"
  },
  {
    id: "24",
    name: "Fitness Magazine",
    followers: 51000,
    engagement: 0.00,
    uploads: 3832,
    category: "Fitness",
    trustScore: 60,
    trend: "down",
    description: "Fitness Magazine"
  },
  {
    id: "25",
    name: "FUTURELIFE",
    followers: 43000,
    engagement: 0.15,
    uploads: 1604,
    category: "Health",
    trustScore: 65,
    trend: "down",
    description: "FUTURELIFE"
  },
  {
    id: "26",
    name: "NOURISH'D",
    followers: 29000,
    engagement: 0.40,
    uploads: 1073,
    category: "Health",
    trustScore: 70,
    trend: "down",
    description: "NOURISH'D"
  },
  {
    id: "27",
    name: "REVIV SA",
    followers: 26000,
    engagement: 0.00,
    uploads: 2374,
    category: "Health",
    trustScore: 60,
    trend: "down",
    description: "REVIV SA"
  },
  {
    id: "28",
    name: "Planet Fitness",
    followers: 24000,
    engagement: 0.20,
    uploads: 1906,
    category: "Fitness",
    trustScore: 65,
    trend: "down",
    description: "Planet Fitness"
  },
  {
    id: "29",
    name: "Mens Fitness Magazine SA",
    followers: 22000,
    engagement: 1.00,
    uploads: 1725,
    category: "Fitness",
    trustScore: 70,
    trend: "up",
    description: "Mens Fitness Magazine SA"
  },
  {
    id: "30",
    name: "Jean De Villiers",
    followers: 20000,
    engagement: 1.95,
    uploads: 93,
    category: "Fitness",
    trustScore: 75,
    trend: "up",
    description: "Jean De Villiers"
  },
  {
    id: "31",
    name: "Michelle Lewin",
    followers: 16824000, // Combined followers
    engagement: 0.0,
    uploads: 0,
    category: "Fitness",
    trustScore: 95,
    trend: "up",
    description: "Michelle Lewin earned her fame as an international model and bodybuilder during the 2010s. Born in Venezuela, she now has immense experience in the fitness world and shares her insights with her loyal following. Most of Michelle’s content revolves around sharing her workout routines and diet tips. However, she also offers windows into her private life with a smattering of lifestyle content. She’s ideal for brands because of her enormous follower base. The people who watch her are interested in everything she says and take her advice seriously."
  },
  {
    id: "32",
    name: "Deepak Chopra",
    followers: 12400000, // Combined followers
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 85,
    trend: "up",
    description: "Deepak Chopra is an American-Indian new age guru specializing in esoteric paths to health. While he focuses on spirituality, he also believes in the mind’s healing powers. Now 77, Chopra is a controversial figure, having written numerous books on well-being, the nature of existence, and how to achieve anything. His alternative medicine concepts are original and may appeal to brands searching for captive audiences for supplements and Ayurveda."
  },
  {
    id: "33",
    name: "Rebecca Louise",
    followers: 1616800, // Combined followers
    engagement: 0.0,
    uploads: 0,
    category: "Fitness",
    trustScore: 90,
    trend: "up",
    description: "Rebecca Louise is a popular fitness trainer and health coach who loves sharing her workout tips. She’s a stalwart on Instagram and other platforms, offering nutrition plans and recipes for followers to use in their daily lives. What’s most impressive about Rebecca is how she lives the lifestyle she promotes. You can see the effectiveness of her advice in her photos and the all-round radiance she exudes."
  },
  {
    id: "34",
    name: "Mark Hyman",
    followers: 4483500, // Combined followers
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 92,
    trend: "up",
    description: "Mark Hyman is a health influencer focused on longevity and reducing the risk of chronic diseases as people get older. He researches the latest science and shares actionable tips with his followers on Instagram, YouTube, and X. Part of his appeal is his gentle, simple style. Unlike many doctors, he can communicate with the average person, telling them what to do without getting too technical. He also has several books backing up his content, including Young Forever: The Secrets to Living Your Longest, Healthiest Life and The Pegan Diet: 21 Practical Principles for Reclaiming Your Health in a Nutritionally Confusing World. Attracting him as an influencer is challenging and costly. But the brands that succeed (by convincing him they have worthwhile products) are likely to thrive."
  },
  {
    id: "35",
    name: "Adriene Mishler",
    followers: 14130000, // Combined followers
    engagement: 0.0,
    uploads: 0,
    category: "Fitness",
    trustScore: 95,
    trend: "up",
    description: "Adriene Mishler is the founder of Yoga with Adriene, the most popular yoga channel on the platform. Her goal is to teach the world yoga and show everyone how simple it is to tap into this ancient art for health and well-being. People love Adriene because of her friendly, no-nonsense style. She guides her audience through the moves and helps them get more in touch with their bodies unlike anyone else. Brands love her work because of how approachable she is. Unlike some health influencers, she avoids controversy and focuses on what she does best."
  },
  {
    id: "36",
    name: "Kayla Itsines",
    followers: 16100000,
    engagement: 0.0,
    uploads: 0,
    category: "Fitness",
    trustScore: 95,
    trend: "up",
    description: "Personal Trainer @sweat app. High intensity | Strength | Pregnancy | Post Pregnancy | Low impact. Jae.Arna.Jax 👨‍👩‍👧‍👦💍 ****@kaylaitsines.com"
  },
  {
    id: "37",
    name: "Andrew Huberman",
    followers: 7300000,
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 90,
    trend: "up",
    description: "Professor of Neurobiology & Ophthalmology @stanford.med @stanford. Neuroscience Research & Education. Host of the Huberman Lab podcast ****@hubermanlab.com"
  },
  {
    id: "38",
    name: "Dr. Mikhail Varshavski",
    followers: 4400000,
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 85,
    trend: "up",
    description: "Be Aware Of Fake Accounts! @thecheckuppodcast <-New Podcast YouTube(11.5 Mil) ****@gmail.com"
  },
  {
    id: "39",
    name: "Massy Arias",
    followers: 3100000,
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 85,
    trend: "up",
    description: "Mom | Health Coach | CEO 🇩🇴 👉🏾@tru_supplements📧: ****@gmail.con. Join my new program ‘Sculpt’ with 1,000’s of @mawarriors 👇🏾"
  },
  {
    id: "40",
    name: "Vani Hari",
    followers: 2200000,
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 80,
    trend: "up",
    description: "Hot on the trail to investigate what’s in your food. NY Times Best Selling Author & Founder of @truvani. Get my 7-Day Sugar Detox👇🏽 ****@foodbabe.com"
  },
  {
    id: "41",
    name: "Graeme Tomlinson",
    followers: 1400000,
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 80,
    trend: "up",
    description: "Evidence Based Coach🤓. All content is my own ©🙎‍♂️. Sunday Times Bestselling Author📒. Get 40% Off My Brand New App! Offer Ends Soon! ⬇️ ****@fitnesschef.uk"
  },
  {
    id: "42",
    name: "Amanda Rocchio",
    followers: 1700000,
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 85,
    trend: "up",
    description: "🍏 Making Nutrition Easy to Understand 🍓. Food Facts + Simple Recipes + Health Tips👇. Lose Weight, Get Healthy & Happy (custom meal plans + more!) ****@gmail.com"
  },
  {
    id: "43",
    name: "Dr. Michael Greger",
    followers: 1300000,
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 85,
    trend: "up",
    description: "🩺 Founded by Michael Greger, MD 🥦. Evidence-based nutrition 👟. Lifestyle medicine🍓. Helping you make healthy lifestyle choices⬇️. See our latest video ****@nutritionfacts.org"
  },
  {
    id: "44",
    name: "Karalynne Call",
    followers: 1100000,
    engagement: 0.0,
    uploads: 0,
    category: "Health",
    trustScore: 80,
    trend: "up",
    description: "Certified Nutritionist, Mental Health Advocate. Host of Top 20 Podcast: Just Ingredients. Blessed mom of 6. Shop my non‐toxic products👇 ****@outlook.com"
  },
  {
    id: "45",
    name: "Andrea Allen",
    followers: 797000,
    engagement: 0.0,
    uploads: 0,
    category: "Fitness",
    trustScore: 80,
    trend: "up",
    description: "I make health & fitness simple for moms @dfh.training.pics. Home workouts-Core help-Top 10 Fitness Podcast"
  }
].sort((a, b) => b.followers - a.followers);

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
