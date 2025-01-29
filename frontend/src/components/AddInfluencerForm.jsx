import React from "react";

const AddInfluencerForm = ({ newInfluencerDetails, setNewInfluencerDetails, handleSaveInfluencer, error }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-black">Add New Influencer</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Influencer Name"
          value={newInfluencerDetails.influencerName}
          onChange={(e) => setNewInfluencerDetails({ ...newInfluencerDetails, influencerName: e.target.value })}
          className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
        />
        <input
          type="text"
          placeholder="Category"
          value={newInfluencerDetails.category}
          onChange={(e) => setNewInfluencerDetails({ ...newInfluencerDetails, category: e.target.value })}
          className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
        />
        <input
          type="number"
          placeholder="Trust Score"
          value={newInfluencerDetails.trustScore}
          onChange={(e) => setNewInfluencerDetails({ ...newInfluencerDetails, trustScore: e.target.value })}
          className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
        />
        <input
          type="text"
          placeholder="Trend"
          value={newInfluencerDetails.trend}
          onChange={(e) => setNewInfluencerDetails({ ...newInfluencerDetails, trend: e.target.value })}
          className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
        />
        <input
          type="number"
          placeholder="Estimated Followers"
          value={newInfluencerDetails.estimatedFollowers}
          onChange={(e) => setNewInfluencerDetails({ ...newInfluencerDetails, estimatedFollowers: e.target.value })}
          className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
        />
        <input
          type="text"
          placeholder="Time Range"
          value={newInfluencerDetails.timeRange}
          onChange={(e) => setNewInfluencerDetails({ ...newInfluencerDetails, timeRange: e.target.value })}
          className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
        />
        <label className="inline-flex items-center justify-between w-full text-black">
          <span className="ml-2">Include Revenue Analysis</span>
          <div
            className={`relative w-12 h-6 flex items-center bg-gray-700 rounded-full cursor-pointer transition-all ${
              newInfluencerDetails.includeRevenueAnalysis ? "bg-green-500" : "bg-gray-700"
            }`}
            onClick={() => setNewInfluencerDetails({ ...newInfluencerDetails, includeRevenueAnalysis: !newInfluencerDetails.includeRevenueAnalysis })}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                newInfluencerDetails.includeRevenueAnalysis ? "translate-x-6" : ""
              }`}
            ></div>
          </div>
        </label>
        <label className="inline-flex items-center justify-between w-full text-black">
          <span className="ml-2">Verified with Journals</span>
          <div
            className={`relative w-12 h-6 flex items-center bg-gray-700 rounded-full cursor-pointer transition-all ${
              newInfluencerDetails.verifyWithJournals ? "bg-green-500" : "bg-gray-700"
            }`}
            onClick={() => setNewInfluencerDetails({ ...newInfluencerDetails, verifyWithJournals: !newInfluencerDetails.verifyWithJournals })}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                newInfluencerDetails.verifyWithJournals ? "translate-x-6" : ""
              }`}
            ></div>
          </div>
        </label>
        <input
          type="text"
          placeholder="Verified Claims"
          value={newInfluencerDetails.verifiedClaims}
          onChange={(e) => setNewInfluencerDetails({ ...newInfluencerDetails, verifiedClaims: e.target.value })}
          className="w-full mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
        />
      </div>
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mt-4">
          {error}
        </div>
      )}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSaveInfluencer}
          className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Save Influencer
        </button>
      </div>
    </div>
  );
};

export default AddInfluencerForm;
