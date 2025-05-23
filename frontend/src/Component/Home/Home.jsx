import { useState, useEffect } from "react";
import axios from "axios";
import ImageSlider from "../BookSlider/index";
import { Link } from "react-router";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/book");
        setBooks(res.data || []);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  const handleSaved = async (bookId) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/book/savedBook/${bookId}`,
        {},
        {
          withCredentials: true,
        }
      );
      alert("Book saved successfully!");
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book.");
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div>
        <ImageSlider />
      </div>

      <div className="flex flex-col items-center justify-center text-center h-[400px] w-full">
        <div className="flex justify-center">
          <img src="logo1.png" alt="Logo" className="h-40 w-40" />
        </div>
        <h1 className="text-6xl font-bold text-cyan-400">BooꓘMate</h1>
        <h2 className="text-2xl text-[2vmax] font-bold mt-2">
          A Perfect Platform For Books..
        </h2>

        <div className="flex gap-4 mt-6">
          <button className="bg-cyan-400 text-black font-medium px-10 py-2 rounded-full border-2 border-gray-600 hover:scale-110 transition">
            Subscribe
          </button>
          <button className="bg-gray-700 text-white font-medium px-10 py-2 rounded-full border-2 border-gray-600 hover:scale-110 transition">
            5-Days Trial
          </button>
        </div>
      </div>

      <div className="bg-gray-700 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Books</h1>

        <div className="flex flex-wrap justify-center gap-6">
          {loading ? (
            <p className="text-center text-cyan-300 text-xl font-medium">
              Loading books...
            </p>
          ) : books.length > 0 ? (
            books.map((book, index) => (
              <div
                key={book._id || index}
                className="relative bg-gray-800 rounded-2xl shadow-lg overflow-hidden w-72 transform hover:scale-105 transition duration-300"
              >
                <div
                  onClick={() => handleSaved(book._id)}
                  className="absolute top-3 right-3 bg-cyan-400 hover:bg-cyan-300 text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md transition cursor-pointer"
                  title="Save Book"
                >
                  +
                </div>
                <img
                  src={book.bookImage || "/placeholder-book.png"}
                  alt={book.bookName}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-cyan-400 mb-1">
                    {book.bookName}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    by {book.bookAuthorName}
                  </p>
                  <p className="text-sm text-gray-300 mb-2">
                    in Year {book.publishedYear}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">#{index + 1}</span>
                    <Link
                      to={`/viewBook/${encodeURIComponent(book.bookLink)}`}
                      className="bg-cyan-400 text-black px-4 py-1 text-sm rounded-full hover:bg-cyan-300 transition"
                    >
                      Read Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No books available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
