
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api.js";

function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/books/${id}`);
        setBook(response.data.data ?? response.data);
      } catch (err) {
        setError("Unable to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Books
      </Link>

      <h1 className="mt-6 text-3xl font-bold">{book.title}</h1>

      <p className="mt-2">Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Total Copies: {book.totalCopies}</p>
      <p>Available Copies: {book.availableCopies}</p>
      <p>Genre: {book.genre?.name || "Not specified"}</p>
    </main>
  );
}

export default BookDetail;
