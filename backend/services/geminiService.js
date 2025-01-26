const fetch = require('node-fetch');

const geminiService = {
  enrichData: async (data) => {
    try {
      const response = await fetch('https://api.gemini.com/v1/data/enrich', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
        },
        body: JSON.stringify({ data })
      });
      const enrichedData = await response.json();
      return enrichedData;
    } catch (error) {
      console.error('Error enriching data with Gemini API:', error.message);
      throw error;
    }
  }
};

module.exports = geminiService;
