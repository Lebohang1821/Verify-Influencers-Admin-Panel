import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const ResearchTasks = () => {
  const [influencerName, setInfluencerName] = useState("");
  const [claimsToAnalyze, setClaimsToAnalyze] = useState(50);
  const [selectedJournals, setSelectedJournals] = useState(["PubMed Central", "Nature"]);
  const [includeRevenueAnalysis, setIncludeRevenueAnalysis] = useState(true);
  const [verifyWithJournals, setVerifyWithJournals] = useState(true);
  const [timeRange, setTimeRange] = useState("Last Month");

  const handleStartResearch = () => {
    // Placeholder for the backend integration to start research tasks
    console.log({ influencerName, claimsToAnalyze, selectedJournals, includeRevenueAnalysis, verifyWithJournals, timeRange });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <Link to="/dashboard" className="text-teal-400 hover:underline">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Research Tasks</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => setTimeRange("Last Week")}
              className={`py-2 px-4 rounded-lg ${timeRange === "Last Week" ? "bg-teal-400 text-white" : "border border-gray-300 text-gray-800"}`}
            >
              Last Week
            </button>
            <button
              onClick={() => setTimeRange("Last Month")}
              className={`py-2 px-4 rounded-lg ${timeRange === "Last Month" ? "bg-teal-400 text-white" : "border border-gray-300 text-gray-800"}`}
            >
              Last Month
            </button>
            <button
              onClick={() => setTimeRange("Last Year")}
              className={`py-2 px-4 rounded-lg ${timeRange === "Last Year" ? "bg-teal-400 text-white" : "border border-gray-300 text-gray-800"}`}
            >
              Last Year
            </button>
            <button
              onClick={() => setTimeRange("All Time")}
              className={`py-2 px-4 rounded-lg ${timeRange === "All Time" ? "bg-teal-400 text-white" : "border border-gray-300 text-gray-800"}`}
            >
              All Time
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter influencer name"
            value={influencerName}
            onChange={(e) => setInfluencerName(e.target.value)}
            className="mb-4 w-full border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="number"
            placeholder="Claims to analyze per influencer"
            value={claimsToAnalyze}
            onChange={(e) => setClaimsToAnalyze(parseInt(e.target.value) || 0)}
            className="mb-4 w-full border border-gray-300 p-2 rounded-lg"
          />
          <div className="flex gap-4 items-center mb-4">
            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                checked={includeRevenueAnalysis}
                onChange={() => setIncludeRevenueAnalysis(!includeRevenueAnalysis)}
                className="form-checkbox text-teal-400"
              />
              Include Revenue Analysis
            </label>
            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                checked={verifyWithJournals}
                onChange={() => setVerifyWithJournals(!verifyWithJournals)}
                className="form-checkbox text-teal-400"
              />
              Verify with Scientific Journals
            </label>
          </div>
          <button onClick={handleStartResearch} className="w-full bg-teal-400 text-white py-2 rounded-lg hover:bg-teal-500">
            Start Research
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchTasks;
