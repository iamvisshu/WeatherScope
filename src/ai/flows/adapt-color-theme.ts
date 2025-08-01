'use server';

/**
 * @fileOverview A flow that adapts the website's color theme based on current weather conditions.
 *
 * - adaptColorTheme - A function that determines the appropriate color theme based on weather conditions.
 * - AdaptColorThemeInput - The input type for the adaptColorTheme function.
 * - AdaptColorThemeOutput - The return type for the adaptColorTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptColorThemeInputSchema = z.object({
  weatherCondition: z
    .string()
    .describe("The current weather condition (e.g., sunny, rainy, snowy, cloudy)."),
  temperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity (percentage).'),
});
export type AdaptColorThemeInput = z.infer<typeof AdaptColorThemeInputSchema>;

const AdaptColorThemeOutputSchema = z.object({
  primaryColor: z
    .string()
    .describe("A hex color code for the primary color of the theme."),
  backgroundColor: z
    .string()
    .describe("A hex color code for the background color of the theme."),
  accentColor: z
    .string()
    .describe("A hex color code for the accent color of the theme."),
});
export type AdaptColorThemeOutput = z.infer<typeof AdaptColorThemeOutputSchema>;

export async function adaptColorTheme(input: AdaptColorThemeInput): Promise<AdaptColorThemeOutput> {
  return adaptColorThemeFlow(input);
}

const promptText = `You are a color palette expert, skilled at creating visually appealing color themes based on environmental conditions.

  Given the current weather condition: "{{weatherCondition}}", temperature: {{temperature}}°C, and humidity: {{humidity}}%,
  suggest a color theme consisting of a primary color, background color, and accent color that reflects the weather.

  Consider the following:
  - Sunny: Use warm, bright colors.
  - Rainy: Use cool, muted colors.
  - Snowy: Use cold, light colors.
  - Cloudy: Use neutral, soft colors.

  The color theme should be represented as hex color codes. Ensure the colors complement each other and create a harmonious visual experience.

  Return the colors as a JSON object with keys "primaryColor", "backgroundColor", and "accentColor".
  Make sure the returned object satisfies this schema:
  \`\`\`json
  {{{schema}}}
  \`\`\`
`;

const adaptColorThemePrompt = ai.definePrompt({
  name: 'adaptColorThemePrompt',
  input: {schema: z.intersection(AdaptColorThemeInputSchema, z.object({schema: z.string()}))},
  output: {schema: AdaptColorThemeOutputSchema},
  prompt: promptText,
});

const adaptColorThemeFlow = ai.defineFlow(
  {
    name: 'adaptColorThemeFlow',
    inputSchema: AdaptColorThemeInputSchema,
    outputSchema: AdaptColorThemeOutputSchema,
  },
  async input => {
    const {output} = await adaptColorThemePrompt({
      ...input,
      schema: JSON.stringify(AdaptColorThemeOutputSchema.shape, null, 2),
    });
    return output!;
  }
);
