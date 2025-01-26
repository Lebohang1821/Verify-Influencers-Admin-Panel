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
        const response = await axios.get("http://localhost:3000/api/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setError(error.message);
      }
    }

    async function fetchInfluencers() {
      try {
        const response = await axios.get("http://localhost:3000/api/influencers");
        setInfluencers(response.data);
      } catch (error) {
        console.error("Error fetching influencers:", error);
        setError(error.message);
      }
    }

    fetchSummary();
    fetchInfluencers();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>
        {summary ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900">Total Influencers</h2>
              <p className="text-4xl font-bold text-teal-500">{influencers.length}</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900">Total Claims</h2>
              <p className="text-4xl font-bold text-teal-500">{summary.totalClaims}</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900">Verified Claims</h2>
              <p className="text-4xl font-bold text-teal-500">{summary.verifiedClaims}</p>
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
        <div className="mt-8">
          <Link to="/leaderboard">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300">
              View Leaderboard
            </button>
          </Link>
          <Link to="/research-tasks" className="ml-4">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300">
              Research Tasks
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
