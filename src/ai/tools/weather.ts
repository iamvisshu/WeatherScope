'use server';
/**
 * @fileOverview A tool for fetching current weather data.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { WeatherData, WeatherDataSchema, WeatherCondition } from '@/lib/weather-data';

// A map of cities to their weather data. In a real app, this would be a database
// or an external API call.
const weatherDatabase: Record<string, Omit<WeatherData, 'city' | 'description'>> = {
  'New York': { temperature: 18, humidity: 60, windSpeed: 12, condition: 'Partly Cloudy'},
  'Los Angeles': { temperature: 25, humidity: 50, windSpeed: 8, condition: 'Sunny'},
  'Chicago': { temperature: 15, humidity: 65, windSpeed: 15, condition: 'Cloudy'},
  'Houston': { temperature: 28, humidity: 75, windSpeed: 10, condition: 'Sunny'},
  'Toronto': { temperature: 16, humidity: 70, windSpeed: 18, condition: 'Rainy'},
  'Vancouver': { temperature: 14, humidity: 80, windSpeed: 10, condition: 'Rainy'},
  'Montreal': { temperature: 13, humidity: 68, windSpeed: 20, condition: 'Cloudy'},
  'Calgary': { temperature: 10, humidity: 55, windSpeed: 25, condition: 'Partly Cloudy'},
  'London': { temperature: 17, humidity: 75, windSpeed: 20, condition: 'Cloudy'},
  'Manchester': { temperature: 14, humidity: 80, windSpeed: 18, condition: 'Rainy'},
  'Birmingham': { temperature: 15, humidity: 78, windSpeed: 15, condition: 'Cloudy'},
  'Glasgow': { temperature: 12, humidity: 85, windSpeed: 22, condition: 'Rainy'},
  'Sydney': { temperature: 22, humidity: 65, windSpeed: 15, condition: 'Sunny'},
  'Melbourne': { temperature: 19, humidity: 70, windSpeed: 18, condition: 'Partly Cloudy'},
  'Brisbane': { temperature: 26, humidity: 70, windSpeed: 12, condition: 'Sunny'},
  'Perth': { temperature: 24, humidity: 60, windSpeed: 15, condition: 'Sunny'},
  'Tokyo': { temperature: 20, humidity: 65, windSpeed: 10, condition: 'Partly Cloudy'},
  'Osaka': { temperature: 22, humidity: 70, windSpeed: 12, condition: 'Sunny'},
  'Kyoto': { temperature: 19, humidity: 68, windSpeed: 8, condition: 'Partly Cloudy'},
  'Sapporo': { temperature: 10, humidity: 75, windSpeed: 15, condition: 'Rainy'},
  'Agra': { temperature: 32, humidity: 50, windSpeed: 8, condition: 'Sunny'},
  'Ahmedabad': { temperature: 34, humidity: 45, windSpeed: 10, condition: 'Sunny'},
  'Bangalore': { temperature: 28, humidity: 60, windSpeed: 12, condition: 'Partly Cloudy'},
  'Bhopal': { temperature: 31, humidity: 55, windSpeed: 9, condition: 'Sunny'},
  'Chennai': { temperature: 33, humidity: 70, windSpeed: 15, condition: 'Sunny'},
  'Delhi': { temperature: 35, humidity: 40, windSpeed: 10, condition: 'Sunny'},
  'Gurugram': { temperature: 34, humidity: 42, windSpeed: 11, condition: 'Sunny'},
  'Hyderabad': { temperature: 30, humidity: 65, windSpeed: 13, condition: 'Partly Cloudy'},
  'Indore': { temperature: 32, humidity: 50, windSpeed: 10, condition: 'Sunny'},
  'Jaipur': { temperature: 36, humidity: 35, windSpeed: 9, condition: 'Sunny'},
  'Jammu': { temperature: 25, humidity: 50, windSpeed: 10, condition: 'Sunny'},
  'Kanpur': { temperature: 33, humidity: 48, windSpeed: 8, condition: 'Sunny'},
  'Kolkata': { temperature: 31, humidity: 75, windSpeed: 14, condition: 'Cloudy'},
  'Leh': { temperature: 5, humidity: 40, windSpeed: 15, condition: 'Snowy'},
  'Lucknow': { temperature: 34, humidity: 50, windSpeed: 7, condition: 'Sunny'},
  'Ludhiana': { temperature: 35, humidity: 38, windSpeed: 9, condition: 'Sunny'},
  'Manali': { temperature: 15, humidity: 65, windSpeed: 12, condition: 'Partly Cloudy'},
  'Mumbai': { temperature: 30, humidity: 80, windSpeed: 18, condition: 'Rainy'},
  'Nagpur': { temperature: 33, humidity: 52, windSpeed: 10, condition: 'Sunny'},
  'Noida': { temperature: 35, humidity: 41, windSpeed: 11, condition: 'Sunny'},
  'Patna': { temperature: 32, humidity: 60, windSpeed: 8, condition: 'Partly Cloudy'},
  'Pune': { temperature: 29, humidity: 70, windSpeed: 14, condition: 'Partly Cloudy'},
  'Shimla': { temperature: 18, humidity: 60, windSpeed: 10, condition: 'Partly Cloudy'},
  'Srinagar': { temperature: 20, humidity: 55, windSpeed: 8, condition: 'Partly Cloudy'},
  'Surat': { temperature: 33, humidity: 55, windSpeed: 12, condition: 'Sunny'},
  'Varanasi': { temperature: 33, humidity: 58, windSpeed: 7, condition: 'Partly Cloudy'},
  'Visakhapatnam': { temperature: 31, humidity: 78, windSpeed: 16, condition: 'Cloudy'},
};

// A map of weather conditions to their descriptions.
const conditionDescriptions: Record<WeatherCondition, string> = {
  "Sunny": "Clear skies and bright sunshine.",
  "Cloudy": "Overcast with a gentle breeze.",
  "Rainy": "Light showers throughout the day.",
  "Snowy": "Gentle snowfall, perfect for a winter day.",
  "Partly Cloudy": "A mix of sun and clouds.",
};


export const getCurrentWeather = ai.defineTool(
  {
    name: 'getCurrentWeather',
    description: 'Returns the current weather for a given city.',
    inputSchema: z.object({
      city: z.string().describe('The city to get the weather for.'),
    }),
    outputSchema: WeatherDataSchema,
  },
  async (input) => {
    console.log(`Getting weather for ${input.city}`);
    const weatherInfo = weatherDatabase[input.city] || {
      temperature: 20,
      humidity: 60,
      windSpeed: 10,
      condition: 'Sunny' as WeatherCondition,
    };

    return {
      ...weatherInfo,
      city: input.city,
      description: conditionDescriptions[weatherInfo.condition],
    };
  }
);
