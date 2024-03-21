import { useState } from "react";
import "../App.css";

const options = { method: 'GET', headers: { accept: 'application/json' } };

const ForecastWeather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleClick = async () => {
        try {
            const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(location)}&apikey=8C8bF0NPgeYQ9vWq4ewv22eiQasePYLw`, options);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const renderForecast = () => {
        if (!weatherData) return null;

        return (
            <div className="forecast-wrapper">
                <h2>Forecast for {weatherData.location.name}</h2>
                {weatherData.timelines.daily.map((dailyForecast, index) => (
                    <div key={index} className="forecast-item">
                        <h3>{new Date(dailyForecast.time).toLocaleDateString()}</h3>
                        <p>Temperature: {dailyForecast.values.temperatureMax}°C / {dailyForecast.values.temperatureMin}°C</p>
                        <p>Humidity: {dailyForecast.values.humidityAvg}</p>
                        {/* Add icons for weather conditions */}
                        {/* Example: <img src={`icon-url-for-weather-code-${dailyForecast.values.weatherCodeMax}.png`} alt="Weather Icon" /> */}
                    </div>
                ))}
            </div>
        );
    };
    console.log(weatherData);
    return (
        <div className="wrapper">
            <div className="container">
                <h1>Weather Forecast</h1>
                <div className="input-group">
                    <input
                        type="text"
                        value={location}
                        onChange={handleChange}
                        placeholder="Enter location"
                    />
                    <button onClick={handleClick}>Get Forecast</button>
                </div>
                {error && <p className="error-message">Error: {error}</p>}
                {renderForecast()}
            </div>
        </div>
    );
};

export default ForecastWeather;
