import React from "react";

export default function MovieRow({
 title,
 movies
}) {

 return (

  <div className="movie-section">

   <h2>{title}</h2>

   <div className="movie-row">

    {movies.map(movie => (

      <div
       className="movie-card"
       key={movie.imdbID}
      >

       <img
        src={movie.Poster}
        alt=""
       />

      </div>

    ))}

   </div>

  </div>
 );
}