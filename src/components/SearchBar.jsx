import React, { useState, useEffect, useRef } from "react";

function SearchBar({ query, setQuery, onSearch }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchBarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setShowHistory(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Add to search history (avoid duplicates and limit to 5 recent searches)
      const newHistory = [query.trim(), ...searchHistory.filter(item => item !== query.trim())].slice(0, 5);
      setSearchHistory(newHistory);
      setShowHistory(false);
      onSearch();
    }
  };

  const handleHistoryClick = (historyItem) => {
    setQuery(historyItem);
    setShowHistory(false);
    // Trigger search immediately when clicking on history item
    if (onSearch) {
      onSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowHistory(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchHistory.length > 0 && !query) {
      setShowHistory(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding history to allow for clicks
    setTimeout(() => setShowHistory(false), 200);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Show filtered history when typing
    if (value.trim() && searchHistory.length > 0) {
      setShowHistory(true);
    } else if (!value.trim() && searchHistory.length > 0) {
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
  };

  // Filter search history based on current query
  const filteredHistory = searchHistory.filter(item => 
    item.toLowerCase().includes(query.toLowerCase()) && item !== query
  );

  return (
    <div className="w-full max-w-4xl relative" ref={searchBarRef}>
      <div className="flex items-center bg-gray-800 rounded-full px-8 py-5 shadow-lg w-full">
        <svg 
          className="w-6 h-6 text-gray-400 mr-5" 
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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search books by title..."
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-xl w-full"
        />
        
        {/* Clear Button */}
        {query && (
          <button
            onClick={clearSearch}
            className="ml-3 p-1 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search History Dropdown */}
      {showHistory && (query ? filteredHistory.length > 0 : searchHistory.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 max-h-64 overflow-y-auto">
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm font-medium">Recent Searches</span>
              {searchHistory.length > 0 && (
                <button
                  onClick={() => {
                    setSearchHistory([]);
                    setShowHistory(false);
                  }}
                  className="text-gray-500 hover:text-gray-300 text-xs"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
          <div className="py-2">
            {(query ? filteredHistory : searchHistory).map((item, index) => (
              <button
                key={index}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur
                  handleHistoryClick(item);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleHistoryClick(item);
                }}
                className="w-full px-4 py-3 text-left text-gray-200 hover:bg-gray-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="flex-1">{item}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;