const fetch = require('node-fetch');

const apiService = {
  fetchData: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  fetchGeminiData: async (prompt) => {
    try {
      console.log('Sending request to Gemini API with prompt:', prompt);
      const response = await fetch('https://api.gemini.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gemini-1.0', // Specify the model (e.g., gemini-1.0)
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100
        })
      });
      console.log('Received response from Gemini API:', response);
      const data = await response.json();
      console.log('Gemini API response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching Gemini data:', error.message);
      throw error;
    }
  }
};

module.exports = apiService;
