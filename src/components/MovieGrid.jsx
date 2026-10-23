
import MovieCard from './MovieCard';

function MovieGrid({ movies, favorites, addFavorite, removeFavorite }) {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
