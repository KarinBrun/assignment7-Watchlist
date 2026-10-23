
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

function Watchlist({ favorites, addFavorite, removeFavorite }) {
  const { watchlist, removeFromWatchlist } = useMovies();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you want to watch</p>
      </div>

      {watchlist.length > 0 ? (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard
            key={movie.id}
            movie={movie}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Your watchlist is empty. Start adding movies from the home page!</p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;
