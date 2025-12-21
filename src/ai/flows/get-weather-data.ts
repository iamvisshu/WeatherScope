'use server';

/**
 * @fileOverview A flow that gets weather data for a given city.
 * 
 * - getWeatherData - A function that gets weather data for a given city.
 * - GetWeatherDataInput - The input type for the getWeatherData function.
 * - GetWeatherDataOutput - The return type for the getWeatherData function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
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

      // The LLM response should contain the structured weather data
      // Either from the tool execution or directly from the model
      if (llmResponse.output) {
        return llmResponse.output;
      }

      // If neither is present, throw to fallback.
      throw new Error("LLM did not return valid output.");

    } catch (error) {
      console.error('LLM call failed:', error);
      // Attempt direct tool fallback, but surface any errors to the caller (no generic fallback data)
      try {
        const direct = await getCurrentWeather(input);
        return direct;
      } catch (err) {
        console.error('Direct tool fallback failed:', err);
        // Re-throw so callers (UI) can decide how to present the error to users
        throw err;
      }
    }
  }
);
