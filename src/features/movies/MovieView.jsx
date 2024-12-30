import { useEffect } from 'react';
import { fetchMovies } from './moviesSlice';
import { useSelector, useDispatch } from 'react-redux';
import MovieList from './MovieList';
import { Link } from 'react-router-dom';

const MovieView = () => {
  const movies = useSelector((state) => {
    return state.movies;
  });
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  console.log(movies, status, error);
  return (
    <main>
      <section>
        <h2>Add New Movie</h2>
        <Link to="/addmovie">Add</Link>
      </section>
      <section>
        <h2>Movies</h2>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {movies && <MovieList movies={movies.movies} />}
      </section>
    </main>
  );
};

export default MovieView;
