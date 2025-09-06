import React from "react";

function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/placeholder.png";

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-32 h-40 object-cover mb-3 rounded"
      />
      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-gray-400">
        {book.author_name?.[0] || "Unknown Author"}
      </p>
      <p className="text-gray-500 text-sm">
        {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
}

export default BookCard;
