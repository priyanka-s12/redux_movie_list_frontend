import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(
    'https://movie-list-backend-phi.vercel.app/movies'
  );
  console.log(response);
  return response.data;
});

export const addMovieAsync = createAsyncThunk(
  'movies/addMovieAsync',
  async (newMovie) => {
    const response = await axios.post(
      `https://movie-list-backend-phi.vercel.app/movies`,
      newMovie
    );
    console.log(response);
    return response.data;
  }
);

export const deleteMovieAsync = createAsyncThunk(
  'movies/deleteMovieAsync',
  async (movieId) => {
    const response = await axios.delete(
      `https://movie-list-backend-phi.vercel.app/movies/${movieId}`
    );
    console.log(response);
    return response.data;
  }
);

//update movie - send data to update
export const updateMovieAsync = createAsyncThunk(
  'movies/updateMovieAsync',
  async (movieToUpdate) => {
    const response = await axios.post(
      `https://movie-list-backend-phi.vercel.app/movies/${movieToUpdate._id}`,
      movieToUpdate
    );
    console.log(response);
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = 'success';
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(addMovieAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addMovieAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.movies.push(action.payload);
    });
    builder.addCase(addMovieAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(deleteMovieAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteMovieAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload
      );
    });
    builder.addCase(deleteMovieAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(updateMovieAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateMovieAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.movies = state.movies.map(
        (movie) => movie._id === action.payload._id
      );
    });
    builder.addCase(updateMovieAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export default moviesSlice.reducer;
