import axios from 'axios';

const OPEN_WEATHER_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const PERENUAL_KEY = import.meta.env.VITE_PERENUAL_API_KEY;

// Weather API service with mock fallback
export const fetchWeatherData = async (lat = 40.7128, lon = -74.0060, city = 'New York') => {
  if (OPEN_WEATHER_KEY && OPEN_WEATHER_KEY !== 'YOUR_OPENWEATHER_API_KEY') {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_KEY}`
      );
      return {
        city: response.data.name,
        temp: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
        weather: response.data.weather[0]?.main || 'Clear',
        description: response.data.weather[0]?.description || 'clear sky',
        icon: response.data.weather[0]?.icon || '01d',
        wind: response.data.wind.speed,
        isMock: false
      };
    } catch (err) {
      console.warn('OpenWeather API request failed, using local realistic weather simulation:', err);
    }
  }

  // Realistic mock weather response
  return {
    city: city || 'Green Valley San Francisco',
    temp: 22,
    humidity: 62,
    weather: 'Partly Cloudy',
    description: 'scattered clouds with mild pleasant humidity',
    icon: '02d',
    wind: 3.4,
    isMock: true
  };
};

// Plant Knowledge API search (Perenual or Trefle fallback)
export const searchPlantDatabase = async (query) => {
  if (PERENUAL_KEY && PERENUAL_KEY !== 'YOUR_PERENUAL_API_KEY') {
    try {
      const response = await axios.get(
        `https://perenual.com/api/species-list?key=${PERENUAL_KEY}&q=${query}`
      );
      return response.data.data.map(item => ({
        id: item.id,
        name: item.common_name,
        scientificName: item.scientific_name?.[0] || 'Unknown species',
        cycle: item.cycle,
        watering: item.watering,
        sunlight: Array.isArray(item.sunlight) ? item.sunlight.join(', ') : item.sunlight,
        imageUrl: item.default_image?.thumbnail || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80'
      }));
    } catch (err) {
      console.warn('Perenual API failed, falling back to internal plant catalog:', err);
    }
  }

  // Pre-cached rich botanical catalog search fallback
  const catalog = [
    { id: 101, name: 'Monstera Deliciosa', scientificName: 'Monstera deliciosa', cycle: 'Perennial', watering: 'Average', sunlight: 'Bright indirect', imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80' },
    { id: 102, name: 'Fiddle Leaf Fig', scientificName: 'Ficus lyrata', cycle: 'Perennial', watering: 'Frequent', sunlight: 'Full sun to partial shade', imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80' },
    { id: 103, name: 'Snake Plant', scientificName: 'Sansevieria trifasciata', cycle: 'Perennial', watering: 'Minimum', sunlight: 'Low light', imageUrl: 'https://images.unsplash.com/photo-1599598425947-020645557002?auto=format&fit=crop&w=400&q=80' },
    { id: 104, name: 'Peace Lily', scientificName: 'Spathiphyllum wallisii', cycle: 'Perennial', watering: 'Frequent', sunlight: 'Partial shade', imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=400&q=80' },
    { id: 105, name: 'Golden Pothos', scientificName: 'Epipremnum aureum', cycle: 'Perennial', watering: 'Average', sunlight: 'Low to bright light', imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&w=400&q=80' },
    { id: 106, name: 'Calathea Orbifolia', scientificName: 'Calathea orbifolia', cycle: 'Perennial', watering: 'Frequent', sunlight: 'Filtered light', imageUrl: 'https://images.unsplash.com/photo-1620127682229-33388276e540?auto=format&fit=crop&w=400&q=80' }
  ];

  if (!query) return catalog;
  return catalog.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.scientificName.toLowerCase().includes(query.toLowerCase()));
};
