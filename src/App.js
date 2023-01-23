import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// OMDB API Key: c2f488e8
const API_URL = "http://www.omdbapi.com/?apikey=c2f488e8";

// const movie1 = {
// 	Title: "The Amazing Spiderman 2 Webb Cut",
// 	Year: "2021",
// 	imdbID: "tt18351128",
// 	Type: "movie",
// 	Poster:
// 		"https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg",
// };

const randomizer = Math.floor(Math.random() * 10);
const startTerms = [
	"Avengers",
	"Avatar",
	"Batman",
	"Justice League",
	"Superman",
	"X-Men",
	"Iron Man",
	"Transformers",
	"Black Panther",
	"Pirates",
];

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&S=${title}`);
		const data = await response.json();
		setMovies(data.Search);
	};

	useEffect(() => {
		searchMovies(startTerms[randomizer]);
	}, []);
	return (
		<div className="app">
			<h1>MovieZone</h1>

			<div className="search">
				<input
					placeholder="Search for Movies"
					values={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<img
					src={SearchIcon}
					alt="search"
					onClick={() => searchMovies(searchTerm)}
				/>
			</div>
			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCard movie={movie} key={movie.imdbID} />
					))}
				</div>
			) : (
				<div className="empty">
					<h2>No Movies Found</h2>
				</div>
			)}
		</div>
	);
};

export default App;
