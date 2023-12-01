// SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch, onSort, onFilter }) => {
  const [query, setQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
    onSort(e.target.value);
  };

  const handleFilter = () => {
    onFilter({
      genre: genreFilter,
      year: yearFilter,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for movies by title..."
      />
      <button type="submit">Search</button>

      <label>
        Sort by:
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="">-- Select --</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
          {/* Add more options as needed */}
        </select>
      </label>

      <label>
        Genre:
        <input
          type="text"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          placeholder="Enter genre..."
        />
      </label>

      <label>
        Release Year:
        <input
          type="text"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          placeholder="Enter release year..."
        />
      </label>

      <button type="button" onClick={handleFilter}>
        Apply Filters
      </button>
    </form>
  );
};

export default SearchBar;
