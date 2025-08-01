'use server';

/**
 * @fileOverview A flow that gets weather data for a given city.
 * 
 * - getWeatherData - A function that gets weather data for a given city.
 * - GetWeatherDataInput - The input type for the getWeatherData function.
 * - GetWeatherDataOutput - The return type for the getWeatherData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getCurrentWeather } from '@/ai/tools/weather';
import { WeatherDataSchema } from '@/lib/weather-data';

const GetWeatherDataInputSchema = z.object({
  city: z.string().describe("The city to get the weather for."),
});
export type GetWeatherDataInput = z.infer<typeof GetWeatherDataInputSchema>;

export type GetWeatherDataOutput = z.infer<typeof WeatherDataSchema>;

export async function getWeatherData(input: GetWeatherDataInput): Promise<GetWeatherDataOutput> {
  return getWeatherDataFlow(input);
}

const getWeatherPrompt = ai.definePrompt({
  name: 'getWeatherPrompt',
  input: { schema: GetWeatherDataInputSchema },
  output: { schema: WeatherDataSchema },
  tools: [getCurrentWeather],
  prompt: `You are a helpful weather assistant. Get the current weather for the given city: {{city}}.`,
});

const getWeatherDataFlow = ai.defineFlow(
  {
    name: 'getWeatherDataFlow',
    inputSchema: GetWeatherDataInputSchema,
    outputSchema: WeatherDataSchema,
  },
  async (input) => {
    try {
      const llmResponse = await getWeatherPrompt(input);
  
      const weatherToolResponse = llmResponse.toolRequest?.output;
      if (weatherToolResponse) {
        return weatherToolResponse as GetWeatherDataOutput;
      }
    } catch (error) {
      console.error("LLM call failed, likely due to rate limiting. Using fallback.", error);
    }

    // Fallback or error handling if the tool doesn't respond as expected or if the LLM call fails
    const fallback = await getCurrentWeather(input);
    return fallback;
  }
);
