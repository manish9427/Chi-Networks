// FavoritesPage.js
import React, { useState, useEffect } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from local storage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favorites.filter((fav) => fav.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    // Update local storage with the updated favorites list
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.imdbID}>
            {fav.Title}
            <button onClick={() => removeFromFavorites(fav.imdbID)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
