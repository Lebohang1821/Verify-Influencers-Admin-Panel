import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InfluencerDetail = () => {
  const { influencerName } = useParams();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      const response = await fetch(`http://localhost:3000/api/claims?influencer=${influencerName}`);
      const data = await response.json();
      setClaims(data);
    };
    fetchClaims();
  }, [influencerName]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{influencerName}</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-left text-gray-900">Claim</th>
                <th className="py-2 text-left text-gray-900">Category</th>
                <th className="py-2 text-left text-gray-900">Status</th>
                <th className="py-2 text-left text-gray-900">Trust Score</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{claim.text}</td>
                  <td className="py-2">{claim.category}</td>
                  <td className="py-2">{claim.status}</td>
                  <td className="py-2">{claim.trustScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetail;
