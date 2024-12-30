import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieView from './features/movies/MovieView';
import MovieForm from './pages/MovieForm';
function App() {
  return (
    <>
      <Router>
        <h1>Movie List App</h1>
        <Routes>
          <Route path="/" element={<MovieView />} />
          <Route path="/addmovie" element={<MovieForm />} />
          <Route path="/editmovie/:id" element={<MovieForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
