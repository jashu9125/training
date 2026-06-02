import React, {
  useEffect,
  useState,
  useCallback,
} from "react";

import config from "./config";
import "./Movies.css";

const Favorites = () => {

  const [favorites, setFavorites] =
    useState([]);

  // =========================
  // FETCH FAVORITES
  // =========================
  const fetchFavorites =
    useCallback(async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {
          setFavorites([]);
          return;
        }

        const response = await fetch(
          `${config.BASE_URL}/favorites`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {

          console.log(
            "Unauthorized - Login Again"
          );

          setFavorites([]);
          return;
        }

        const data =
          await response.json();

        console.log(
          "Favorites API Response:",
          data
        );

        console.log(
          "Is Array:",
          Array.isArray(data)
        );

        // BACKEND RETURNS ARRAY
        setFavorites(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.log(
          "Favorites Error:",
          error
        );

        setFavorites([]);
      }

    }, []);

  // =========================
  // REMOVE FAVORITE
  // =========================

        const removeFavorite = async (movieId) => {

        try {

        const token =
          localStorage.getItem("token");

        const response =
          await fetch(
          `${config.BASE_URL}/favorites/${movieId}`,
        {
          method: "DELETE",
          headers: {
          Authorization: `Bearer ${token}`,
          },
        }
      );

    if (!response.ok) {
      alert("Failed to remove favorite");
      return;
    }

    // REMOVE FROM UI IMMEDIATELY
    setFavorites((prev) =>
      prev.filter(
        (movie) => movie.movie_id !== movieId
      )
    );

    window.dispatchEvent(
  new Event("favoritesUpdated")
);

    alert("Removed from favorites");

  } catch (error) {

    console.log(error);

    alert("Server Error");
  }
};



  // =========================
  // LOAD FAVORITES
  // =========================
  useEffect(() => {

    fetchFavorites();

  }, [fetchFavorites]);

  return (

    <div className="favorites-container">

      <h1 className="favorites-title">
        🎬 Favorite Movies
      </h1>

      {favorites.length === 0 ? (

        <h3 className="no-favorites">
          No favorite movies added
        </h3>

      ) : (

        <div className="favorites-grid">

          {favorites.map((movie) => (

            <div
              key={movie.id}
              className="favorite-card"
            >

              <img
                src={movie.poster}
                alt={movie.title}
                className="favorite-image"
                onError={(e) => {
                  e.target.style.display =
                    "none";
                }}
              />

              <h3 className="favorite-title">
                {movie.title}
              </h3>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFavorite(
                    movie.movie_id
                  )
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Favorites;