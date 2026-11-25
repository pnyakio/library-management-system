
import { useEffect, useState } from "react";
import api from "../services/api.js";
import BookGrid from "../components/BookGrid.jsx";
import SearchBar from "../components/SearchBar.jsx";
import GenreFilter from "../components/GenreFilter.jsx";

function HomePage() {
  const [search, setSearch] = useState("");
  const [genreId, setGenreId] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get("/genres");
        setGenres(response.data);
      } catch (error) {
        console.error("Unable to load genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Library Management System
      </h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <SearchBar onSearch={setSearch} />

        <GenreFilter
          genres={genres}
          selectedGenre={genreId}
          onGenreChange={setGenreId}
        />
      </div>

      <BookGrid genreId={genreId} search={search} />
    </main>
  );
}

export default HomePage;
