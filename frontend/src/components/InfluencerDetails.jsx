import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Search, BarChart, DollarSign, User, Package } from "lucide-react";
import profileImage from "./pictures/images.jpg"; // Import the image

const InfluencerDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("claims");

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 p-6 bg-white rounded-lg shadow-lg">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-full w-20 h-20 border-2 border-teal-500 mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">Michelle Lewin</h1>
            <p className="text-gray-600">Health, Fitness</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg text-center shadow-lg">
            <BarChart size={24} className="mx-auto text-teal-400" />
            <p className="text-lg font-semibold mt-2 text-gray-900">62%</p>
            <p className="text-gray-600 text-sm">Trust Score</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-lg">
            <DollarSign size={24} className="mx-auto text-green-400" />
            <p className="text-lg font-semibold mt-2 text-gray-900">2</p>
            <p className="text-gray-600 text-sm">Verified Claims</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-lg">
            <Package size={24} className="mx-auto text-blue-400" />
            <p className="text-lg font-semibold mt-2 text-gray-900">1</p>
            <p className="text-gray-600 text-sm">Recommended Products</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-lg">
            <User size={24} className="mx-auto text-purple-400" />
            <p className="text-lg font-semibold mt-2 text-gray-900">16M</p>
            <p className="text-gray-600 text-sm">Followers</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center sm:justify-start mt-8 space-x-0 sm:space-x-6 border-b border-gray-300 pb-2">
          {[
            { id: "claims", label: "Claims Analysis" },
            { id: "products", label: "Recommended Products" },
            { id: "monetization", label: "Monetization" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`text-lg pb-2 font-medium transition ${
                activeTab === tab.id
                  ? "border-b-2 border-teal-400 text-teal-400"
                  : "text-gray-600 hover:text-teal-300"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "claims" && (
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Latest Verified Claims</h2>
              <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search claims..."
                  className="bg-transparent ml-2 outline-none text-gray-700 w-full"
                />
              </div>
              <p className="mt-4 text-gray-600">Showing latest claims with analysis.</p>
              <table className="table-auto w-full bg-white shadow rounded-lg mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-gray-900">Claim</th>
                    <th className="p-2 text-gray-900">Verification Status</th>
                    <th className="p-2 text-gray-900">Confidence Score</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Data will be dynamically loaded here */}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "products" && (
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Recommended Products</h2>
              <p className="text-gray-600">No recommended products available.</p>
            </div>
          )}
          {activeTab === "monetization" && (
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Monetization Insights</h2>
              <p className="text-gray-600">Revenue trends and growth strategies.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetails;
