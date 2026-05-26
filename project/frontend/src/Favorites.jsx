import React, { useEffect, useState } from "react";

import "./Movies.css";

function Favorites() {

  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const token = localStorage.getItem("token");


  // FETCH FAVORITES
  const fetchFavorites = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {

        setFavorites(data.data);

      } else {

        setError("Failed to load favorites");
      }

    } catch (error) {

      console.log(error);

      setError("Server Error");

    } finally {

      setLoading(false);
    }
  };


  // REMOVE FAVORITE
  const removeFavorite = async (movie_id) => {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/favorites/${movie_id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      setFavorites(
        favorites.filter(
          (movie) => movie.movie_id !== movie_id
        )
      );

    } catch (error) {

      console.log(error);

      alert("Failed to remove");
    }
  };


  useEffect(() => {

    fetchFavorites();

  }, []);


  if (loading) {

    return (
      <h2 className="loading">
        Loading favorites...
      </h2>
    );
  }


  return (

    <div className="container">

      <h1 className="heading">
        ❤️ My Favorites
      </h1>

      {error && (
        <h3 className="error">
          {error}
        </h3>
      )}

      {favorites.length === 0 ? (

        <h2>No favorite movies yet</h2>

      ) : (

        <div className="grid">

          {favorites.map((movie) => (

            <div
              key={movie.movie_id}
              className="card"
            >

              <img
                src={movie.poster}
                alt={movie.title}
                className="image"
              />

              <h3 className="movieTitle">
                {movie.title}
              </h3>

              <button
                className="favoriteButton"
                onClick={() =>
                  removeFavorite(movie.movie_id)
                }
              >
                ❌ Remove Favorite
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Favorites;