const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'");
  next();
});

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    console.log('Received request:', req.body);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4', // Specify the model (e.g., gpt-3.5-turbo or gpt-4)
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
        console.error('Error communicating with OpenAI:', error.response.data);
        res.status(500).send('Error communicating with OpenAI');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

