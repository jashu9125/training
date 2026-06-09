import React from "react";

export default function HeroBanner({
 movie
}) {

 if(!movie) return null;

 return (

  <div
   className="hero-banner"
   style={{
    backgroundImage:
     `url(${movie.Poster})`
   }}
  >

   <div className="hero-content">

    <h1>
      {movie.Title}
    </h1>

    <p>
      {movie.Plot}
    </p>

    <button>
      Watch Now
    </button>

   </div>

  </div>
 );
}