import React from "react";

function SearchBar({ query, setQuery, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center bg-gray-800 rounded-full px-6 py-4 shadow-lg">
        <svg 
          className="w-5 h-5 text-gray-400 mr-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search books by title..."
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-xl w-full"
        />
      </div>
    </div>
  );
}

export default SearchBar;