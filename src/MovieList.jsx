// MovieList.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const MovieList = ({ movies, sortCriteria, onSort, filters, onFilter }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Add useNavigate

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.imdbID}`); // Navigate to the movie details page
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const addToFavorites = (movie) => {
    try {
      // Check if the movie is not already in the favorites list
      if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
        const updatedFavorites = [...favorites, movie];
        setFavorites(updatedFavorites);
        // Update local storage with the updated favorites list
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setError(null); // Reset error if adding to favorites is successful
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    // Apply genre and year filters
    const genreMatch =
      !filters.genre ||
      movie.Genre.toLowerCase().includes(filters.genre.toLowerCase());
    const yearMatch = !filters.year || movie.Year.includes(filters.year);
    return genreMatch && yearMatch;
  });

  // Sort filtered movies based on the selected criteria
  const sortedMovies = [...filteredMovies];

  if (sortCriteria === "year") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  } else if (sortCriteria === "rating") {
    sortedMovies.sort(
      (a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
    );
  }
  // Add more sorting options as needed

  return (
    <div>
      <h2>Search Results</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* ... (existing code) */}

      <ul>
        {sortedMovies.map((movie) => (
          <li key={movie.imdbID}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ width: "100px", height: "150px" }}
            />
            <div>
              <p>{movie.Title}</p>
              <p>Genre: {movie.Genre}</p>
              <p>Release Year: {movie.Year}</p>
              <button onClick={() => handleSelectMovie(movie)}>
                View Details
              </button>
              <button onClick={() => addToFavorites(movie)}>
                Add to Favorites
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
