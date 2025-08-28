
import type { WeatherData, Facility } from '../types';

// This is a mock weather service. In a real application, this would
// make an API call to a real weather service using the facility's location.

const mockWeatherConditions: WeatherData['condition'][] = ['맑음', '구름 많음', '흐림', '비'];

const generateMockWeather = (facility: Facility): WeatherData => {
  // Simple hash function to get a pseudo-random but consistent result for each facility name
  const hash = facility.name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  
  const temp = 15 + (hash % 15); // Temperature between 15 and 29
  const conditionIndex = Math.abs(hash) % mockWeatherConditions.length;
  
  return {
    temperature: temp,
    condition: mockWeatherConditions[conditionIndex],
    humidity: 40 + (hash % 40),
    windSpeed: 2 + (hash % 8),
    feelsLike: temp + (hash % 3 - 1),
  };
};

export const fetchWeather = (facility: Facility): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockWeather(facility));
    }, 500); // Simulate network delay
  });
};
