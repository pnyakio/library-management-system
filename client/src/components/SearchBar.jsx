import { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <input
  type="text"
  placeholder="Search by book title or author..."
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
/>
  );
}

export default SearchBar;