import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import InfluencerDetails from "./components/InfluencerDetails";
import ResearchConfig from "./components/ResearchConfig";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <Link to="/" className="font-bold text-lg">Verify Influencers</Link>
            <div>
              <Link to="/leaderboard" className="mr-4 hover:underline">Leaderboard</Link>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/influencer/:id" element={<InfluencerDetails />} />
            <Route path="/research-config" element={<ResearchConfig />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
