import React, { useState, useEffect } from 'react';
import "./App.css";

const Weather = () => {
    const [city, setCity] = useState(""); // Store user input city name
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false); // For tracking dark mode state

    const apiKey = "f00c38e0279b7bc85480c3fe775d518c";

    // Apply dark mode on full page
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);

    // Function to fetch the weather data from API
    const fetchWeather = async () => {
        if (!city) {
            setError("Please enter a city name.");
            return;
        }
        setError(""); // Reset previous errors

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();

            if (response.ok) {
                setWeatherData(data);
            } else {
                setError("City not found! Please enter a valid city.");
            }
        } catch (error) {
            setError("Failed to fetch data. Please try again later.");
        }
    };

    return (
        <div className="weather-container">
            {/* Dark Mode Toggle */}
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="darkModeSwitch"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                />
                <label className="form-check-label" htmlFor="darkModeSwitch">
                    {darkMode ? "Dark Mode" : "Light Mode"}
                </label>
            </div>

            <h2>Weather Forecast</h2>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {error && <p className="error">{error}</p>}

            {weatherData && (
                <div className="weather-info">
                    <h3>
                        {weatherData.name}, {weatherData.sys.country}
                    </h3>
                    <p>
                        <strong>Temperature:</strong> {weatherData.main.temp}°C
                    </p>
                    <p>
                        <strong>Weather:</strong> {weatherData.weather[0].description}
                    </p>
                    <p>
                        <strong>Humidity:</strong> {weatherData.main.humidity}%
                    </p>
                    <p>
                        <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
                    </p>
                    <p>
                        <strong>Time:</strong> {new Date().toLocaleTimeString()}
                    </p>
                    <p>
                        <strong>Date:</strong> {new Date().toLocaleDateString()}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Weather;
