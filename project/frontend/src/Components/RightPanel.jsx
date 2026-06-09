import React from "react";

export default function RightPanel({
 movies
}) {

 return (

  <div className="right-panel">

   <h3>
     Popular Movies
   </h3>

   {movies.slice(0,5).map(movie => (

    <div
      className="popular-item"
      key={movie.imdbID}
    >

      <img
       src={movie.Poster}
       alt=""
      />

      <div>
       <p>{movie.Title}</p>
      </div>

    </div>

   ))}

  </div>

 );
}