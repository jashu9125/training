import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "./config";
import "./Movies.css";

function MovieDetails() {
  const { imdbID } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovie();
  }, [imdbID]);

  const fetchMovie = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${config.BASE_URL}/movies/id/${imdbID}`
      );

      if (!response.ok) {
        throw new Error("Movie not found");
      }

      const data = await response.json();

      setMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="details-container">
      <div className="details-card">

        <img
          src={movie.Poster}
          alt={movie.Title}
          className="details-image"
        />

        <div className="details-content">

          <h1>{movie.Title}</h1>

          <p>
            <strong>Year:</strong> {movie.Year}
          </p>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>

          <p>
            <strong>IMDb Rating:</strong> {movie.imdbRating}
          </p>

          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>

        </div>
      </div>
    </div>
  );
}

export default MovieDetails;