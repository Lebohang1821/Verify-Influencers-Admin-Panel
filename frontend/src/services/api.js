const API_BASE_URL = 'https://verify-influencers-admin-panel.onrender.com';

export const fetchInfluencers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/influencers`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// ...existing code for other API calls...
