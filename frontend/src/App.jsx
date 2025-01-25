import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import InfluencerDetails from "./components/InfluencerDetails";
import ResearchConfig from "./components/ResearchConfig";
import ResearchTasks from "./components/ResearchTasks";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-blue-700 p-4">
          <nav className="container mx-auto flex justify-between">
            <Link to="/" className="text-lg font-bold">Verify Influencers</Link>
            <div>
              <Link to="/leaderboard" className="mr-4 hover:underline">Leaderboard</Link>
              <Link to="/research-tasks" className="hover:underline">Research Tasks</Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-6 px-4">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/influencer/:id" component={InfluencerDetails} />
            <Route path="/research-config" component={ResearchConfig} />
            <Route path="/research-tasks" component={ResearchTasks} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
