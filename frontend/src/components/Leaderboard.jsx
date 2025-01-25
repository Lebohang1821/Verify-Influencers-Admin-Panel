import React from 'react';

function Leaderboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <table className="table-auto w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Rank</th>
            <th className="p-2">Influencer</th>
            <th className="p-2">Trust Score</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Data */}
          <tr className="border-t">
            <td className="p-2">1</td>
            <td className="p-2">@healthguru</td>
            <td className="p-2">95</td>
          </tr>
          <tr className="border-t">
            <td className="p-2">2</td>
            <td className="p-2">@wellnessqueen</td>
            <td className="p-2">90</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
