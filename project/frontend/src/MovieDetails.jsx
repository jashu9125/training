import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "./config";
import "./MovieDetails.css";

function MovieDetails() {
  const { imdbID } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [imdbID]);

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `${config.BASE_URL}/movies/id/${imdbID}`
      );

      const data = await response.json();

      setMovie(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="movie-page">

      <div
        className="hero-banner"
        style={{
          backgroundImage: `url(${movie.Poster})`,
        }}
      >
        <div className="overlay">

          <div className="hero-content">

            <img
              src={movie.Poster}
              alt={movie.Title}
              className="poster"
            />

            <div className="info">

              <h1>{movie.Title}</h1>

              <div className="rating-box">
                ⭐ {movie.imdbRating}/10 IMDb
              </div>

              <div className="genres">
                {movie.Genre?.split(",").map(
                  (g, index) => (
                    <span
                      key={index}
                      className="tag"
                    >
                      {g}
                    </span>
                  )
                )}
              </div>

              <p className="year">
                {movie.Year}
              </p>

              <button className="book-btn">
                Watch Now
              </button>

            </div>

          </div>

        </div>
      </div>

      <div className="about-section">

        <h2>About Movie</h2>

        <p>{movie.Plot}</p>

        <div className="details-grid">

          <div>
            <strong>Director</strong>
            <p>{movie.Director}</p>
          </div>

          <div>
            <strong>Actors</strong>
            <p>{movie.Actors}</p>
          </div>

          <div>
            <strong>Language</strong>
            <p>{movie.Language}</p>
          </div>

          <div>
            <strong>Runtime</strong>
            <p>{movie.Runtime}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;