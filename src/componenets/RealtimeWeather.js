import React, { useState, useEffect } from 'react';

const options = {method: 'GET', headers: {accept: 'application/json'}};

const RealtimeWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getLocationAndFetchWeatherData = async () => {
        try {
          const position = await getCurrentPosition();
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=8C8bF0NPgeYQ9vWq4ewv22eiQasePYLw`,options);
          setWeatherData(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      getLocationAndFetchWeatherData();
    }, []);
  
    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve(position);
          },
          error => {
            reject(error.message);
          }
        );
      });
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(weatherData);
    return (
      <div>
        <h1>Real-Time Weather</h1>
        {weatherData && (
          <div>
            <h2>Location: {weatherData.location.name}</h2>
            <p>Temperature: {weatherData.data.values.temperature}°C</p>
            <p>Description: {weatherData.data.values.weatherCode}</p>
            <p>Humidity: {weatherData.data.values.humidity}%</p>
            {/* Add more weather data fields as needed */}
          </div>
        )}
      </div>
    );
  };

export default RealtimeWeather;
