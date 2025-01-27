const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data: http://localhost:3000/favicon.ico; script-src 'self'; style-src 'self' 'unsafe-inline'");
  next();
});

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    console.log('Received request:', req.body);

    try {
        const response = await axios.post(
            'https://api.perplexity.ai/v1/chat/completions',
            {
                model: 'perplexity-1.0', // Specify the model (e.g., perplexity-1.0)
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
                },
            }
        );

        console.log('Perplexity API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with Perplexity:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

