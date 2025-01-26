import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 text-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 text-lg font-bold text-teal-600">
          <span className="inline-block w-5 h-5 bg-teal-600 rounded-full"></span>
          <span>VerifyInfluencers</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/dashboard"
            className="py-2 px-3 hover:text-teal-600 transition"
          >
            Dashboard
          </a>
          <a
            href="/leaderboard"
            className="py-2 px-3 hover:text-teal-600 transition"
          >
            Leaderboard
          </a>
          <a
            href="/monetization"
            className="py-2 px-3 hover:text-teal-600 transition"
          >
            Monetization
          </a>
          <a
            href="/about"
            className="py-2 px-3 hover:text-teal-600 transition"
          >
            About
          </a>
          <a
            href="/contact"
            className="py-2 px-3 hover:text-teal-600 transition"
          >
            Contact
          </a>
          <a
            href="/logout"
            className="py-2 px-3 flex items-center space-x-1 hover:text-teal-600 transition"
          >
            <span>Sign Out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
              />
            </svg>
          </a>
          <button className="p-2 rounded-full bg-teal-600 hover:bg-teal-700 transition">
            <User size={20} className="text-white" />
          </button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-16 left-0 w-full bg-gray-100 md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <a
            href="/dashboard"
            className="block py-2 px-4 hover:text-teal-600 transition"
          >
            Dashboard
          </a>
          <a
            href="/leaderboard"
            className="block py-2 px-4 hover:text-teal-600 transition"
          >
            Leaderboard
          </a>
          <a
            href="/monetization"
            className="block py-2 px-4 hover:text-teal-600 transition"
          >
            Monetization
          </a>
          <a
            href="/about"
            className="block py-2 px-4 hover:text-teal-600 transition"
          >
            About
          </a>
          <a
            href="/contact"
            className="block py-2 px-4 hover:text-teal-600 transition"
          >
            Contact
          </a>
          <a
            href="/logout"
            className="block py-2 px-4 flex items-center space-x-1 hover:text-teal-600 transition"
          >
            <span>Sign Out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
