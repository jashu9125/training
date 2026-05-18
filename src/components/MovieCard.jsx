import React, { useState } from "react";
import "./MovieCard.css";

export default function MovieCard({ movie }) {

  const [watchlist, setWatchlist] = useState(false);
const handleWatchlist = () => {

  setWatchlist(!watchlist);

  alert(`${movie.title} added to Watchlist`);
};
  return (
   <div className="movie-card">

  <div className="rating-badge">
    ⭐ {movie.rating}
  </div>

  <img
    src={movie.image}
    alt={movie.title}
    className="movie-image"
  />

  <div className="movie-content">
        <h2>{movie.title}</h2>

        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>

        <p>
          <strong>Short Description:</strong> 
        </p>

        <p className="description">
          {movie.description}
        </p>

        <button onClick={handleWatchlist}>
            {watchlist ? "Added" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}