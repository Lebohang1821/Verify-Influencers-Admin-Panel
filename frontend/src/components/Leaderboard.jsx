import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [influencers, setInfluencers] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [summary, setSummary] = useState({ claimsVerified: 0, averageTrustScore: 0 });

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

    const fetchSummary = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/summary");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSummary({ claimsVerified: data.totalClaims, averageTrustScore: data.verifiedClaims / data.totalClaims * 100 });
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchInfluencers();
    fetchSummary();
  }, []);

  const filteredInfluencers = filter === "All" ? influencers : influencers.filter(i => i.category === filter);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="text-teal-600 hover:underline mb-4 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Influencer Trust Leaderboard</h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6 text-center leading-relaxed">
          Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.
        </p>

        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex gap-4 sm:gap-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-teal-600">{influencers.length}</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Active Influencers</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-teal-600">{summary.claimsVerified}</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Claims Verified</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-teal-600">{summary.averageTrustScore.toFixed(1)}%</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Average Trust Score</p>
            </div>
          </div>

          <button className="bg-teal-500 px-3 py-2 sm:px-4 sm:py-2 rounded-md text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105">
            Highest First
          </button>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          {["All", "Nutrition", "Fitness", "Medicine", "Mental Health"].map((category) => (
            <button
              key={category}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors focus:ring-2 focus:ring-teal-300 ${
                filter === category
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-teal-600 hover:text-white"
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {error ? (
          <div className="bg-red-500 text-white p-2 sm:p-3 rounded-md text-center shadow-md text-xs sm:text-sm">{error}</div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Rank</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Influencer</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Category</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Trust Score</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Trend</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Followers</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Uploads</th>
                </tr>
              </thead>
              <tbody>
                {filteredInfluencers.map((influencer, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">#{index + 1}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-900 font-medium">
                      <Link to={`/influencer/${influencer.id}`} className="text-teal-500 hover:underline">
                        {influencer.name}
                      </Link>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">{influencer.category}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-green-500">{influencer.trustScore}%</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-green-500">
                      {influencer.trend === "up" ? "▲" : "▼"}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">{influencer.followers}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">{influencer.uploads}</td>
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
