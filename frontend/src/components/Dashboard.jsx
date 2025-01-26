import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
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

    async function fetchSearchResults() {
      try {
        const response = await axios.get("http://localhost:3000/api/search-results");
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError(error.message);
      }
    }

    fetchSummary();
    fetchSearchResults();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>
        {summary ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900">Total Influencers</h2>
              <p className="text-4xl font-bold text-teal-500">{summary.totalInfluencers}</p>
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
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result._id} className="mb-4">
                <div className="flex items-center mb-2">
                  <img src={result.profilePicture} alt={result.influencerName} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{result.influencerName}</h3>
                    <p className="text-gray-700">Followers: {result.followersCount}</p>
                  </div>
                </div>
                <p className="text-gray-700">Claims to Analyze: {result.claimsToAnalyze}</p>
                <p className="text-gray-700">Time Range: {result.timeRange}</p>
                <p className="text-gray-700">Include Revenue Analysis: {result.includeRevenueAnalysis ? 'Yes' : 'No'}</p>
                <p className="text-gray-700">Verify with Journals: {result.verifyWithJournals ? 'Yes' : 'No'}</p>
                <pre className="bg-gray-100 p-2 rounded-lg text-gray-700">{JSON.stringify(result.results, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <Link to="/research-tasks">
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
