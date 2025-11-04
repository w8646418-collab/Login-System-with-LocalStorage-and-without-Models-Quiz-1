import React, { useState } from "react";

const HashtagPlanner = () => {
  const [keyword, setKeyword] = useState("");
  const [hashtags, setHashtags] = useState([]);

  const generateHashtags = () => {
    if (!keyword.trim()) {
      alert("⚠️ Please enter a keyword first!");
      return;
    }

    // Simple demo hashtags (you can later replace with API-based generation)
    const suggestions = [
      `#${keyword}`,
      `#${keyword}Life`,
      `#${keyword}Goals`,
      `#${keyword}Daily`,
      `#${keyword}Lovers`,
      `#${keyword}Community`,
      `#${keyword}Inspiration`,
      `#${keyword}Vibes`,
      `#${keyword}Trends`,
      `#${keyword}2025`,
    ];

    setHashtags(suggestions);
  };

  const copyToClipboard = () => {
    if (hashtags.length === 0) return;
    navigator.clipboard.writeText(hashtags.join(" "));
    alert("✅ Hashtags copied to clipboard!");
  };

  return (
<section className="min-h-screen bg-gradient-to-br from-purple-300 via-purple-100 to-yellow-300 text-gray-800 py-10 px-6 mt-23">
      <div className="max-w-4xl mx-auto text-center pt-15 pb-15">
        {/* Page Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-10">
          🏷 Hashtag Planner
        </h1>

        {/* Input Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mt-15 mb-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">
            Generate Hashtags
          </h2>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="Enter a keyword (e.g., fashion, travel)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
              onClick={generateHashtags}
              className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Hashtag Results */}
        {hashtags.length > 0 && (
          <div className="bg-white shadow-md rounded-2xl p-6 text-left">
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">
              Suggested Hashtags 
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={copyToClipboard}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
            >
              Copy All Hashtags
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default HashtagPlanner;
