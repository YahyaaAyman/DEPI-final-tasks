import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const API_KEY = 'da5bb10';
  const BASE_URL = 'https://www.omdbapi.com/';

  const defaultMovies = ['Inception', 'Interstellar', 'The Dark Knight', 'Pulp Fiction', 'The Matrix', 'Parasite'];
  
  useEffect(() => {
    const fetchInitialMovies = async () => {
      setLoading(true);
      try {
        const moviePromises = defaultMovies.map(title => 
          fetch(`${BASE_URL}?apikey=${API_KEY}&t=${title}&plot=short`)
            .then(response => response.json())
        );
        
        const moviesData = await Promise.all(moviePromises);
        const validMovies = moviesData.filter(movie => movie.Response === "True");
        setMovies(validMovies);
        setLoading(false);
      } catch (error) {
        setError('Error fetching movies: ' + error.message);
        setLoading(false);
      }
    };
    
    fetchInitialMovies();
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setLoading(true);
    setMovies([]);
    
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      if (data.Response === "True") {
        const moviePromises = data.Search.slice(0, 9).map(movie => 
          fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`)
            .then(response => response.json())
        );
        
        const detailedMovies = await Promise.all(moviePromises);
        setMovies(detailedMovies);
      } else {
        setMovies([]);
        setError(data.Error || 'No results found');
      }
      
      setLoading(false);
    } catch (error) {
      setError('Error searching movies: ' + error.message);
      setLoading(false);
    }
  };

  const getMovieDetails = async (imdbID) => {
    setLoading(true);
    
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setError(data.Error || 'Movie details not found');
      }
      
      setLoading(false);
    } catch (error) {
      setError('Error fetching movie details: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Movie Explorer</h1>
      
      {/* Search Form */}
      <form className="row mb-4" onSubmit={searchMovies}>
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Search</button>
        </div>
      </form>
      
      {/* Loading and Error States */}
      {loading && <div className="text-center"><div className="spinner-border" role="status"></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMovie.Title} ({selectedMovie.Year})</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedMovie(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <img 
                      src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "/api/placeholder/300/450"} 
                      className="img-fluid" 
                      alt={selectedMovie.Title}
                    />
                  </div>
                  <div className="col-md-8">
                    <p><strong>Director:</strong> {selectedMovie.Director}</p>
                    <p><strong>Cast:</strong> {selectedMovie.Actors}</p>
                    <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                    <p><strong>Released:</strong> {selectedMovie.Released}</p>
                    <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
                    <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating}/10</p>
                    <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedMovie(null)}>Close</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
      
      {/* Movies Grid */}
      <div className="row">
        {movies.map(movie => (
          <div key={movie.imdbID} className="col-md-4 mb-4">
            <div className="card h-100">
              <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/300/450"}
                className="card-img-top" 
                alt={movie.Title}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Year: {movie.Year}</p>
                <p className="card-text">Type: {movie.Type}</p>
                <p className="card-text">IMDb Rating: {movie.imdbRating}/10</p>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => getMovieDetails(movie.imdbID)}
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* No Results Message */}
      {!loading && movies.length === 0 && !error && <div className="alert alert-info text-center">No movies found. Try searching for a title.</div>}
    </div>
  );
};

export default MovieApp;