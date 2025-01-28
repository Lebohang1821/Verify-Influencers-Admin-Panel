import React, { useState } from "react";
import { User, CheckCircle, Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/dashboard"); // Track the active tab

  const handleTabClick = (href) => {
    setActiveTab(href);
    // Optional: Uncomment this if you are not using React Router and need to navigate.
    // window.location.href = href;
  };

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center space-x-2 text-xl font-bold text-teal-600 hover:text-teal-700 transition"
        >
          <CheckCircle size={24} className="text-teal-600" />
          <span>VerifyInfluencers</span>
        </a>

        {/* Tabs as Modern Horizontal Pills */}
        <div className="hidden lg:flex items-center space-x-4">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/leaderboard", label: "Leaderboard" },
            { href: "/monetization", label: "Monetization" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <a
              key={link.href}
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                handleTabClick(link.href);
              }}
              className={`py-2 px-4 rounded-full font-medium transition ${
                activeTab === link.href
                  ? "bg-teal-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Profile and Search Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <Search size={24} className="text-gray-700" />
          </button>

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
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                >
                  Settings
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                >
                  Sign Out
                </a>
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
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/leaderboard", label: "Leaderboard" },
            { href: "/monetization", label: "Monetization" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <a
              key={link.href}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(link.href);
                setIsMenuOpen(false); // Close the menu
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
