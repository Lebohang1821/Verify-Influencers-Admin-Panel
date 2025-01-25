import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResearchTasks = () => {
  const [influencerName, setInfluencerName] = useState("");
  const [claimsToAnalyze, setClaimsToAnalyze] = useState(50);
  const [selectedJournals, setSelectedJournals] = useState(["PubMed Central", "Nature"]);
  const [includeRevenueAnalysis, setIncludeRevenueAnalysis] = useState(true);
  const [verifyWithJournals, setVerifyWithJournals] = useState(true);
  const [timeRange, setTimeRange] = useState("Last Month");
  const [researchResults, setResearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleStartResearch = async () => {
    const results = {
      influencerName,
      claimsToAnalyze,
      selectedJournals,
      includeRevenueAnalysis,
      verifyWithJournals,
      timeRange,
    };
    console.log('Starting research with the following parameters:', results);
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: JSON.stringify(results) }),
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Response from ChatGPT:', data.choices[0].message.content);
      setResearchResults(data.choices[0].message.content);
      setError(null);
    } catch (error) {
      console.error("Error fetching research results:", error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="text-teal-500 hover:underline">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Research Tasks</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setTimeRange("Last Week")}
              className={`py-2 px-4 rounded-lg ${timeRange === "Last Week" ? "bg-teal-500 text-white" : "border border-gray-300 text-gray-800"}`}
            >
              Last Week
            </button>
            <button
              onClick={() => setTimeRange("Last Month")}
              className={`py-2 px-4 rounded-lg ${timeRange === "Last Month" ? "bg-teal-500 text-white" : "border border-gray-300 text-gray-800"}`}
            >
              Last Month
            </button>
            <button
              onClick={() => setTimeRange("Last Year")}
              className={`py-2 px-4 rounded-lg ${timeRange === "Last Year" ? "bg-teal-500 text-white" : "border border-gray-300 text-gray-800"}`}
            >
              Last Year
            </button>
            <button
              onClick={() => setTimeRange("All Time")}
              className={`py-2 px-4 rounded-lg ${timeRange === "All Time" ? "bg-teal-500 text-white" : "border border-gray-300 text-gray-800"}`}
            >
              All Time
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter influencer name"
            value={influencerName}
            onChange={(e) => setInfluencerName(e.target.value)}
            className="mb-4 w-full border border-gray-300 p-2 rounded-lg text-gray-800"
          />
          <input
            type="number"
            placeholder="Claims to analyze per influencer"
            value={claimsToAnalyze}
            onChange={(e) => setClaimsToAnalyze(parseInt(e.target.value) || 0)}
            className="mb-4 w-full border border-gray-300 p-2 rounded-lg text-gray-800"
          />
          <div className="flex gap-4 items-center mb-4">
            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                checked={includeRevenueAnalysis}
                onChange={() => setIncludeRevenueAnalysis(!includeRevenueAnalysis)}
                className="form-checkbox text-teal-500"
              />
              Include Revenue Analysis
            </label>
            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                checked={verifyWithJournals}
                onChange={() => setVerifyWithJournals(!verifyWithJournals)}
                className="form-checkbox text-teal-500"
              />
              Verify with Scientific Journals
            </label>
          </div>
          <button onClick={handleStartResearch} className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-300">
            Start Research
          </button>
        </div>
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mt-4">
            {error}
          </div>
        )}
        {researchResults && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Research Results</h2>
            <pre className="text-gray-800 whitespace-pre-wrap">{researchResults}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchTasks;
