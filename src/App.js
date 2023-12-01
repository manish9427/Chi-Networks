// App.js
import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import FavoritesPage from "./FavoritesPage";
import MovieDetails from "./MovieDetails";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const App = () => {
  const omdbApiKey = "dd1907ef";

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [filters, setFilters] = useState({ genre: "", year: "" });
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${query}`
      );

      if (response.data.Error) {
        throw new Error(response.data.Error);
      }

      const moviesWithImages = await Promise.all(
        response.data.Search.map(async (movie) => {
          const detailedResponse = await axios.get(
            `https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${movie.imdbID}`
          );
          return {
            ...movie,
            Poster: detailedResponse.data.Poster,
          };
        })
      );

      setSearchResults(moviesWithImages || []);
      setSearchQuery(query);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilter = (filterValues) => {
    setFilters(filterValues);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link style={{ color: "black" }} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link style={{ color: "black" }} to="/favorites">
                Favorites
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                {user ? (
                  <div>
                    <button onClick={handleLogout}>Logout</button>
                    <SearchBar
                      onSearch={handleSearch}
                      onSort={handleSort}
                      onFilter={handleFilter}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {searchQuery && (
                      <MovieList
                        movies={searchResults}
                        sortCriteria={sortCriteria}
                        onSort={handleSort}
                        filters={filters}
                        onFilter={handleFilter}
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <SignupForm onSignup={handleSignup} onLogin={handleLogin} />
                  </div>
                )}
              </div>
            }
          />

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
