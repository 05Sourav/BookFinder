import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold flex items-center">📚 Book Finder</h1>
      <nav className="space-x-6 text-gray-300">
        <a href="#" className="hover:text-white">
          Home
        </a>
        <a href="#" className="hover:text-white">
          Browse
        </a>
        <a href="#" className="hover:text-white">
          My Books
        </a>
      </nav>
      {/* Right Section with Notifications and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
            {/* Bell Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3-3V9a6 6 0 10-12 0v5l-3 3h5a6 6 0 1012 0z" />
            </svg>
          </button>
        </div>

        {/* Profile */}
        <button className="p-1 rounded-lg hover:bg-gray-700 transition-colors">
          <img
            src="https://www.gravatar.com/avatar/?d=mp"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
