import React, {
  useEffect,
  useState,
} from "react";

import config from "./config";
import "./Movies.css";
import "./Recommendations.css";

function Recommendations() {

  const [
    recommendations,
    setRecommendations
  ] = useState([]);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          return;
        }

        const response =
          await fetch(
            `${config.BASE_URL}/recommendations`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        setRecommendations(
          data?.recommended_movies || []
        );

      } catch (error) {

        console.log(
          "Recommendation Error:",
          error
        );

        setRecommendations([]);
      }
    };

  if (
    !recommendations ||
    recommendations.length === 0
  ) {
    return (
      <div className="recommend-empty">
        No recommendations found
      </div>
    );
  }

  return (

    <div className="bms-section">

      <h2 className="bms-heading">
        Recommended Movies
      </h2>

      <div className="bms-row">

        {recommendations.map(
          (movie, index) => (

            <div
              key={index}
              className="bms-card"
            >

              <img
                src={movie.poster}
                alt={movie.title}
                className="bms-poster"
                onError={(e) => {
                  e.target.src =
                    "https://dummyimage.com/300x450/cccccc/000000&text=No+Image";
                }}
              />

              <div className="bms-rating">
                👍 Recommended
              </div>

              <h3 className="bms-title">
                {movie.title}
              </h3>

              <p className="bms-genre">
                {movie.reason}
              </p>

            </div>

          )
        )}

      </div>

    </div>

  );
}

export default Recommendations;