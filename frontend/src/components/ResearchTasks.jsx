import React from "react";

const ResearchTasks = () => {
  return (
    <div className="min-h-screen bg-darkBg text-darkText p-6">
      {/* Header */}
      <header className="mb-6">
        <a href="/dashboard" className="text-darkAccent hover:underline">
          &larr; Back to Dashboard
        </a>
        <h1 className="text-2xl font-bold mt-2">Research Tasks</h1>
      </header>

      {/* Form */}
      <form className="bg-darkCard p-6 rounded-xl shadow-lg space-y-6">
        {/* Tabs */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="flex-1 p-3 rounded-lg bg-darkAccent text-white text-center font-semibold"
          >
            Specific Influencer
          </button>
          <button
            type="button"
            className="flex-1 p-3 rounded-lg bg-darkCard text-darkText text-center border border-borderGray hover:bg-borderGray"
          >
            Discover New
          </button>
        </div>

        {/* Time Range */}
        <div>
          <h2 className="text-lg font-medium">Time Range</h2>
          <div className="flex items-center space-x-4 mt-2">
            {["Last Week", "Last Month", "Last Year", "All Time"].map((label) => (
              <button
                key={label}
                className={`flex-1 py-2 rounded-lg ${
                  label === "Last Month"
                    ? "bg-darkAccent text-white"
                    : "bg-darkCard border border-borderGray text-darkText hover:bg-borderGray"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Influencer Input */}
        <div>
          <label htmlFor="influencerName" className="block text-sm font-medium">
            Influencer Name
          </label>
          <input
            type="text"
            id="influencerName"
            placeholder="Enter influencer name"
            className="w-full mt-2 p-3 rounded-lg bg-darkBg border border-borderGray text-darkText"
          />
        </div>

        {/* Claims and Products */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="claims" className="block text-sm font-medium">
              Claims to Analyze Per Influencer
            </label>
            <input
              type="number"
              id="claims"
              placeholder="50"
              className="w-full mt-2 p-3 rounded-lg bg-darkBg border border-borderGray text-darkText"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="products" className="block text-sm font-medium">
              Products to Find Per Influencer
            </label>
            <input
              type="number"
              id="products"
              placeholder="10"
              className="w-full mt-2 p-3 rounded-lg bg-darkBg border border-borderGray text-darkText"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="revenue" className="toggle-checkbox" />
            <label htmlFor="revenue" className="text-sm">
              Include Revenue Analysis
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="verify" className="toggle-checkbox" />
            <label htmlFor="verify" className="text-sm">
              Verify with Scientific Journals
            </label>
          </div>
        </div>

        {/* Journals */}
        <div>
          <h2 className="text-lg font-medium">Scientific Journals</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {[
              "PubMed Central",
              "Nature",
              "Science",
              "Cell",
              "The Lancet",
              "New England Journal of Medicine",
              "JAMA Network",
            ].map((journal) => (
              <button
                key={journal}
                className="py-2 px-4 rounded-lg bg-darkCard border border-borderGray hover:bg-borderGray text-darkText text-left"
              >
                {journal}
              </button>
            ))}
            <button className="py-2 px-4 rounded-lg bg-darkAccent text-white text-left">
              + Add New Journal
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium">
            Notes for Research Assistant
          </label>
          <textarea
            id="notes"
            placeholder="Add any specific instructions or focus areas..."
            className="w-full mt-2 p-3 rounded-lg bg-darkBg border border-borderGray text-darkText"
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-3 bg-darkAccent text-white rounded-lg font-semibold hover:bg-indigo-700"
          >
            + Start Research
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResearchTasks;
