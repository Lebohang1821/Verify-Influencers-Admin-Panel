import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await axios.get("http://localhost:5000/api/chat/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setError(error.message);
      }
    }

    async function fetchInfluencers() {
      try {
        const response = await axios.get("http://localhost:5000/api/chat/leaderboard");
        setInfluencers(response.data);
      } catch (error) {
        console.error("Error fetching influencers:", error);
        setError(error.message);
      }
    }

    fetchSummary();
    fetchInfluencers();
  }, []);

  const averageTrustScore = influencers.length > 0
    ? (influencers.reduce((sum, influencer) => sum + influencer.trustScore, 0) / influencers.length).toFixed(1)
    : 0;

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">Dashboard</h1>
        {summary ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Total Influencers</h2>
              <p className="text-3xl sm:text-4xl font-bold text-teal-500">{influencers.length}</p>
            </div>
            <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Total Claims</h2>
              <p className="text-3xl sm:text-4xl font-bold text-teal-500">{summary.totalClaims}</p>
            </div>
            <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Average Trust Score</h2>
              <p className="text-3xl sm:text-4xl font-bold text-teal-500">{averageTrustScore}%</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-900">Loading...</p>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
          <Link to="/leaderboard">
            <button className="bg-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-teal-600 transition duration-300 w-full sm:w-auto">
              View Leaderboard
            </button>
          </Link>
          <Link to="/research-tasks">
            <button className="bg-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-teal-600 transition duration-300 w-full sm:w-auto">
              Research Tasks
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
