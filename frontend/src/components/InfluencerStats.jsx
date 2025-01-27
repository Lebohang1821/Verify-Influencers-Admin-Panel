import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const InfluencerStats = ({ influencer }) => {
  const { name, trustScore, followerCount, claims, estimatedFollowers, claimsToAnalyze, timeRange, includeRevenueAnalysis, verifyWithJournals } = influencer;
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Trust Score', 'Follower Count', 'Estimated Followers', 'Claims to Analyze'],
        datasets: [
          {
            label: 'Statistics',
            data: [trustScore, followerCount, estimatedFollowers, claimsToAnalyze],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [trustScore, followerCount, estimatedFollowers, claimsToAnalyze]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p>Trust Score: {trustScore}</p>
      <p>Follower Count: {followerCount}</p>
      <p>Estimated Followers: {estimatedFollowers}</p>
      <p>Claims to Analyze: {claimsToAnalyze}</p>
      <p>Time Range: {timeRange}</p>
      <p>Include Revenue Analysis: {includeRevenueAnalysis ? 'Yes' : 'No'}</p>
      <p>Verify with Journals: {verifyWithJournals ? 'Yes' : 'No'}</p>
      <h3 className="text-xl font-bold mt-4">Claims</h3>
      <ul>
        {claims.map((claim, index) => (
          <li key={index}>{claim}</li>
        ))}
      </ul>
      <canvas ref={chartRef} id="trustScoreChart"></canvas>
    </div>
  );
};

export default InfluencerStats;
