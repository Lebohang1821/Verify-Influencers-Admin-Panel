const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

router.post('/', async (req, res) => {
    const { prompt } = req.body;
    console.log('Received request:', req.body);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', // Specify the model (e.g., gpt-3.5-turbo)
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        console.log('OpenAI API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with OpenAI:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 'insufficient_quota') {
            res.status(429).json({ error: 'You have exceeded your current quota. Please check your plan and billing details.' });
        } else {
            res.status(500).send('Error communicating with OpenAI');
        }
    }
});

module.exports = router;
