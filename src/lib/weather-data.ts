import { z } from 'genkit';

export const WeatherConditionSchema = z.enum(["Sunny", "Cloudy", "Rainy", "Snowy", "Partly Cloudy"]);
export type WeatherCondition = z.infer<typeof WeatherConditionSchema>;


// Schema for a single day's forecast
export const ForecastDaySchema = z.object({
  date: z.string().describe("ISO date string (YYYY-MM-DD)."),
  tempMax: z.number().describe("Maximum temperature in Celsius."),
  tempMin: z.number().describe("Minimum temperature in Celsius."),
  precipitation: z.number().describe("Total precipitation in mm."),
  condition: WeatherConditionSchema.describe("Weather condition for the day."),
  code: z.number().describe("WMO weather code."),
});
export type ForecastDay = z.infer<typeof ForecastDaySchema>;

// Schema for weather alerts
export const AlertSchema = z.object({
  title: z.string(),
  description: z.string(),
  severity: z.enum(["low", "moderate", "high", "extreme"]),
  type: z.enum(["temperature", "uv", "wind", "precipitation", "storm"]),
});
export type WeatherAlert = z.infer<typeof AlertSchema>;

export const WeatherDataSchema = z.object({
  city: z.string().describe("The city for which the weather is being reported."),
  temperature: z.number().describe("The current temperature in Celsius."),
  apparentTemperature: z.number().describe("The feels-like temperature in Celsius."),
  humidity: z.number().describe("The current humidity percentage."),
  windSpeed: z.number().describe("The current wind speed in km/h."),
  uvIndex: z.number().describe("The UV index (0-11+)."),
  isDay: z.number().describe("Day/Night indicator: 1 = Day, 0 = Night."),
  condition: WeatherConditionSchema.describe("The current weather condition."),
  description: z.string().describe("A brief, creative description of the weather."),
  forecast: z.array(ForecastDaySchema).optional().describe("7-day weather forecast."),
  alerts: z.array(AlertSchema).optional().describe("Active weather alerts."),
});
export type WeatherData = z.infer<typeof WeatherDataSchema>;

const weatherScenarios: Omit<WeatherData, 'city'>[] = [
  {
    temperature: 28,
    apparentTemperature: 30,
    humidity: 45,
    windSpeed: 10,
    uvIndex: 8,
    isDay: 1,
    condition: "Sunny",
    description: "Clear skies and bright sunshine.",
  },
  {
    temperature: 15,
    apparentTemperature: 13,
    humidity: 70,
    windSpeed: 15,
    uvIndex: 3,
    isDay: 1,
    condition: "Cloudy",
    description: "Overcast with a gentle breeze.",
  },
  {
    temperature: 12,
    apparentTemperature: 10,
    humidity: 85,
    windSpeed: 20,
    uvIndex: 2,
    isDay: 0,
    condition: "Rainy",
    description: "Light showers throughout the day.",
  },
  {
    temperature: -2,
    apparentTemperature: -5,
    humidity: 90,
    windSpeed: 5,
    uvIndex: 1,
    isDay: 0,
    condition: "Snowy",
    description: "Gentle snowfall, perfect for a winter day.",
  },
  {
    temperature: 22,
    apparentTemperature: 23,
    humidity: 60,
    windSpeed: 12,
    uvIndex: 6,
    isDay: 1,
    condition: "Partly Cloudy",
    description: "A mix of sun and clouds.",
  },
];

// This function simulates fetching weather data for a city.
// It returns a random weather scenario to demonstrate the app's dynamic features.
export const getMockWeather = (city: string): WeatherData => {
  const scenario = weatherScenarios[Math.floor(Math.random() * weatherScenarios.length)];
  return {
    ...scenario,
    city,
  };
};
