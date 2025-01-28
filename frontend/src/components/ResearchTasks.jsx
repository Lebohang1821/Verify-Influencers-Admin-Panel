import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const ResearchTasks = () => {
  const [influencerName, setInfluencerName] = useState("");
  const [claimsToAnalyze, setClaimsToAnalyze] = useState(50);
  const [timeRange, setTimeRange] = useState("Last Month");
  const [includeRevenueAnalysis, setIncludeRevenueAnalysis] = useState(true);
  const [verifyWithJournals, setVerifyWithJournals] = useState(true);
  const [researchResults, setResearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [scientificJournals, setScientificJournals] = useState({
    pubmed: true,
    nature: true,
    science: true,
    cell: true,
    lancet: true,
    nejm: true,
    jama: true,
  });
  const [newJournal, setNewJournal] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [researchConfig, setResearchConfig] = useState("Specific Influencer");
  const [newInfluencers, setNewInfluencers] = useState([]);

  useEffect(() => {
    if (researchConfig === "Discover New") {
      fetchNewInfluencers();
    } else {
      setInfluencerName("");
      setNewInfluencers([]);
    }
  }, [researchConfig]);

  const fetchNewInfluencers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/influencers/new");
      const data = await response.json();
      setNewInfluencers(data.influencers || []);
    } catch (error) {
      console.error("Error fetching new influencers:", error.message);
    }
  };

  const handleJournalChange = (journal) => {
    setScientificJournals({
      ...scientificJournals,
      [journal]: !scientificJournals[journal],
    });
  };

  const handleSelectAll = () => {
    setScientificJournals(
      Object.keys(scientificJournals).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
  };

  const handleDeselectAll = () => {
    setScientificJournals(
      Object.keys(scientificJournals).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
    );
  };

  const handleAddJournal = () => {
    if (newJournal.trim() && !scientificJournals[newJournal]) {
      setScientificJournals((prevState) => ({
        ...prevState,
        [newJournal]: true,
      }));
      setNewJournal("");
    }
  };

  const handleStartResearch = async () => {
    if (researchConfig === "Specific Influencer" && !influencerName.trim()) {
      setError("Health Influencer name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    const requestData = {
      influencerName: researchConfig === "Discover New" ? "" : influencerName,
      claimsToAnalyze,
      timeRange,
      includeRevenueAnalysis,
      verifyWithJournals,
      scientificJournals,
    };

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
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
      setResearchResults(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="text-teal-600 hover:underline mb-4 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Research Tasks
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Research Configuration */}
          <div className="p-6 rounded-xl mb-6 bg-gray-50">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Research Configuration</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                className={`px-4 py-6 rounded-lg font-medium transition-all border border-gray-300 ${
                  researchConfig === "Specific Influencer"
                    ? "border-green-600 text-green-600 bg-opacity-25"
                    : "text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setResearchConfig("Specific Influencer")}
              >
                Specific Influencer
              </button>
              <button
                className={`px-4 py-6 rounded-lg font-medium transition-all border border-gray-300 ${
                  researchConfig === "Discover New"
                    ? "border-green-600 text-green-600 bg-opacity-25"
                    : "text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setResearchConfig("Discover New")}
              >
                Discover New
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {["Last Week", "Last Month", "Last Year", "All Time"].map(
              (range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`py-2 px-4 rounded-lg ${
                    timeRange === range
                      ? "border border-green-600 text-green-600 bg-opacity-25"
                      : "border border-gray-300 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {range}
                </button>
              )
            )}
          </div>
          {researchConfig === "Specific Influencer" && (
            <input
              type="text"
              placeholder="Enter influencer name"
              value={influencerName}
              onChange={(e) => setInfluencerName(e.target.value)}
              className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
            />
          )}
          {researchConfig === "Discover New" && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">New Influencers</h4>
              <ul className="list-disc list-inside">
                {newInfluencers.map((influencer, index) => (
                  <li key={index} className="text-gray-800">{influencer}</li>
                ))}
              </ul>
            </div>
          )}
          <input
            type="number"
            placeholder="Claims to analyze"
            value={claimsToAnalyze}
            onChange={(e) => setClaimsToAnalyze(Number(e.target.value) || 50)}
            className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
          />
          <div className="flex flex-col gap-4 items-end">
            <label className="inline-flex items-center justify-between w-full text-black">
              <span className="ml-2">Include Revenue Analysis</span>
              <div
                className={`relative w-12 h-6 flex items-center bg-gray-700 rounded-full cursor-pointer transition-all ${
                  includeRevenueAnalysis ? "bg-green-500" : "bg-gray-700"
                }`}
                onClick={() => setIncludeRevenueAnalysis(!includeRevenueAnalysis)}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    includeRevenueAnalysis ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </label>
            <label className="inline-flex items-center justify-between w-full text-black">
              <span className="ml-2">Verify with Journals</span>
              <div
                className={`relative w-12 h-6 flex items-center bg-gray-700 rounded-full cursor-pointer transition-all ${
                  verifyWithJournals ? "bg-green-500" : "bg-gray-700"
                }`}
                onClick={() => setVerifyWithJournals(!verifyWithJournals)}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    verifyWithJournals ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
          {verifyWithJournals && (
            <div className="bg-gray-50 p-6 rounded-xl mt-6">
              <h3 className="text-2xl font-semibold mb-4 text-black">Scientific Journals</h3>

              <div className="flex justify-end items-center space-x-4 mb-6">
                <button
                  className="text-sm text-green-500 hover:underline"
                  onClick={handleSelectAll}
                >
                  Select All
                </button>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={handleDeselectAll}
                >
                  Deselect All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.keys(scientificJournals).map((journal) => (
                  <label
                    key={journal}
                    className={`flex justify-between items-center bg-gray-200 p-2 rounded-lg cursor-pointer border transition-all ${
                      scientificJournals[journal] ? "border-green-500" : "border-transparent"
                    }`}
                    onClick={() => handleJournalChange(journal)}
                  >
                    <span className="text-sm font-medium capitalize text-black">{journal}</span>
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        scientificJournals[journal] ? "bg-green-500 border-green-500" : "border-gray-500"
                      }`}
                    >
                      {scientificJournals[journal] && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {showAddSection && (
                <div className="space-y-2">
                  <label className="block font-medium text-sm text-black" htmlFor="add-journal">
                    Add New Journal
                  </label>
                  <div className="flex space-x-2">
                    <input
                      id="add-journal"
                      type="text"
                      className="flex-1 bg-gray-200 bg-opacity-50 rounded-lg p-3 text-black focus:ring-2 focus:ring-green-500"
                      placeholder="Journal name"
                      value={newJournal}
                      onChange={(e) => setNewJournal(e.target.value)}
                    />
                    <button
                      className="text-green-600 font-bold py-2 px-4 rounded-lg transition"
                      onClick={handleAddJournal}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <button
                  className="text-green-600 font-bold py-2 px-4 rounded-lg transition"
                  onClick={() => setShowAddSection(!showAddSection)}
                >
                  {showAddSection ? "Remove Add Section" : "+ Add New Journal"}
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleStartResearch}
              className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : "+ Start Research"}
            </button>
          </div>
          {loading && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg flex flex-col items-center">
                <p className="text-gray-900 text-lg font-semibold">Analyzing data, please wait...</p>
                <FaSpinner className="animate-spin text-teal-500 text-4xl mt-4" />
              </div>
            </div>
          )}
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
              <div className="text-gray-800 whitespace-pre-wrap">
                <p><strong>Influencer Name:</strong> {researchResults.influencerName}</p>
                <p><strong>Category:</strong> {researchResults.category}</p>
                <p><strong>Trust Score:</strong> {researchResults.trustScore}</p>
                <p><strong>Trend:</strong> {researchResults.trend}</p>
                <p><strong>Estimated Followers:</strong> {researchResults.estimatedFollowers}</p>
                <p><strong>Claims to Analyze:</strong> {researchResults.claimsToAnalyze}</p>
                <p><strong>Time Range:</strong> {researchResults.timeRange}</p>
                <p><strong>Include Revenue Analysis:</strong> {researchResults.includeRevenueAnalysis ? 'Yes' : 'No'}</p>
                <p><strong>Verify with Journals:</strong> {researchResults.verifyWithJournals ? 'Yes' : 'No'}</p>
                <p><strong>Scientific Journals:</strong> {Object.keys(researchResults.scientificJournals).filter(journal => researchResults.scientificJournals[journal]).join(", ")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchTasks;