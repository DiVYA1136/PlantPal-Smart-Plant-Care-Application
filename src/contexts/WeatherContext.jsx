import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/api';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async (lat, lon, city) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(lat, lon, city);
      setWeather(data);
    } catch (err) {
      setError('Could not retrieve weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          loadWeather(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Default location: San Francisco
          loadWeather(37.7749, -122.4194, 'San Francisco');
        }
      );
    } else {
      loadWeather(37.7749, -122.4194, 'San Francisco');
    }
  }, []);

  // Compute smart botanical recommendations based on ambient weather
  const getCareRecommendations = () => {
    if (!weather) return [];
    const recommendations = [];

    if (weather.temp >= 28) {
      recommendations.push({
        id: 'rec-heat',
        type: 'warning',
        title: 'High Ambient Heat Alert',
        action: 'Water Today & Mist Foliage',
        desc: `Current temperature is ${weather.temp}°C. Tropical plants will evaporate moisture 40% faster today.`
      });
    } else if (weather.temp <= 12) {
      recommendations.push({
        id: 'rec-cold',
        type: 'danger',
        title: 'Cold Snap Protection Required',
        action: 'Move Delicate Plants Indoors',
        desc: `Temperature dropped to ${weather.temp}°C. Protect sensitive plants from cold window drafts.`
      });
    }

    if (weather.humidity < 45) {
      recommendations.push({
        id: 'rec-dry',
        type: 'info',
        title: 'Low Indoor Air Humidity',
        action: 'Turn On Pebble Tray / Humidifier',
        desc: `Relative humidity is down to ${weather.humidity}%. Ferns and Calatheas may crisp at the tips.`
      });
    } else if (weather.humidity > 75) {
      recommendations.push({
        id: 'rec-humid',
        type: 'success',
        title: 'Optimal Humidity Range',
        action: 'Skip Foliage Misting Today',
        desc: `Air humidity is high (${weather.humidity}%). Good natural environment for indoor tropical foliage.`
      });
    }

    if (weather.weather.toLowerCase().includes('rain')) {
      recommendations.push({
        id: 'rec-rain',
        type: 'info',
        title: 'Rainfall Expected',
        action: 'Harvest Rainwater / Skip Watering',
        desc: 'Natural rainwater is free of chlorine and minerals—ideal for watering houseplants.'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        id: 'rec-ideal',
        type: 'success',
        title: 'Ideal Microclimate',
        action: 'Maintain Regular Routine',
        desc: 'Temperature and moisture levels are perfectly balanced for your plant collection.'
      });
    }

    return recommendations;
  };

  return (
    <WeatherContext.Provider value={{ weather, loading, error, refreshWeather: loadWeather, recommendations: getCareRecommendations() }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
