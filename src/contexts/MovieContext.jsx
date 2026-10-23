import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem('movieWatchlist');
      return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } catch (error) {
      console.error('Error loading watchlist:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <MovieContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}
