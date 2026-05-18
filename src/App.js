import React from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";
import pokiri from "./pokiri.jpg"
import darling from "./darling.jpg"
import aarya from "./aarya.jpg"


function App() {

    const movies = [

        {
            title: "Pokiri",
            genre: "Action / Thriller",
            rating: "8.0/10",
            description: "An undercover police officer infiltrates the dangerous underworld while posing as a ruthless gangster.",
            image: pokiri,
        },

        {
            title: "Darling",
            genre: "Romance / Comedy",
            rating: "7.4/10",
            description: "A cheerful young man tries to win the heart of his childhood friend through love and humor.",
            image: darling,
        },

        {
            title: "Aarya",
            genre: "Romance / Drama",
            rating: "7.8/10",
            description: "A free-spirited young man falls deeply in love and fights for his feelings in an unconventional way.",
            image: aarya,
        },

    ];



    return ( <
        div className = "app" >
        <
        h1 >
        <
        span style = {
            { color: "white" }
        } > Movie <
        /span>{" "}   <
        span style = {
            { color: "pink" }
        } > Recommendation <
        /span>{" "}   <
        span style = {
            { color: "yellow" }
        } > Card <
        /span>   <
        /h1 >  <
        div className = "movies-container" > {
            movies.map((movie, index) => ( <
                MovieCard key = { index }
                movie = { movie }
                />
            ))
        } <
        /div>  <
        /div>
    );
}

export default App;