import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await axios.get("http://localhost:3000/api/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    }
    fetchSummary();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {summary ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">Total Influencers</h2>
            <p className="text-3xl">{summary.totalInfluencers}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">Total Claims</h2>
            <p className="text-3xl">{summary.totalClaims}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">Verified Claims</h2>
            <p className="text-3xl">{summary.verifiedClaims}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="mt-6">
        <Link to="/research-tasks">
          <button className="bg-teal-400 text-white px-4 py-2 rounded-lg hover:bg-teal-500">
            Research Tasks
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
