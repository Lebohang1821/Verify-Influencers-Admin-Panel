const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'");
  next();
});

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    console.log('Received request:', req.body);

    try {
        const response = await axios.post(
            'https://api.gemini.com/v1/chat/completions',
            {
                model: 'gemini-1.0', // Specify the model (e.g., gemini-1.0)
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${GEMINI_API_KEY}`,
                },
            }
        );

        console.log('Gemini API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with Gemini:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

