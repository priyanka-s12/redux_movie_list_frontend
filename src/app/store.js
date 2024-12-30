import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../features/movies/moviesSlice';
const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

export default store;
