import React, { useState } from "react";

import "./Movies.css";

function Movies() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH MOVIES
  const fetchMovies = async () => {

    if (!search.trim()) {

      setError("Please enter movie name");

      return;
    }

    try {

      setLoading(true);

      setError("");

      const response = await fetch(
        `http://127.0.0.1:8000/movies/search?title=${search}`
      );

      const data = await response.json();

      console.log("API RESPONSE:", data);

      const moviesArray =
        data?.Search ||
        data?.results ||
        (Array.isArray(data) ? data : []);

      setMovies(moviesArray);

    } catch (err) {

      console.log(err);

      setError("Server Error");

    } finally {

      setLoading(false);
    }
  };


  // ADD FAVORITES
  const addToFavorites = async (movie) => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {

        alert("Please login first");

        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/favorites",
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(
          data?.detail?.message ||
          "Movie already in favorites"
        );

        return;
      }

      alert("Movie added to favorites");

    } catch (error) {

      console.log(error);

      alert("Server Error");
    }
  };


  return (

    <div className="container">

      <h1 className="heading">
        🎬 Movie Search App
      </h1>

      <div className="searchBox">

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }

          onKeyDown={(e) => {

            if (e.key === "Enter") {

              fetchMovies();
            }
          }}

          className="input"
        />

        <button
          onClick={fetchMovies}
          className="searchButton"
        >
          Search
        </button>

      </div>


      {loading && (
        <h3 className="loading">
          Loading...
        </h3>
      )}


      {error && (
        <h3 className="error">
          {error}
        </h3>
      )}


      <div className="grid">

        {movies?.map((movie, index) => (

          <div
            key={movie.imdbID || index}
            className="card"
          >

            <img
              src={
                movie.Poster &&
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://placehold.co/300x450?text=No+Image"
              }

              alt={movie.Title}

              className="image"

              onError={(e) => {

                e.target.onerror = null;

                e.target.src =
                  "https://placehold.co/300x450?text=Image+Not+Found";

              }}
            />

            <h3 className="movieTitle">
              {movie.Title}
            </h3>

            <p className="movieText">
              Year: {movie.Year}
            </p>

            <p className="movieText">
              Type: {movie.Type}
            </p>

            <button
              className="favoriteButton"

              onClick={() =>
                addToFavorites(movie)
              }
            >
              ❤️ Add to Favorites
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Movies;