import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2 for nice popups
import AddInfluencerForm from "./AddInfluencerForm"; // Import AddInfluencerForm

const ResearchTasks = () => {
  const [influencerName, setInfluencerName] = useState("");
  const [claimsToAnalyze, setClaimsToAnalyze] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [includeRevenueAnalysis, setIncludeRevenueAnalysis] = useState(false);
  const [verifyWithJournals, setVerifyWithJournals] = useState(false);
  const [researchResults, setResearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // Remove the unused variables 'tweets' and 'setTweets'
  const [scientificJournals, setScientificJournals] = useState({
    "Pubmed Central": false,
    "Nature": false,
    "Science": false,
    "Cell": false,
    "The Lancet": false,
    "New England Journal Of Medicine": false,
    "Jama Network": false,
  });
  const [newJournal, setNewJournal] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [researchConfig, setResearchConfig] = useState("");
  const [newInfluencers, setNewInfluencers] = useState([]);
  const [notes, setNotes] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInfluencerDetails, setNewInfluencerDetails] = useState({
    influencerName: "",
    category: "",
    trustScore: "",
    trend: "",
    estimatedFollowers: "",
    claimsToAnalyze: "",
    timeRange: "",
    includeRevenueAnalysis: false,
    verifyWithJournals: false,
    scientificJournals: {},
    verifiedClaims: "",
  });

  useEffect(() => {
    if (researchConfig === "Discover New") {
      setIncludeRevenueAnalysis(false);
      setVerifyWithJournals(false);
      setTimeRange("");
    } else {
      setInfluencerName("");
      setNewInfluencers([]);
    }
  }, [researchConfig]);

  const fetchNewInfluencers = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://verify-influencers-admin-panel.vercel.app/api/chat/new-influencers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setNewInfluencers(Array.isArray(data.influencers) ? data.influencers : []);
    } catch (error) {
      console.error("Error fetching new influencers:", error.message);
      setError("Failed to fetch new influencers. Please try again later.");
    } finally {
      setLoading(false);
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
      notes,
      includeFacebookFollowers: true, // Add this line
      includeTikTokFollowers: true, // Add this line
    };

    try {
      const response = await fetch("https://verify-influencers-admin-panel.vercel.app/api/chat", {
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

  const handleSaveInfluencer = async () => {
    if (!newInfluencerDetails.influencerName.trim()) {
      setError("Influencer name is required.");
      return;
    }

    try {
      const response = await fetch("https://verify-influencers-admin-panel.vercel.app/api/influencers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInfluencerDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed with status code ${response.status}`
        );
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Influencer details saved successfully! And saved to Leaderboard.',
      });

      setShowAddForm(false);
      setNewInfluencerDetails({
        influencerName: "",
        category: "",
        trustScore: "",
        trend: "",
        estimatedFollowers: "",
        claimsToAnalyze: "",
        timeRange: "",
        includeRevenueAnalysis: false,
        verifyWithJournals: false,
        scientificJournals: {},
        verifiedClaims: "",
      });
    } catch (error) {
      console.error("Error saving influencer details:", error.message);
      setError("Failed to save influencer details. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
          {researchConfig === "Specific Influencer" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
              <input
                type="text"
                placeholder="Enter influencer name"
                value={influencerName}
                onChange={(e) => setInfluencerName(e.target.value)}
                className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              />
              <label className="block mb-4">
                Number of Claims to Analyze:
                <input
                  type="number"
                  placeholder="Claims to analyze"
                  value={claimsToAnalyze}
                  onChange={(e) => setClaimsToAnalyze(Math.min(Number(e.target.value) || 1, 50))}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                  max="50"
                />
              </label>
              <div className="flex flex-col gap-4 items-end mt-6">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
              <label className="block text-sm font-medium text-gray-900 mt-6">
                Notes for Research Assistant
              </label>
              <textarea
                className="w-full mt-2 p-3 bg-transparent border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Add any specific instructions or focus areas..."
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleStartResearch}
                  className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300"
                  disabled={loading}
                >
                  {loading ? <FaSpinner className="animate-spin" /> : "+ Start Research"}
                </button>
              </div>
            </div>
          )}
          {researchConfig === "Discover New" && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mt-6">
                Notes for Research Assistant
              </label>
              <textarea
                className="w-full mt-2 p-3 bg-transparent border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Add any specific instructions or focus areas..."
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300 mb-4"
                  onClick={fetchNewInfluencers}
                >
                  Discover
                </button>
              </div>
              {newInfluencers.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">New Influencers</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {newInfluencers.map((influencer, index) => (
                      <li key={index}>{influencer}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {loading && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg flex flex-col items-center">
                <p className="text-gray-900 text-lg font-semibold">Analyzing data, please wait...</p>
                <FaSpinner className="animate-spin text-teal-500 text-4xl mt-4" />
              </div>
            </div>
          )}
          {error && !showAddForm && (
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
                <p>{researchResults.previewParagraph}</p> {/* Show extracted content as it is */}
                <p>{researchResults.fullContent.replace(/[*#]/g, '')}</p> {/* Show full content without ** and # */}
              </div>
            </div>
          )}
          {newInfluencers.length > 0 && researchConfig === "Discover New" && (
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                New Influencers
              </h2>
              <ul className="list-disc list-inside text-gray-800">
                {newInfluencers.map((influencer, index) => (
                  <li key={index}>{influencer}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6">
            <button
              className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300 mb-4"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Cancel" : "Add New Influencer"}
            </button>
            {showAddForm && (
              <AddInfluencerForm
                newInfluencerDetails={newInfluencerDetails}
                setNewInfluencerDetails={setNewInfluencerDetails}
                handleSaveInfluencer={handleSaveInfluencer}
                error={error}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchTasks;