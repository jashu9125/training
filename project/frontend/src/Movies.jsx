import React, {
  useState,
  useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import "./Movies.css";
import config from "./config";

function Movies() {

  const [movies, setMovies] =
    useState([]);

  const [featuredMovie,
    setFeaturedMovie] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedMovie,
    setSelectedMovie] =
    useState(null);

  const [review, setReview] =
    useState("");

  const [rating, setRating] =
    useState(0);

  const [movieReviews,
    setMovieReviews] =
    useState({});

  const navigate =
    useNavigate();

  useEffect(() => {

    const recentMovies =
      localStorage.getItem(
        "recentMovies"
      );

    if (recentMovies) {

      const parsedMovies =
        JSON.parse(recentMovies);

      const filteredMovies =
        parsedMovies.filter(
          (movie) =>
            movie &&
            movie.Poster &&
            movie.Poster !== "N/A"  &&
            movie.Poster !== "" &&
            movie.Poster.includes("http")
        );

      setMovies(filteredMovies);

      if (
        filteredMovies.length > 0
      ) {
        setFeaturedMovie(
          filteredMovies[0]
        );
      }
    }

  }, []);

  const fetchMovies =
    async () => {

      if (!search.trim()) {

        setError(
          "Please enter movie name"
        );

        return;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {

        setError(
          "Login required"
        );

        return;
      }

      try {

        setLoading(true);

        setError("");

        const response =
          await fetch(
            `${config.BASE_URL}/movies/search?title=${search}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        const moviesData =
          Array.isArray(data)
            ? data
            : [];

        const detailedMovies =
          await Promise.all(

            moviesData.map(
              async (movie) => {

                try {

                  const res =
                    await fetch(
                      `${config.BASE_URL}/movies/id/${movie.imdbID}`,
                      {
                        headers: {
                          Authorization:
                            `Bearer ${token}`,
                        },
                      }
                    );

                  return await res.json();

                } catch {

                  return movie;
                }
              }
            )
          );

        const filteredMovies =
          detailedMovies.filter(
            (movie) =>
              movie &&
      movie.imdbID &&
      movie.Title &&
              movie.Poster &&
              movie.Poster !== "N/A" &&
              movie.Poster !== "" &&
              movie.Poster.includes("http")
          );

        setMovies(
          filteredMovies
        );

        if (
          filteredMovies.length > 0
        ) {
          setFeaturedMovie(
            filteredMovies[0]
          );
        }

        localStorage.setItem(
          "recentMovies",
          JSON.stringify(
            filteredMovies
          )
        );

      } catch {

        setError(
          "Server Error"
        );

      } finally {

        setLoading(false);
      }
    };

  const addToFavorites =
    async (movie) => {

      const token =
        localStorage.getItem(
          "token"
        );

      try {

        await fetch(
          `${config.BASE_URL}/favorites`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              movie_id:
                movie.imdbID,
              title:
                movie.Title,
              poster:
                movie.Poster,
            }),
          }
        );

        alert(
          "Added to favorites"
        );

        window.dispatchEvent(
          new Event(
            "favoritesUpdated"
          )
        );

      } catch {

        alert(
          "Server Error"
        );
      }
    };

  const addReview =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      if (!review.trim()) {
        return alert(
          "Enter review"
        );
      }

      if (!rating) {
        return alert(
          "Select rating"
        );
      }

      try {

        await fetch(
          `${config.BASE_URL}/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              movie_id:
                selectedMovie.imdbID,
              movie_title:
                selectedMovie.Title,
              movie_poster:
                selectedMovie.Poster,
              review,
              rating,
            }),
          }
        );

        setMovieReviews(
          (prev) => ({
            ...prev,
            [selectedMovie.imdbID]:
            {
              review,
              rating,
            },
          })
        );

        setSelectedMovie(
          null
        );

        setReview("");

        setRating(0);

        alert(
          "Review Added"
        );

      } catch {

        alert(
          "Server Error"
        );
      }
    };

  return (

    <>

      {featuredMovie && (

        <div
          className="heroSection"
          style={{
            backgroundImage:
              `url(${featuredMovie.Poster})`,
          }}
        >

          <div
            className="heroOverlay"
          >

            <h1
              className="heroTitle"
            >
              Movie Applications
            </h1>

            <h2
              className="heroMovieTitle"
            >
              {featuredMovie.Title}
            </h2>

            <p
              className="heroDescription"
            >
              {featuredMovie.Plot}
            </p>

            <button
              className="heroButton"
              onClick={() =>
                navigate(
                  `/movie/${featuredMovie.imdbID}`
                )
              }
            >
              ▶ Watch Now
            </button>

          </div>

        </div>

      )}

      <div className="container">

        <div className="searchBox">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search movies..."
            className="input"
          />

          <button
            onClick={
              fetchMovies
            }
            className="searchButton"
          >
            Search
          </button>

        </div>

        {loading && (
          <h3>Loading...</h3>
        )}

        {error && (
          <h3>{error}</h3>
        )}

        <div className="grid">

          {movies
  .filter(
    (movie) =>
      movie.Poster &&
      movie.Poster !== "N/A"
  )
  .map((movie) => (

    <div
      key={movie.imdbID}
      className="card"
    >

      <img
  src={movie.Poster}
  alt={movie.Title}
  className="image"
  onError={() => {

    setMovies((prev) =>
      prev.filter(
        (m) => m.imdbID !== movie.imdbID
      )
    );

  }}
  onClick={() =>
    navigate(`/movie/${movie.imdbID}`)
  }
/>

      <h3 className="movieTitle">
        {movie.Title}
      </h3>

      <p className="movieText">
        {movie.Year}
      </p>

      <button
        className="favoriteButton"
        onClick={() =>
          addToFavorites(movie)
        }
      >
        Add To Favorites
      </button>

      <button
        className="reviewBtn"
        onClick={() =>
          setSelectedMovie(movie)
        }
      >
        Add Review
      </button>

    </div>

))}

        </div>

      </div>

    </>

  );
}

export default Movies;