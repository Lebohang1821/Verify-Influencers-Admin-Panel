import React, { useState } from "react";

function ResearchConfig() {
  const [config, setConfig] = useState({
    dateRange: "",
    claimLimit: 10,
    journals: "",
    apiKey: "",
    openAiApiKey: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Configuration Submitted:", config);
  };

  return (
    <form className="bg-white p-6 shadow rounded-lg" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Research Configuration</h1>
      <label className="block mb-2">
        Date Range:
        <input
          type="text"
          className="border p-2 w-full text-gray-800"
          placeholder="e.g., 2023-01-01 to 2023-12-31"
          value={config.dateRange}
          onChange={(e) => setConfig({ ...config, dateRange: e.target.value })}
        />
      </label>
      <label className="block mb-2">
        Claim Limit:
        <input
          type="number"
          className="border p-2 w-full text-gray-800"
          value={config.claimLimit}
          onChange={(e) => setConfig({ ...config, claimLimit: e.target.value })}
        />
      </label>
      <label className="block mb-2">
        Journals:
        <input
          type="text"
          className="border p-2 w-full text-gray-800"
          placeholder="Comma-separated journal names"
          value={config.journals}
          onChange={(e) => setConfig({ ...config, journals: e.target.value })}
        />
      </label>
      <label className="block mb-2">
        API Key:
        <input
          type="text"
          className="border p-2 w-full text-gray-800"
          value={config.apiKey}
          onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
        />
      </label>
      <label className="block mb-2">
        OpenAI API Key:
        <input
          type="text"
          className="border p-2 w-full text-gray-800"
          value={config.openAiApiKey}
          onChange={(e) => setConfig({ ...config, openAiApiKey: e.target.value })}
        />
      </label>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">
        Save Configuration
      </button>
    </form>
  );
}

export default ResearchConfig;
