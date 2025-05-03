import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'f8661b4edd894a3bad7195159251902';

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow bg-dark text-light">
            <div className="card-body">
              <h1 className="text-center mb-4">Weather App</h1>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                </div>
              </form>
              
              {/* Loading State */}
              {loading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {/* Weather Data */}
              {weatherData && !loading && (
                <div className="card mt-3">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">{weatherData.location.name}, {weatherData.location.country}</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <img 
                        src={weatherData.current.condition.icon} 
                        alt={weatherData.current.condition.text} 
                      />
                      <h2 className="ms-3 mb-0">{weatherData.current.temp_c}°C</h2>
                    </div>
                    
                    <p className="text-center mb-3">{weatherData.current.condition.text}</p>
                    
                    <div className="row text-center">
                      <div className="col-4">
                        <p className="mb-1">Humidity</p>
                        <p className="fw-bold">{weatherData.current.humidity}%</p>
                      </div>
                      <div className="col-4">
                        <p className="mb-1">Wind</p>
                        <p className="fw-bold">{weatherData.current.wind_kph} km/h</p>
                      </div>
                      <div className="col-4">
                        <p className="mb-1">Feels Like</p>
                        <p className="fw-bold">{weatherData.current.feelslike_c}°C</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-muted text-center">
                    Last updated: {weatherData.current.last_updated}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;