import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold text-teal-400">VerifyInfluencers</div>
        <div className="flex space-x-4">
          <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
          <a href="/leaderboard" className="hover:text-gray-300">Leaderboard</a>
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
          <a href="/logout" className="hover:text-gray-300">Sign Out</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
