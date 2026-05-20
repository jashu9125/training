import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import MoviePopup from "./components/MoviePopup";
import "./App.css";

function App() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("batman");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const fetchMovies = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${search}`
      );

      const data = await response.json();

      console.log(data);

      if (Array.isArray(data)) {

        setMovies(data);

      } else {

        setMovies([]);
      }

    } catch (err) {

      console.log(err);

      setError("Failed to fetch movies");

      setMovies([]);
    }

    setLoading(false);
  };

  useEffect(() => {

    fetchMovies();

  }, []);

  const handleSubmit = (e) => {

    e.preventDefault();

    fetchMovies();
  };

  return (

    <div className={darkMode ? "app dark" : "app light"}>

      <h1>🎬 Movie Recommendation App</h1>

      <form className="controls" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          Search
        </button>

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

      </form>

      {loading && <h2>Loading...</h2>}

      {error && <h2>{error}</h2>}

      <div className="movies-container">

        {movies.length > 0 ? (

          movies.map((item) => (

            <MovieCard
              key={item.show.id}
              movie={item.show}
              setSelectedMovie={setSelectedMovie}
            />

          ))

        ) : (

          !loading && <h2>No Movies Found</h2>

        )}

      </div>

      {selectedMovie && (

        <MoviePopup
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />

      )}

    </div>
  );
}

export default App;