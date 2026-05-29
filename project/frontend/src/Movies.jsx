import React, { useState, useEffect } from "react";
import "./Movies.css";
import config from "./config";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [movieReviews, setMovieReviews] = useState({});

  // LOAD RECENT MOVIES
  useEffect(() => {
    const recentMovies = localStorage.getItem("recentMovies");

    if (recentMovies) {
      const parsedMovies = JSON.parse(recentMovies);

      // ONLY VALID POSTER MOVIES
      const filteredMovies = parsedMovies.filter((movie) =>
        isValidPoster(movie.Poster)
      );

      setMovies(filteredMovies);
    }
  }, []);

  // VALIDATE POSTER
  const isValidPoster = (poster) => {
    const p = (poster || "").trim();

    return (
      p.length > 0 &&
      p !== "N/A" &&
      p.toLowerCase() !== "null" &&
      p.toLowerCase() !== "undefined" &&
      p.startsWith("http")
    );
  };


  const fetchMovies = async () => {
  if (!search.trim()) {
    setError("Please enter movie name");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    setError("Login required");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await fetch(
      `${config.BASE_URL}/movies/search?title=${search}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      setError("Session expired. Login again.");
      return;
    }

    const data = await response.json();

    const moviesData = Array.isArray(data) ? data : [];

    const filteredMovies = moviesData.filter((m) =>
      m.Poster && m.Poster.startsWith("http")
    );

    setMovies(filteredMovies);

    localStorage.setItem(
      "recentMovies",
      JSON.stringify(filteredMovies)
    );
  } catch (err) {
    setError("Server Error");
  } finally {
    setLoading(false);
  }
};

  // ADD TO FAVORITES
  const addToFavorites = async (movie) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`${config.BASE_URL}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movie_id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
        }),
      });

      alert("Added to favorites");
    } catch (error) {
      alert("Server Error");
    }
  };

  // ADD REVIEW
  const addReview = async () => {
    const token = localStorage.getItem("token");

    if (!review.trim()) {
      return alert("Enter review");
    }

    if (!rating) {
      return alert("Select rating");
    }

    try {
      const response = await fetch(
        `${config.BASE_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movie_id: selectedMovie.imdbID,
            movie_title: selectedMovie.Title,
            movie_poster: selectedMovie.Poster,
            review,
            rating,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        return alert(data.detail || "Failed");
      }

      setMovieReviews((prev) => ({
        ...prev,
        [selectedMovie.imdbID]: {
          review,
          rating,
        },
      }));

      setSelectedMovie(null);
      setReview("");
      setRating(0);

      alert("Review Added");
    } catch (error) {
      alert("Server Error");
    }
  };

  return (
    <div className="container">

      {/* HEADING */}
      <h1 className="heading">
        🎬 Movie Search App
      </h1>

      {/* SEARCH BOX */}
      <div className="searchBox">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && fetchMovies()
          }
          placeholder="Search movies..."
          className="input"
        />

        <button
          onClick={fetchMovies}
          className="searchButton"
        >
          Search
        </button>

      </div>

      {/* LOADING */}
      {loading && <h3>Loading...</h3>}

      {/* ERROR */}
      {error && (
        <h3 className="error">
          {error}
        </h3>
      )}

      {/* EMPTY */}
      {!loading && movies.length === 0 && (
        <h3 className="empty">
          No movies found
        </h3>
      )}

      {/* MOVIES GRID */}
      <div className="grid">

        {movies.map((movie, index) => {

          // ❌ REMOVE INVALID IMAGES
          if (
            !movie.Poster ||
            movie.Poster === "N/A" ||
            movie.Poster === "null" ||
            movie.Poster === "undefined" ||
            !movie.Poster.startsWith("http")
          ) {
            return null;
          }

          // ✅ SHOW ONLY VALID IMAGE MOVIES
          return (
            <div
              key={movie.imdbID || index}
              className="card"
            >

              {/* MOVIE IMAGE */}
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="image"

                // ❌ HIDE BROKEN IMAGE CARD
                onError={(e) => {
                  e.target.closest(".card").style.display =
                    "none";
                }}
              />

              {/* MOVIE TITLE */}
              <h3 className="movieTitle">
                {movie.Title}
              </h3>

              {/* MOVIE YEAR */}
              <p className="movieText">
                Year: {movie.Year}
              </p>

              {/* FAVORITES BUTTON */}
              <button
                className="favoriteButton"
                onClick={() =>
                  addToFavorites(movie)
                }
              >
                ❤️ Add to Favorites
              </button>

              {/* REVIEW BUTTON */}
              <button
                className="reviewBtn"
                onClick={() => {
                  setSelectedMovie(movie);
                  setReview("");
                  setRating(0);
                }}
              >
                ⭐ Add Review
              </button>

              {/* SHOW REVIEW */}
              {movieReviews[movie.imdbID] && (
                <div className="reviewCard">

                  <h4 className="reviewStars">
                    {"★".repeat(
                      movieReviews[movie.imdbID]
                        .rating
                    )}
                  </h4>

                  <p className="reviewText">
                    {
                      movieReviews[movie.imdbID]
                        .review
                    }
                  </p>

                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* REVIEW MODAL */}
      {selectedMovie && (
        <div className="modalOverlay">

          <div className="modalBox">

            {/* CLOSE BUTTON */}
            <button
              onClick={() =>
                setSelectedMovie(null)
              }
            >
              ✖
            </button>

            {/* MOVIE IMAGE */}
            <img
              src={selectedMovie.Poster}
              alt={selectedMovie.Title}
              className="modalImage"
            />

            {/* REVIEW TEXTAREA */}
            <textarea
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
              placeholder="Write review..."
            />

            {/* STAR RATING */}
            <div>
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  onClick={() => setRating(s)}
                  className={
                    s <= rating
                      ? "activeStar"
                      : "star"
                  }
                >
                  ★
                </span>
              ))}
            </div>

            {/* SUBMIT REVIEW */}
            <button onClick={addReview}>
              Submit Review
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Movies;