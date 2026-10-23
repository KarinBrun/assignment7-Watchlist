
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../services/movieService';

function Header({
  searchQuery,
  setSearchQuery,
  setSearchResults,
  setSearchLoading,
  setSearchError
}) {
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError(null);
      return;
    }

    let active = true;

    setSearchLoading(true);
    setSearchError(null);
    setSearchResults([]);

    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(searchQuery);

        if (active) {
          setSearchResults(data.results);
        }
      } catch (error) {
        if (active) {
          console.error('Error searching movies:', error);
          setSearchError('Unable to search movies. Please try again.');
        }
      } finally {
        if (active) {
          setSearchLoading(false);
        }
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [
    searchQuery,
    setSearchResults,
    setSearchLoading,
    setSearchError
  ]);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() => setSearchQuery(searchQuery.trim())}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
