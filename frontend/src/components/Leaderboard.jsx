import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [influencers, setInfluencers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/influencers');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setInfluencers(data);
      } catch (error) {
        console.error("Error fetching influencers:", error);
        setError("Failed to fetch influencers. Please try again later.");
      }
    };
    fetchInfluencers();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Leaderboard</h1>
        {error ? (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold border-b">Influencer</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold border-b">Followers</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold border-b">Engagement</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold border-b">Uploads</th>
                </tr>
              </thead>
              <tbody>
                {influencers.map((influencer, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      <Link to={`/influencer/${influencer.id}`} className="text-teal-500 hover:underline">
                        {influencer.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-700 border-b">{influencer.followers.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-700 border-b">{influencer.engagement}%</td>
                    <td className="py-3 px-4 text-gray-700 border-b">{influencer.uploads.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
