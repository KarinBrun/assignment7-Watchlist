
import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({
  searchResults,
  searchQuery,
  searchLoading,
  searchError,
  favorites,
  addFavorite,
  removeFavorite
}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPopularMovies();

        if (active) {
          setMovies(data.results);
        }
      } catch (error) {
        if (active) {
          console.error('Error fetching movies:', error);
          setError('Unable to load movies. Please try again later.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      active = false;
    };
  }, []);

  const isSearching = searchQuery.trim().length > 0;
  const displayedMovies = isSearching ? searchResults : movies;
  const isLoading = isSearching ? searchLoading : loading;
  const displayError = isSearching ? searchError : error;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{isSearching ? 'Search Results' : 'Popular Movies'}</h2>
        <p>
          {isSearching
            ? `Results for "${searchQuery}"`
            : 'Discover and save your favorite films'}
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : displayError ? (
        <ErrorMessage message={displayError} />
      ) : (
        <MovieGrid
          movies={displayedMovies}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      )}
    </main>
  );
}

export default Home;
