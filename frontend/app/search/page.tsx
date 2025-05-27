"use client";

import React, { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem("searchResults");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = () => {
    const fakeResults = [
      { name: "Alice", location: "TX" },
      { name: "Bob", location: "FL" },
    ];
    setResults(fakeResults);
    localStorage.setItem("searchResults", JSON.stringify(fakeResults));
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Search</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users by value, interest, etc..."
        className="border p-2 w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
      >
        Search
      </button>
      <div className="mt-4 space-y-2">
        {results.map((user: { name: string; location: string }, i: number) => (
          <div key={i} className="border p-4 rounded shadow">
            <p>
              <strong>{user.name}</strong> — {user.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
