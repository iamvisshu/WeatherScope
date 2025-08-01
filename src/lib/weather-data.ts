import {z} from 'genkit';

export const WeatherConditionSchema = z.enum(["Sunny", "Cloudy", "Rainy", "Snowy", "Partly Cloudy"]);
export type WeatherCondition = z.infer<typeof WeatherConditionSchema>;


export const WeatherDataSchema = z.object({
  city: z.string().describe("The city for which the weather is being reported."),
  temperature: z.number().describe("The current temperature in Celsius."),
  humidity: z.number().describe("The current humidity percentage."),
  windSpeed: z.number().describe("The current wind speed in km/h."),
  condition: WeatherConditionSchema.describe("The current weather condition."),
  description: z.string().describe("A brief, creative description of the weather."),
});
export type WeatherData = z.infer<typeof WeatherDataSchema>;

const weatherScenarios: Omit<WeatherData, 'city'>[] = [
  {
    temperature: 28,
    humidity: 45,
    windSpeed: 10,
    condition: "Sunny",
    description: "Clear skies and bright sunshine.",
  },
  {
    temperature: 15,
    humidity: 70,
    windSpeed: 15,
    condition: "Cloudy",
    description: "Overcast with a gentle breeze.",
  },
  {
    temperature: 12,
    humidity: 85,
    windSpeed: 20,
    condition: "Rainy",
    description: "Light showers throughout the day.",
  },
  {
    temperature: -2,
    humidity: 90,
    windSpeed: 5,
    condition: "Snowy",
    description: "Gentle snowfall, perfect for a winter day.",
  },
  {
    temperature: 22,
    humidity: 60,
    windSpeed: 12,
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
