const API_BASE_URL = 'https://verify-influencers-admin-panel.vercel.app';

export const fetchInfluencers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/influencers`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchChatLeaderboard = async () => {
  const response = await fetch(`${API_BASE_URL}/api/chat/leaderboard`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchChatSummary = async () => {
  const response = await fetch(`${API_BASE_URL}/api/chat/summary`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// ...existing code for other API calls...
