import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [influencers, setInfluencers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/influencers");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setInfluencers(data);
      } catch (error) {
        console.error("Error fetching influencers:", error);
        setError("Failed to fetch influencers. Please try again later.");
      }
    };
    fetchInfluencers();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Influencer Trust Leaderboard</h1>
        <p className="text-gray-400 mb-8">
          Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.
        </p>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">{influencers.length}</h2>
              <p className="text-sm text-gray-400">Active Influencers</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold">25,431</h2>
              <p className="text-sm text-gray-400">Claims Verified</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold">85.7%</h2>
              <p className="text-sm text-gray-400">Average Trust Score</p>
            </div>
          </div>

          <div>
            <button className="bg-teal-500 px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:bg-teal-600 transition duration-300">
              Highest First
            </button>
          </div>
        </div>

        {error ? (
          <div className="bg-red-500 text-white p-4 rounded-lg">{error}</div>
        ) : (
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">Rank</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">Influencer</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">Trust Score</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">Trend</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">Followers</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">Verified Claims</th>
                </tr>
              </thead>
              <tbody>
                {influencers.map((influencer, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                    } hover:bg-gray-700`}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-400">
                      #{index + 1}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-white">
                      {influencer.name}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-400">
                      {influencer.category}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-green-500">
                      {influencer.trustScore}%
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-green-500">
                      {influencer.trend === "up" ? "▲" : "▼"}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-400">
                      {influencer.followers}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-400">
                      {influencer.verifiedClaims}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
