import React, { useState } from "react";

function ResearchConfig() {
  const [config, setConfig] = useState({
    dateRange: "",
    claimLimit: "",
    journals: "",
    apiKey: "",
    openAiApiKey: "",
    perplexityApiKey: "", // Added Perplexity API Key
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Configuration Submitted:", config);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <form
          className="bg-white p-6 shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold mb-6">Research Configuration</h1>
          <label className="block mb-4">
            Date Range:
            <input
              type="text"
              className="border p-2 w-full text-gray-800 rounded-lg"
              placeholder="e.g., 2023-01-01 to 2023-12-31"
              value={config.dateRange}
              onChange={(e) =>
                setConfig({ ...config, dateRange: e.target.value })
              }
            />
          </label>
          <label className="block mb-4">
            Claim Limit:
            <input
              type="number"
              className="border p-2 w-full text-gray-800 rounded-lg"
              value={config.claimLimit}
              onChange={(e) =>
                setConfig({ ...config, claimLimit: e.target.value })
              }
            />
          </label>
          <label className="block mb-4">
            Journals:
            <input
              type="text"
              className="border p-2 w-full text-gray-800 rounded-lg"
              placeholder="Comma-separated journal names"
              value={config.journals}
              onChange={(e) =>
                setConfig({ ...config, journals: e.target.value })
              }
            />
          </label>
          <label className="block mb-4">
            API Key:
            <input
              type="text"
              className="border p-2 w-full text-gray-800 rounded-lg"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            />
          </label>
          <label className="block mb-4">
            OpenAI API Key:
            <input
              type="text"
              className="border p-2 w-full text-gray-800 rounded-lg"
              value={config.openAiApiKey}
              onChange={(e) =>
                setConfig({ ...config, openAiApiKey: e.target.value })
              }
            />
          </label>
          <label className="block mb-4">
            Perplexity API Key: {/* Added Perplexity API Key input */}
            <input
              type="text"
              className="border p-2 w-full text-gray-800 rounded-lg"
              value={config.perplexityApiKey}
              onChange={(e) =>
                setConfig({ ...config, perplexityApiKey: e.target.value })
              }
            />
          </label>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResearchConfig;
