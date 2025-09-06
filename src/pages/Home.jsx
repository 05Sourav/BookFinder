import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { fetchBooks } from "../utils/api";

function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const data = await fetchBooks(query);
      setBooks(data.docs || []);
    } catch (err) {
      setError("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        {/* Search Section */}
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          {/* Search Bar */}
          <div className="w-full max-w-4xl mb-8 justify-center flex">
            <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
          </div>

          {/* Welcome Section - Only show when no search has been made */}
          {!searched && !loading && (
            <div className="text-center max-w-2xl">
              {/* Welcome Illustration */}
              <div className="mb-8">
                <div className="w-40 h-48 mx-auto bg-gray-800 rounded-lg flex items-center justify-center mb-6 border-2 border-gray-700">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📚</div>
                    <div className="text-gray-400 text-sm">Welcome illustration</div>
                  </div>
                </div>
              </div>

              {/* Welcome Text */}
              <h1 className="text-3xl font-bold mb-4 text-white">Welcome to Book Finder!</h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Start your journey by searching for a book title. For example, try searching for "The Great Gatsby" to see how it works.
              </p>

              {/* Start Searching Button */}
              <button
                onClick={() => document.querySelector('input').focus()}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium"
              >
                Start Searching
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-10">
              <Loader message={`Searching for "${query}"...`} />
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="mt-10">
              <ErrorMessage onRetry={handleSearch} />
            </div>
          )}

          {/* No Results */}
          {!loading && !error && searched && books.length === 0 && (
            <div className="mt-10">
              <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-2xl">
                <div className="text-4xl mb-4">📖</div>
                <h2 className="text-xl font-semibold mb-2">No Books Found</h2>
                <p className="text-gray-400 mb-4">
                  Try searching for a different title.
                </p>
                <button 
                  onClick={() => {
                    setSearched(false);
                    setQuery("");
                  }}
                  className="bg-green-600 px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  Browse All Books
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {!loading && !error && books.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Search Results</h2>
              <p className="text-gray-400">Found {books.length} books for "{query}"</p>
            </div>
            <BookList books={books} />
          </div>
        )}
      </main>

      <footer className="text-center text-gray-500 py-4">
        © 2025 Book Finder. Powered by Open Library API.
      </footer>
    </div>
  );
}

export default Home;