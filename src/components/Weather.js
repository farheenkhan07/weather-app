import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = '3d09baaf3eb13e4df4e126ae793fb7dd' // Replace with your OpenWeatherMap API key

    const getWeather = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
            setError('');
        } catch (err) {
            setWeather(null);
            setError('City not found');
        }
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <form onSubmit={getWeather}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    required
                />
                <button type="submit">Get Weather</button>
            </form>

            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <div className="temperature">
                        <h3>{Math.round(weather.main.temp)}°C</h3>
                        <img
                            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                            alt={weather.weather[0].description}
                        />
                    </div>
                    <p>{weather.weather[0].description}</p>
                    <div className="details">
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind Speed: {weather.wind.speed} m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;