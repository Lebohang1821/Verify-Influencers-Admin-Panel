const fetch = require('node-fetch');

const twitterService = {
  fetchTweets: async (query) => {
    // Simulate fetching tweets with more realistic data
    return [
      {
        id: "1883396164025974939",
        text: `The 6 Foods You Should NEVER EAT Again! | Mark Hyman https://t.co/DEJbbGjzEO via @YouTube`,
        edit_history_tweet_ids: ["1883396164025974939"],
      },
      {
        id: "1883396164025974940",
        text: `Another tweet about ${query}`,
        edit_history_tweet_ids: ["1883396164025974940"],
      },
    ];
  },
};

module.exports = twitterService;
