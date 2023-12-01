// MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = ({ onClose }) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=dd1907ef&i=${id}`
        );

        if (response.data.Error) {
          throw new Error(response.data.Error);
        }

        setMovieDetails(response.data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movieDetails && (
        <div>
          <h2>{movieDetails.Title}</h2>
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            style={{ width: "200px", height: "300px" }}
          />
          <p>Year: {movieDetails.Year}</p>
          <p>Director: {movieDetails.Director}</p>
          <p>Writer: {movieDetails.Writer}</p>
          <p>Actors: {movieDetails.Actors}</p>
          <p>Genre: {movieDetails.Genre}</p>
          <p>Runtime: {movieDetails.Runtime}</p>
          <p>IMDb Rating: {movieDetails.imdbRating}</p>
          <p>Released: {movieDetails.Released}</p>
          <p>Plot: {movieDetails.Plot}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
