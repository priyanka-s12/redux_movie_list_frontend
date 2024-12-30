import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMovieAsync,
  updateMovieAsync,
} from '../features/movies/moviesSlice';
import { Link, useLocation } from 'react-router-dom';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    movieTitle: '',
    director: '',
    genre: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location);

  const { state: existingMovie } = location;
  console.log(existingMovie);

  useEffect(() => {
    if (existingMovie) {
      if (
        existingMovie.movieTitle &&
        existingMovie.director &&
        existingMovie.genre
      ) {
        setFormData(existingMovie);
      }
    }
  }, [existingMovie]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const newMovie = { ...formData };

    if (existingMovie) {
      dispatch(updateMovieAsync({ _id: existingMovie._id, ...newMovie }));
      setSuccessMessage('Movie updated successfully');
    } else {
      dispatch(addMovieAsync(newMovie));
      setSuccessMessage('Movie added successfully !!!');
    }

    const emptyValues = {
      movieTitle: '',
      director: '',
      genre: '',
    };

    setFormData(emptyValues);
  };
  return (
    <>
      <h2>{existingMovie ? 'Edit' : 'Add'} Movie</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Movie Title"
            name="movieTitle"
            value={formData.movieTitle}
            onChange={changeHandler}
            required
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Director"
            name="director"
            value={formData.director}
            onChange={changeHandler}
            required
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            value={formData.genre}
            onChange={changeHandler}
            required
          />
        </div>
        <br />
        <div>
          <button type="submit">{existingMovie ? 'Update' : 'Add'}</button>
        </div>
      </form>
      <br />
      <div>
        <Link to="/">Go Back to Home Page</Link>
      </div>
    </>
  );
};

export default MovieForm;
