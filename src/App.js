import React, { useState } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";

import pokiri from "./pokiri.jpg";
import darling from "./darling.jpg";
import aarya from "./aarya.jpg";
import arundathi from "./arundathi.jpg";
import jathirathnalu from "./jathirathnalu.jpg";
import karthikeya from "./karthikeya.jpg";

function App() {
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("All");
    const [darkMode, setDarkMode] = useState(true);

    const movies = [
        {
            title: "Pokiri",
            genre: "Action",
            rating: 5,
            description: "An undercover police officer infiltrates the underworld.",
            image: pokiri,
        },

        {
            title: "Darling",
            genre: "Romance",
            rating: 4,
            description: "A cheerful young man falls in love.",
            image: darling,
        },

        {
            title: "Aarya",
            genre: "Drama",
            rating: 4,
            description: "A free-spirited young man fights for love.",
            image: aarya,
        },

        {
            title: "Arundathi",
            genre: "Horror / Fantasy",
            rating: 5,
            description:
                "A brave queen's spirit protects her legacy from evil forces.",
            image: arundathi,
        },

        {
            title: "Jathi Ratnalu",
            genre: "Comedy",
            rating: 4,
            description:
                "Three innocent men get caught in a hilarious political conspiracy.",
            image: jathirathnalu,
        },

        {
            title: "Karthikeya",
            genre: "Mystery / Thriller",
            rating: 4,
            description:
                "A medical student investigates mysterious events happening at a temple village.",
            image: karthikeya,
        },
    ];

    const filteredMovies = movies.filter((movie) => {
        return (
            movie.title.toLowerCase().includes(search.toLowerCase()) &&
            (genre === "All" || movie.genre === genre)
        );
    });

    return (
        <div className={darkMode ? "app dark" : "app light"}>
            <h1> Movie Recommendation Card </h1>{" "}
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />{" "}
                <select onChange={(e) => setGenre(e.target.value)}>
                    <option value="All"> All </option>{" "}
                    <option value="Action"> Action </option>{" "}
                    <option value="Romance"> Romance </option>{" "}
                    <option value="Drama"> Drama </option>{" "}
                    <option value="Horror / Fantasy"> Horror / Fantasy </option>{" "}
                    <option value="Comedy"> Comedy </option>{" "}
                    <option value="Mystery / Thriller"> Mystery / Thriller </option>{" "}
                </select>{" "}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={darkMode ? "btn-dark" : "btn-light"}
                >
                    {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
                </button>{" "}
            </div>{" "}
            <div className="movies-container">
                {" "}
                {filteredMovies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}{" "}
            </div>{" "}
        </div>
    );
}

export default App;
