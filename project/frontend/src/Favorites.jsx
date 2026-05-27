import React, { useEffect, useState, useCallback } from "react";
import config from "./config";
import "./Movies.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // FETCH FAVORITES
  const fetchFavorites = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${config.BASE_URL}/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Favorites Response:", data);

      // FIX HERE
      setFavorites(data.favorites || data.data || []);
    } catch (error) {
      console.log("Error fetching favorites:", error);
    }
  }, []);

  // REMOVE FAVORITE
  const removeFavorite = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `${config.BASE_URL}/favorites/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFavorites();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">
        Favorite Movies
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
              />

              <h3 className="favorite-title">
                {movie.title}
              </h3>

              <button
                className="remove-btn"
                onClick={() => removeFavorite(movie.id)}
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