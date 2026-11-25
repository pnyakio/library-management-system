
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <article className="rounded-lg border border-gray-200 p-5 shadow-sm">
      <h2 className="text-xl font-semibold">{book.title}</h2>

      <p className="mt-2 text-gray-600">
        Author: {book.author}
      </p>

      <p className="mt-1 text-gray-600">
        Genre: {book.genre?.name}
      </p>

      <Link
        to={`/books/${book.id}`}
        className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        View Details
      </Link>
    </article>
  );
}

export default BookCard;
