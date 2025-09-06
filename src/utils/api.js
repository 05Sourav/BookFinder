// API utility function
export async function fetchBooks(query) {
  const response = await fetch(
    `https://openlibrary.org/search.json?title=${query}`
  );
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}
