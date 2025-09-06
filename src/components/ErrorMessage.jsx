import React from "react";

function ErrorMessage({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-2xl">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-bold mb-2">Oops! Something went wrong.</h2>
      <p className="text-gray-400 mb-3">
        We couldn’t fetch the results for your search. Please try again.
      </p>
      <button onClick={onRetry} className="bg-green-600 px-4 py-2 rounded-full">
        Retry Search
      </button>
    </div>
  );
}

export default ErrorMessage;
