import React from "react";
import "./MoviePopup.css";

export default function MoviePopup({ movie, onClose }) {

  const imageUrl =
    movie.image?.original ||
    "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

  return (

    <div className="popup-overlay">

      <div className="popup">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✖
        </button>

        <img
          src={imageUrl}
          alt={movie.name}
        />

        <h2>{movie.name}</h2>

        <p>
          <strong>Language:</strong> {movie.language}
        </p>

        <p>
          <strong>Status:</strong> {movie.status}
        </p>

        <p>
          <strong>Genres:</strong>
          {" "}
          {movie.genres?.join(", ")}
        </p>

      </div>

    </div>
  );
}