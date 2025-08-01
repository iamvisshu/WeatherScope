'use server';

import { adaptColorTheme, type AdaptColorThemeOutput } from '@/ai/flows/adapt-color-theme';
import { getWeatherData } from '@/ai/flows/get-weather-data';
import type { WeatherData } from '@/lib/weather-data';

export async function getRealtimeWeather(city: string): Promise<WeatherData> {
  return getWeatherData({ city });
}

export async function getAdaptiveTheme(weatherData: WeatherData): Promise<AdaptColorThemeOutput> {
  try {
    const theme = await adaptColorTheme({
      weatherCondition: weatherData.condition,
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
    });
    return theme;
  } catch (error) {
    console.error('Error getting adaptive theme:', error);
    // Return a default theme in case of an error
    return {
      primaryColor: '#87CEEB',
      backgroundColor: '#F0F8FF',
      accentColor: '#778899',
    };
  }
}
