import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Users, CheckCircle, TrendingUp } from "lucide-react"; // Import icons

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [summary, setSummary] = useState({ claimsVerified: 0, averageTrustScore: 0 });
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://verify-influencers-admin-panel.vercel.app/api/chat/leaderboard");
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error.message);
        setError("Failed to fetch leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSummary = async () => {
      try {
        const response = await fetch("https://verify-influencers-admin-panel.vercel.app/api/chat/summary");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const averageTrustScore = data.verifiedClaims / data.totalClaims;
        setSummary({ claimsVerified: data.totalClaims, averageTrustScore });
      } catch (error) {
        console.error("Error fetching summary:", error);
        setError("Failed to fetch summary. Please try again later.");
      }
    };

    fetchLeaderboard();
    fetchSummary();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredInfluencers =
    selectedCategory === "All"
      ? leaderboard
      : leaderboard.filter((i) => i.category === selectedCategory);

  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.estimatedFollowers - a.estimatedFollowers;
    } else {
      return a.estimatedFollowers - b.estimatedFollowers;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  const averageTrustScore = leaderboard.length > 0
    ? (leaderboard.reduce((sum, influencer) => sum + influencer.trustScore, 0) / leaderboard.length).toFixed(1)
    : 0;

  const formatFollowers = (followers) => {
    if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1) + "M";
    } else if (followers >= 1000) {
      return (followers / 1000).toFixed(1) + "K";
    } else {
      return followers.toString();
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Influencer Trust Leaderboard</h1>
        <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
          Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.
        </p>

        <div className="flex flex-wrap justify-center items-center mb-4 sm:mb-6">
          <div className="flex gap-2 sm:gap-4 text-center">
            <div className="flex flex-col items-center">
              <Users className="text-teal-500 mb-1 sm:mb-2" size={24} />
              <h2 className="text-xl sm:text-2xl font-bold text-teal-600">{leaderboard.length}</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Active Influencers</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="text-teal-500 mb-1 sm:mb-2" size={24} />
              <h2 className="text-xl sm:text-2xl font-bold text-teal-600">{summary.claimsVerified}</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Claims Verified</p>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="text-teal-500 mb-1 sm:mb-2" size={24} />
              <h2 className="text-xl sm:text-2xl font-bold text-teal-600">{averageTrustScore}%</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Average Trust Score</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6">
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {["All", "Nutrition", "Fitness", "Medicine", "Mental Health"].map((category) => (
              <button
                key={category}
                className={`px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors focus:ring-2 focus:ring-teal-300 ${
                  selectedCategory === category
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-teal-600 hover:text-white"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            className="bg-teal-500 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105"
            onClick={toggleSortOrder}
          >
            {sortOrder === "desc" ? "Highest First" : "Lowest First"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-teal-500 text-4xl" />
          </div>
        ) : error ? (
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
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Verified Claims</th>
                </tr>
              </thead>
              <tbody>
                {sortedInfluencers.map((influencer, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">#{index + 1}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-900 font-medium">
                      <Link to={`/influencer/${influencer._id}`} className="text-teal-500 hover:underline">
                        {influencer.influencerName}
                      </Link>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">{influencer.category}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-green-500">{influencer.trustScore}%</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-green-500">
                      {influencer.trend === "Up" ? "▲" : <span className="text-red-500">▼</span>}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">{formatFollowers(influencer.estimatedFollowers)}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">{influencer.verifiedClaims}</td>
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
