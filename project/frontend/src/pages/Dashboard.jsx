import React, {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import config from "../config";

import "../Dashboard.css";

export default function Dashboard() {

  const [movies, setMovies] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadHomeMovies();

  }, []);

  const loadHomeMovies =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const keywords = [
          "avengers",
          "batman",
          "spider",
          "superman",
          "marvel",
          "iron",
          "fast"
        ];

        let allMovies = [];

        for (const word of keywords) {

          const response =
            await fetch(
              `${config.BASE_URL}/movies/search?title=${word}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          const data =
            await response.json();

          if (
            Array.isArray(data)
          ) {

            allMovies = [
              ...allMovies,
              ...data
            ];

          }

        }

        const uniqueMovies =
          allMovies.filter(
            (
              movie,
              index,
              self
            ) =>
              index ===
              self.findIndex(
                m =>
                  m.imdbID ===
                  movie.imdbID
              )
          );

        const filteredMovies =
          uniqueMovies.filter(
            movie =>
              movie.Poster &&
              movie.Poster !== "N/A"
          );

        setMovies(
          filteredMovies
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const searchMovies =
    async () => {

      if (!search.trim()) {

        loadHomeMovies();
        return;

      }

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `${config.BASE_URL}/movies/search?title=${search}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await response.json();

        const filteredMovies =
          Array.isArray(data)
            ? data.filter(
                movie =>
                  movie.Poster &&
                  movie.Poster !== "N/A"
              )
            : [];

        setMovies(
          filteredMovies
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const addFavorite =
    async (movie) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await fetch(
          `${config.BASE_URL}/favorites`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`
            },
            body: JSON.stringify({
              movie_id:
                movie.imdbID,
              title:
                movie.Title,
              poster:
                movie.Poster
            })
          }
        );

        alert(
          "Added To Favorites"
        );

      } catch (error) {

        console.log(error);

      }

    };

  const removeBrokenImage =
    (imdbID) => {

      setMovies(
        prev =>
          prev.filter(
            movie =>
              movie.imdbID !== imdbID
          )
      );

    };

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboardContent">

        <div className="searchContainer">

          <input
            type="text"
            placeholder="Search Movies..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="searchInput"
          />

          <button
            className="searchBtn"
            onClick={
              searchMovies
            }
          >
            Search
          </button>

        </div>

        {loading && (

          <h2 className="loading">
            Loading...
          </h2>

        )}

        <div className="movieGrid">

          {movies.map(
            (movie) => (

              <div
                key={
                  movie.imdbID
                }
                className="movieCard"
              >

                <img
                  src={
                    movie.Poster
                  }
                  alt={
                    movie.Title
                  }
                  onError={() =>
                    removeBrokenImage(
                      movie.imdbID
                    )
                  }
                  onClick={() =>
                    (
                      window.location.href =
                      `/movie/${movie.imdbID}`
                    )
                  }
                />

                <div className="movieInfo">

                  <h3>
                    {
                      movie.Title
                    }
                  </h3>

                  <p>
                    {
                      movie.Year
                    }
                  </p>

                  <button
                    className="favoriteBtn"
                    onClick={() =>
                      addFavorite(
                        movie
                      )
                    }
                  >
                    Add To Favorites
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}