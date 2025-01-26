import React from 'react';
import Chart from 'chart.js/auto';

const InfluencerStats = ({ influencer }) => {
  const { name, trustScore, followerCount, claims } = influencer;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p>Trust Score: {trustScore}</p>
      <p>Follower Count: {followerCount}</p>
      <h3 className="text-xl font-bold mt-4">Claims</h3>
      <ul>
        {claims.map((claim, index) => (
          <li key={index}>{claim}</li>
        ))}
      </ul>
      <canvas id="trustScoreChart"></canvas>
    </div>
  );
};

export default InfluencerStats;
