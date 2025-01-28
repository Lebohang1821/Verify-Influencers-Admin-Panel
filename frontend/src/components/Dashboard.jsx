import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { TrendingUp, CheckCircle, Users } from "lucide-react"; // Corrected import

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
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto"> {/* Adjusted width */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Dashboard</h1>
          <nav className="flex gap-2 sm:gap-4">
            <Link to="/leaderboard" className="text-teal-600 hover:text-teal-800 font-semibold">Leaderboard</Link>
            <Link to="/research-tasks" className="text-teal-600 hover:text-teal-800 font-semibold">Research Tasks</Link>
          </nav>
        </header>

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {summary ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <Users className="text-teal-500 mb-2 sm:mb-4" size={30} /> {/* Corrected icon */}
              <h2 className="text-md sm:text-lg font-semibold text-gray-900">Total Influencers</h2>
              <p className="text-3xl sm:text-4xl font-bold text-teal-500">{influencers.length}</p>
            </div>

            <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <CheckCircle className="text-teal-500 mb-2 sm:mb-4" size={30} />
              <h2 className="text-md sm:text-lg font-semibold text-gray-900">Total Claims</h2>
              <p className="text-3xl sm:text-4xl font-bold text-teal-500">{summary.totalClaims}</p>
            </div>

            <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <TrendingUp className="text-teal-500 mb-2 sm:mb-4" size={30} />
              <h2 className="text-md sm:text-lg font-semibold text-gray-900">Average Trust Score</h2>
              <p className="text-3xl sm:text-4xl font-bold text-teal-500">{averageTrustScore}%</p>
            </div>

            <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <CheckCircle className="text-teal-500 mb-2 sm:mb-4" size={30} />
              <h2 className="text-md sm:text-lg font-semibold text-gray-900">Verified Claims</h2>
              <p className="text-3xl sm:text-4xl font-bold text-teal-500">{summary.verifiedClaims}</p>
            </div>

            <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <Users className="text-teal-500 mb-2 sm:mb-4" size={30} /> {/* Corrected icon */}
              <h2 className="text-md sm:text-lg font-semibold text-gray-900">Top Influencer</h2>
              <p className="text-3xl sm:text-4xl font-bold text-teal-500">{influencers[0]?.influencerName || "N/A"}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <CircularProgress color="primary" />
          </div>
        )}

        <footer className="mt-8 sm:mt-12 flex justify-center">
          <Link to="/contact">
            <button className="bg-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-teal-600 transition duration-300">
              Contact Support
            </button>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;

