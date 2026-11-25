function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <select
    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      value={selectedGenre}
      onChange={(event) => onGenreChange(event.target.value)}
    >
      <option value="">All Genres</option>

      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}

export default GenreFilter;