const fetch = require('node-fetch');

const twitterService = {
  fetchTweets: async (query) => {
    // Simulate fetching tweets with more realistic data
    return [
      { id: 1, text: `Tweet about ${query}`, user: { name: 'User1' }, created_at: '2023-10-01T12:00:00Z' },
      { id: 2, text: `Another tweet about ${query}`, user: { name: 'User2' }, created_at: '2023-10-02T12:00:00Z' },
    ];
  },
};

module.exports = twitterService;
