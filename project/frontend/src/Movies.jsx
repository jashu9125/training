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

      console.log(data);

      setMovies(data);

    } catch (err) {

      console.log(err);

      setError("Server Error");

    } finally {

      setLoading(false);
    }
  };


  // ADD FAVORITE
  const addToFavorites = async (movie) => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      alert(
        "Session expired. Please login again."
      );

      window.location.href = "/";

      return;
    }

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/favorites",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            movie_id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {

        alert(
          data?.detail?.message ||
          "Already in favorites"
        );

        return;
      }

      alert("Added to favorites");

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
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            fetchMovies()
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


      {!loading &&
        movies.length === 0 && (
          <h3>No movies found</h3>
      )}


      <div className="grid">

        {movies.map((movie, index) => (

          <div
            key={movie.imdbID || index}
            className="card"
          >

            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://placehold.co/300x450"
              }
              alt={movie.Title}
              className="image"
            />

            <h3 className="movieTitle">
              {movie.Title}
            </h3>

            <p className="movieText">
              Year: {movie.Year}
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