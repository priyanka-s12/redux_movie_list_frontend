import { deleteMovieAsync, fetchMovies } from './moviesSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  console.log(movies);
  const dispatch = useDispatch();

  const handleDelete = (movieId) => {
    dispatch(deleteMovieAsync(movieId)).then((response) => {
      console.log(response);
      dispatch(fetchMovies());
    });
  };
  return (
    <main>
      <ul>
        {movies?.map((movie) => (
          <li key={movie._id}>
            {movie.movieTitle} - Director: {movie.director} - Genre:{' '}
            {movie.genre} -{' '}
            <button>
              <Link to={`/editmovie/${movie._id}`} state={movie}>
                Edit
              </Link>
            </button>{' '}
            - <button onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MovieList;
