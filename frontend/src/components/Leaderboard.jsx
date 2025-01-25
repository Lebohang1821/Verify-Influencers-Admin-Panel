import React from "react";

function Leaderboard() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Influencer Trust Leaderboard</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">1,234</h2>
          <p>Active Influencers</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">25,431</h2>
          <p>Claims Verified</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">85.7%</h2>
          <p>Average Trust Score</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-4">
        <button className="bg-blue-600 p-3 rounded-lg">All</button>
        <button className="bg-gray-600 p-3 rounded-lg">Nutrition</button>
        <button className="bg-gray-600 p-3 rounded-lg">Fitness</button>
        <button className="bg-gray-600 p-3 rounded-lg">Medicine</button>
        <button className="bg-gray-600 p-3 rounded-lg">Mental Health</button>
      </div>

      {/* Table */}
      <table className="table-auto w-full bg-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-600">
            <th className="p-3">Rank</th>
            <th className="p-3">Influencer</th>
            <th className="p-3">Category</th>
            <th className="p-3">Trust Score</th>
            <th className="p-3">Trend</th>
            <th className="p-3">Followers</th>
            <th className="p-3">Verified Claims</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">1</td>
            <td className="p-3">Dr. Peter Attia</td>
            <td className="p-3">Medicine</td>
            <td className="p-3 text-green-500">94%</td>
            <td className="p-3">↑</td>
            <td className="p-3">1.2M+</td>
            <td className="p-3">203</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
