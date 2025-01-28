import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import InfluencerDetails from "./components/InfluencerDetails";
import ResearchConfig from "./components/ResearchConfig";
import ResearchTasks from "./components/ResearchTasks";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact"; // Import Contact component
import About from "./components/About"; // Import About component
import Monetization from "./components/Monetization"; // Import Monetization component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        {/* Main Content */}
        <main className="container mx-auto py-6 px-4">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/influencer/:id" component={InfluencerDetails} />
            <Route path="/research-config" component={ResearchConfig} />
            <Route path="/research-tasks" component={ResearchTasks} />
            <Route path="/contact" component={Contact} /> {/* Add Contact route */}
            <Route path="/about" component={About} /> {/* Add About route */}
            <Route path="/monetization" component={Monetization} /> {/* Add Monetization route */}
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
