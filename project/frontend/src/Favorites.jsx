import React, { useEffect, useState, useCallback } from "react";
import config from "./config";
import "./Movies.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // ✅ FETCH FAVORITES
  const fetchFavorites = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

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

      // ❗ HANDLE 401
      if (response.status === 401) {
        console.log("Unauthorized - login again");
        setFavorites([]);
        return;
      }

      const data = await response.json();

      console.log("Favorites API Response:", data);

      // ✅ YOUR BACKEND RETURNS: { message, data }
      const list = data?.data;

      setFavorites(Array.isArray(list) ? list : []);
    } catch (error) {
      console.log("Error:", error);
      setFavorites([]);
    }
  }, []);

  // ✅ REMOVE FAVORITE
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">🎬 Favorite Movies</h1>

      {favorites.length === 0 ? (
        <h3 className="no-favorites">
          No favorite movies added
        </h3>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorite-card">
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
                onClick={() => removeFavorite(movie.movie_id)}
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