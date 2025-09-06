import React from "react";

function Loader({ message }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-2xl">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mb-4"></div>
      <p className="text-lg">{message || "Loading..."}</p>
    </div>
  );
}

export default Loader;
