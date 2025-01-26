import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResearchTasks = () => {
  const [influencerName, setInfluencerName] = useState("");
  const [claimsToAnalyze, setClaimsToAnalyze] = useState(50);
  const [timeRange, setTimeRange] = useState("Last Month");
  const [includeRevenueAnalysis, setIncludeRevenueAnalysis] = useState(true);
  const [verifyWithJournals, setVerifyWithJournals] = useState(true);
  const [researchResults, setResearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartResearch = async () => {
    if (!influencerName.trim()) {
      setError("Health Influencer name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    const requestData = {
      influencerName,
      claimsToAnalyze,
      timeRange,
      includeRevenueAnalysis,
      verifyWithJournals,
    };

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed with status code ${response.status}`
        );
      }

      const data = await response.json();
      setResearchResults(data.results || "No results available.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="text-teal-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Research Tasks
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {["Last Week", "Last Month", "Last Year", "All Time"].map(
              (range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`py-2 px-4 rounded-lg ${
                    timeRange === range
                      ? "bg-teal-600 text-white"
                      : "border border-gray-300 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {range}
                </button>
              )
            )}
          </div>
          <input
            type="text"
            placeholder="Enter influencer name"
            value={influencerName}
            onChange={(e) => setInfluencerName(e.target.value)}
            className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
          />
          <input
            type="number"
            placeholder="Claims to analyze"
            value={claimsToAnalyze}
            onChange={(e) => setClaimsToAnalyze(Number(e.target.value) || 50)}
            className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
          />
          <div className="flex gap-4 items-center mb-4">
            <label className="flex items-center gap-2 text-black">
              <input
                type="checkbox"
                checked={includeRevenueAnalysis}
                onChange={() =>
                  setIncludeRevenueAnalysis(!includeRevenueAnalysis)
                }
                className="form-checkbox text-teal-600"
              />
              Include Revenue Analysis
            </label>
            <label className="flex items-center gap-2 text-black">
              <input
                type="checkbox"
                checked={verifyWithJournals}
                onChange={() => setVerifyWithJournals(!verifyWithJournals)}
                className="form-checkbox text-teal-600"
              />
              Verify with Journals
            </label>
          </div>
          <button
            onClick={handleStartResearch}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Start Research"}
          </button>
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mt-4">
              {error}
            </div>
          )}
          {researchResults && (
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Research Results
              </h2>
              <pre className="text-gray-800 whitespace-pre-wrap">
                {researchResults}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchTasks;