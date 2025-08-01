'use server';

import { getWeatherData } from '@/ai/flows/get-weather-data';
import type { WeatherData, WeatherCondition } from '@/lib/weather-data';

export interface ColorTheme {
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
}

// A predefined map of weather conditions to specific color themes.
const themeMap: Record<WeatherCondition, ColorTheme> = {
  "Sunny": {
    primaryColor: '#FDB813', // A vibrant, sunny yellow
    backgroundColor: '#FFF8E7', // A very light, warm cream
    accentColor: '#FFAA00', // A warm orange accent
  },
  "Partly Cloudy": {
    primaryColor: '#87CEEB', // A pleasant sky blue
    backgroundColor: '#F0F8FF', // Alice blue, a very light sky blue
    accentColor: '#B0C4DE', // A soft, light steel blue
  },
  "Cloudy": {
    primaryColor: '#B0C4DE', // Light Steel Blue
    backgroundColor: '#F5F5F5', // A neutral, off-white
    accentColor: '#778899', // A muted light slate gray
  },
  "Rainy": {
    primaryColor: '#4682B4', // A deeper steel blue
    backgroundColor: '#DDE6ED', // A cool, light gray-blue
    accentColor: '#526D82', // A muted slate gray
  },
  "Snowy": {
    primaryColor: '#E0E0E0', // A light gray, like a snowy sky
    backgroundColor: '#F5FAFA', // A very light, almost white cyan
    accentColor: '#B4CFD3', // A soft, cool blue-gray
  },
};

export async function getRealtimeWeather(city: string): Promise<WeatherData> {
  return getWeatherData({ city });
}

export async function getAdaptiveTheme(weatherData: WeatherData): Promise<ColorTheme> {
  // Return a theme from our predefined map based on the weather condition.
  // Default to the "Partly Cloudy" theme if the condition is somehow unknown.
  return themeMap[weatherData.condition] || themeMap['Partly Cloudy'];
}
