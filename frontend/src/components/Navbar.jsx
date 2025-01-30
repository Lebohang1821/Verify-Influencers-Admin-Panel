import React, { useState } from "react";
import { User, CheckCircle, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname); // Track the active tab

  const tabs = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/monetization", label: "Monetization" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleTabClick = (href) => {
    setActiveTab(href);
    window.location.href = href; // Change the tab
  };

  return (
    <nav className="bg-gradient-to-b from-green-50 to-green-100 p-4 shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-bold text-teal-600 hover:text-teal-700 transition"
        >
          <CheckCircle size={24} className="text-teal-600" />
          <span>VerifyInfluencers</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {tabs.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(link.href);
              }}
              className={`py-2 px-3 font-medium transition ${
                activeTab === link.href
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Profile and Hamburger Menu */}
        <div className="flex items-center space-x-4">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-full bg-teal-600 hover:bg-teal-700 transition"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <User size={24} className="text-white" />
              <span className="hidden lg:inline text-white font-medium">Profile</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 lg:hidden transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white shadow-md lg:hidden animate-slideDown">
          {tabs.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(link.href);
                setIsMenuOpen(false);
              }}
              className={`block py-3 px-4 transition ${
                activeTab === link.href
                  ? "text-teal-600 font-medium bg-teal-50"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
