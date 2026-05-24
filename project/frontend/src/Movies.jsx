// import React, { useState } from "react";

// function Movies() {

//   const [movies, setMovies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch Movies from FastAPI Backend
//   const fetchMovies = async () => {

//     // Empty Validation
//     if (!search.trim()) {

//       setError("Please enter movie name");
//       return;

//     }

//     try {

//       setLoading(true);
//       setError("");

//       // FastAPI Backend URL
//       const response = await fetch(
//         `http://127.0.0.1:8000/movies/search?title=${search}`
//       );

//       // Check Response
//       if (!response.ok) {

//         throw new Error("Failed to fetch movies");

//       }

//       // Convert to JSON
//       const data = await response.json();

//       console.log("API RESPONSE:", data);

//       // Handle Different API Formats
//       if (Array.isArray(data)) {

//         setMovies(data);

//       } else if (data.Search) {

//         setMovies(data.Search);

//       } else {

//         setMovies([]);
//         setError("No movies found");

//       }

//     } catch (err) {

//       console.error(err);
//       setError("Server Error");

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (

//     <div style={styles.container}>

//       <h1 style={styles.heading}>
//         🎬 Movie Recommendation App
//       </h1>

//       {/* Search Section */}
//       <div style={styles.searchBox}>

//         <input
//           type="text"
//           placeholder="Search movies..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           onKeyDown={(e) => {

//             if (e.key === "Enter") {

//               fetchMovies();

//             }

//           }}
//           style={styles.input}
//         />

//         <button
//           onClick={fetchMovies}
//           style={styles.button}
//         >
//           Search
//         </button>

//       </div>

//       {/* Loading */}
//       {loading && <h2>Loading...</h2>}

//       {/* Error */}
//       {error && (

//         <h3 style={{ color: "red" }}>
//           {error}
//         </h3>

//       )}

//       {/* Movies Grid */}
//       <div style={styles.grid}>

//         {movies.map((movie, index) => (

//           <div
//             key={movie.imdbID || index}
//             style={styles.card}
//           >

//             <img
//               src={
//                 (movie.Poster || movie.poster) &&
//                 (movie.Poster || movie.poster) !== "N/A"
//                   ? (movie.Poster || movie.poster)
//                   : "https://via.placeholder.com/300x450?text=No+Image"
//               }
//               alt={movie.Title || movie.title}
//               style={styles.image}
//             />

//             <h3>
//               {movie.Title || movie.title}
//             </h3>

//             <p>
//               Year: {movie.Year || movie.year}
//             </p>

//             <p>
//               Type: {movie.Type || movie.type}
//             </p>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }

// const styles = {

//   container: {
//     padding: "20px",
//     textAlign: "center",
//     backgroundColor: "#f5f5f5",
//     minHeight: "100vh",
//   },

//   heading: {
//     marginBottom: "20px",
//   },

//   searchBox: {
//     marginBottom: "30px",
//   },

//   input: {
//     padding: "12px",
//     width: "300px",
//     fontSize: "16px",
//     borderRadius: "5px",
//     border: "1px solid gray",
//     marginRight: "10px",
//   },

//   button: {
//     padding: "12px 20px",
//     fontSize: "16px",
//     backgroundColor: "#222",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "20px",
//   },

//   card: {
//     background: "white",
//     padding: "15px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//   },

//   image: {
//     width: "100%",
//     height: "320px",
//     objectFit: "cover",
//     borderRadius: "10px",
//   },

// };

// export default Movies;

import React, { useState } from "react";

function Movies() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {

    if (!search.trim()) {
      setError("Please enter movie name");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `http://127.0.0.1:8000/movies/search?title=${search}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      console.log("API RESPONSE:", data);

      // ✅ SAFE FIX (prevents map error)
      const moviesArray =
        data?.Search ||
        data?.results ||
        (Array.isArray(data) ? data : []);

      setMovies(moviesArray);

    } catch (err) {

      console.error(err);
      setError("Server Error");
      setMovies([]);

    } finally {
      setLoading(false);
    }
  };

  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        🎬 Movie Search App
      </h1>

      {/* Search */}
      <div style={styles.searchBox}>

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchMovies();
            }
          }}
          style={styles.input}
        />

        <button onClick={fetchMovies} style={styles.button}>
          Search
        </button>

      </div>

      {/* Loading */}
      {loading && <h3>Loading...</h3>}

      {/* Error */}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      {/* Movies Grid */}
      <div style={styles.grid}>

        {movies?.map((movie, index) => (

          <div key={movie.imdbID || index} style={styles.card}>

            <img
              src={
                movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.Title}
              style={styles.image}
            />

            <h3>{movie.Title}</h3>

            <p>Year: {movie.Year}</p>

            <p>Type: {movie.Type}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "20px",
  },

  searchBox: {
    marginBottom: "30px",
  },

  input: {
    padding: "12px",
    width: "300px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid gray",
    marginRight: "10px",
  },

  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#222",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },

  image: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
    borderRadius: "10px",
  },

};

export default Movies;