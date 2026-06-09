import React from "react";

export default function Topbar({
  search,
  setSearch,
  searchMovies
}) {

  return (

    <div className="topbar">

      <input
        type="text"
        value={search}
        placeholder="Search movies..."
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <button
        onClick={searchMovies}
      >
        Search
      </button>

    </div>
  );
}