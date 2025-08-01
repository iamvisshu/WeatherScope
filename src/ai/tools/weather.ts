'use server';
/**
 * @fileOverview A tool for fetching current weather data from a live API.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { WeatherData, WeatherDataSchema, WeatherCondition } from '@/lib/weather-data';

// A map of WMO weather codes to our app's WeatherCondition
const wmoCodeMap: Record<number, { condition: WeatherCondition; description: string; }> = {
  0: { condition: "Sunny", description: "Clear skies and endless sun." },
  1: { condition: "Partly Cloudy", description: "Mainly clear, with a few passing clouds." },
  2: { condition: "Partly Cloudy", description: "Partly cloudy throughout the day." },
  3: { condition: "Cloudy", description: "Overcast skies, a blanket of clouds above." },
  45: { condition: "Cloudy", description: "Foggy conditions, visibility is low." },
  48: { condition: "Cloudy", description: "Depositing rime fog, creating a frosty scene." },
  51: { condition: "Rainy", description: "Light drizzle, a gentle weeping from the sky." },
  53: { condition: "Rainy", description: "Moderate drizzle, a steady, soft rain." },
  55: { condition: "Rainy", description: "Dense drizzle, the air is thick with moisture." },
  56: { condition: "Rainy", description: "Light freezing drizzle, casting a glassy sheen." },
  57: { condition: "Rainy", description: "Dense freezing drizzle, a heavy, icy coat." },
  61: { condition: "Rainy", description: "Slight rain, just enough to wet the pavement." },
  63: { condition: "Rainy", description: "Moderate rain, a classic rainy day." },
  65: { condition: "Rainy", description: "Heavy rain, a true downpour." },
  66: { condition: "Rainy", description: "Light freezing rain, a delicate, cold shower." },
  67: { condition: "Rainy", description: "Heavy freezing rain, an intense and icy rainfall." },
  71: { condition: "Snowy", description: "Slight snow fall, a light dusting of white." },
  73: { condition: "Snowy", description: "Moderate snow fall, a winter wonderland in the making." },
  75: { condition: "Snowy", description: "Heavy snow fall, a thick blanket of snow." },
  77: { condition: "Snowy", description: "Snow grains are lightly falling." },
  80: { condition: "Rainy", description: "Slight rain showers, here and there." },
  81: { condition: "Rainy", description: "Moderate rain showers, expect to get wet." },
  82: { condition: "Rainy", description: "Violent rain showers, a torrential downpour." },
  85: { condition: "Snowy", description: "Slight snow showers, flurries in the air." },
  86: { condition: "Snowy", description: "Heavy snow showers, a blizzard is brewing." },
  95: { condition: "Rainy", description: "Thunderstorm with slight hail." },
  96: { condition: "Rainy", description: "Thunderstorm with moderate hail." },
  99: { condition: "Rainy", description: "Thunderstorm with heavy hail." },
};


export const getCurrentWeather = ai.defineTool(
  {
    name: 'getCurrentWeather',
    description: 'Returns the current weather for a given city by calling a live weather API.',
    inputSchema: z.object({
      city: z.string().describe('The city to get the weather for.'),
    }),
    outputSchema: WeatherDataSchema,
  },
  async (input) => {
    console.log(`Getting real-time weather for ${input.city}`);
    
    // 1. Geocode city to get latitude and longitude
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input.city)}&count=1&language=en&format=json`;

    try {
      const geoResponse = await fetch(geoUrl);
      if (!geoResponse.ok) throw new Error(`Failed to geocode city: ${geoResponse.statusText}`);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`Could not find location: ${input.city}`);
      }

      const { latitude, longitude } = geoData.results[0];

      // 2. Fetch weather data using coordinates
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&wind_speed_unit=kmh&timeformat=unixtime`;

      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) throw new Error(`Failed to fetch weather data: ${weatherResponse.statusText}`);
      const weatherApiData = await weatherResponse.json();
      
      const { temperature_2m: temperature, relative_humidity_2m: humidity, weather_code, wind_speed_10m: windSpeed } = weatherApiData.current;
      
      const weatherInfo = wmoCodeMap[weather_code] || {
        condition: "Sunny",
        description: "Clear skies and bright sunshine.",
      };

      return {
        city: input.city,
        temperature: Math.round(temperature),
        humidity,
        windSpeed: Math.round(windSpeed),
        condition: weatherInfo.condition,
        description: weatherInfo.description,
      };
    } catch (error: any) {
      console.error("Error fetching real-time weather:", error.message);
      // Fallback to a default in case of API error
      return {
        city: input.city,
        temperature: 20,
        humidity: 60,
        windSpeed: 10,
        condition: 'Sunny',
        description: "Could not fetch live data. Displaying default.",
      };
    }
  }
);
