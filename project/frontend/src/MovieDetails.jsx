import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import config from "./config";

import "./MovieDetails.css";

function MovieDetails() {

  const { imdbID } =
    useParams();

  const navigate =
    useNavigate();

  const [movie, setMovie] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchMovie =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await fetch(
              `${config.BASE_URL}/movies/id/${imdbID}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          setMovie(data);

        } catch (error) {

          console.log(
            "Movie Details Error:",
            error
          );

        } finally {

          setLoading(false);

        }
      };

    fetchMovie();

  }, [imdbID]);

  if (loading) {

    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  if (!movie) {

    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Movie Not Found
      </h2>
    );
  }

  return (

    <div className="detailsContainer">

      <button
        className="backBtn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="detailsCard">

        <img
          src={movie.Poster}
          alt={movie.Title}
          className="detailsPoster"
        />

        <div className="detailsInfo">

          <h1>
            {movie.Title}
          </h1>

          <p>
            <strong>
              Year:
            </strong>{" "}
            {movie.Year}
          </p>

          <p>
            <strong>
              Genre:
            </strong>{" "}
            {movie.Genre}
          </p>

          <p>
            <strong>
              Runtime:
            </strong>{" "}
            {movie.Runtime}
          </p>

          <p>
            <strong>
              Director:
            </strong>{" "}
            {movie.Director}
          </p>

          <p>
            <strong>
              Actors:
            </strong>{" "}
            {movie.Actors}
          </p>

          <p>
            <strong>
              IMDb Rating:
            </strong>{" "}
            {movie.imdbRating}
          </p>

          <p className="plotText">
            <strong>
              Plot:
            </strong>
            <br />
            {movie.Plot}
          </p>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;