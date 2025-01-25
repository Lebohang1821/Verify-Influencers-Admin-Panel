import React from 'react';
import { useParams } from 'react-router-dom';

function InfluencerDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Influencer Details</h1>
      <p>Details for influencer ID: {id}</p>
      <table className="table-auto w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Claim</th>
            <th className="p-2">Verification Status</th>
            <th className="p-2">Confidence Score</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Data */}
          <tr className="border-t">
            <td className="p-2">Vitamin C cures colds</td>
            <td className="p-2">Debunked</td>
            <td className="p-2">20%</td>
          </tr>
          <tr className="border-t">
            <td className="p-2">Omega-3 supports heart health</td>
            <td className="p-2">Verified</td>
            <td className="p-2">85%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InfluencerDetails;
