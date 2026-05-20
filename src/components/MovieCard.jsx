import React, { useState } from "react";
import "./MovieCard.css";

export default function MovieCard({ movie, setSelectedMovie }) {

  const [watchlist, setWatchlist] = useState(false);

  const imageUrl =
    movie.image?.medium ||
    "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

  return (

    <div className="movie-card">

      <img
        src={imageUrl}
        alt={movie.name}
        className="movie-image"
      />

      <div className="movie-content">

        <h2>{movie.name}</h2>

        <p>
          <strong>Language:</strong> {movie.language}
        </p>

        <p>
          <strong>Rating:</strong>
          {" "}
          {movie.rating?.average || "N/A"}
        </p>

        <button
          onClick={() => setSelectedMovie(movie)}
        >
          View Details
        </button>

        <button
          onClick={() => setWatchlist(!watchlist)}
        >
          {watchlist ? "Added ✅" : "Add to Watchlist"}
        </button>

      </div>

    </div>
  );
}