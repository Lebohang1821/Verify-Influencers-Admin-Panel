const fetch = require('node-fetch');

const apiService = {
  fetchData: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  fetchOpenAiData: async (prompt) => {
    try {
      console.log('Sending request to OpenAI API with prompt:', prompt);
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100
        })
      });
      console.log('Received response from OpenAI API:', response);
      const data = await response.json();
      console.log('OpenAI API response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching OpenAI data:', error.message);
      throw error;
    }
  }
};

module.exports = apiService;
