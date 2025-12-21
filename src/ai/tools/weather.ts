'use server';
/**
 * @fileOverview A tool for fetching current weather data from a live API.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { WeatherData, WeatherDataSchema, WeatherCondition } from '@/lib/weather-data';
import {
  LocationNotFoundError,
  NetworkTimeoutError,
  APIQuotaExceededError,
  InvalidInputError,
  WeatherAPIError
} from '@/lib/errors';
import { cache, DEFAULT_WEATHER_TTL_MS } from '@/lib/cache';

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

    // Helper: fetch with timeout + retry logic for transient failures
    const fetchWithRetry = async (url: string, options: RequestInit = {}, retries = 2, backoffMs = 500) => {
      let attempt = 0;
      while (attempt <= retries) {
        attempt += 1;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        try {
          const response = await fetch(url, { ...options, signal: controller.signal });

          // Rate limiting
          if (response.status === 429) {
            throw new APIQuotaExceededError();
          }

          // Server errors retry
          if (response.status >= 500 && response.status < 600) {
            const msg = `Server error: ${response.status} ${response.statusText}`;
            if (attempt <= retries) {
              console.warn(`${msg}. Retrying (${attempt}/${retries})...`);
              await new Promise((r) => setTimeout(r, backoffMs * attempt));
              continue;
            }
            throw new WeatherAPIError(msg, response.status);
          }

          if (!response.ok) {
            // For client errors (4xx except 429), surface as WeatherAPIError
            const msg = `Request failed: ${response.status} ${response.statusText}`;
            throw new WeatherAPIError(msg, response.status);
          }

          return response;
        } catch (err: any) {
          // Timeout / Abort
          if (err.name === 'AbortError') {
            console.error('Request timed out', url);
            if (attempt <= retries) {
              console.warn(`Timeout, retrying (${attempt}/${retries}) for ${url}`);
              await new Promise((r) => setTimeout(r, backoffMs * attempt));
              continue;
            }
            throw new NetworkTimeoutError();
          }

          // API quota errors should bubble up
          if (err instanceof APIQuotaExceededError) throw err;

          // Network-level errors (DNS, connection reset, etc.) - retry
          if (attempt <= retries) {
            console.warn(`Network error on attempt ${attempt} for ${url}. Retrying...`, err.message || err);
            await new Promise((r) => setTimeout(r, backoffMs * attempt));
            continue;
          }

          // Give up and rethrow
          throw err;
        } finally {
          clearTimeout(timeoutId);
        }
      }

      // Shouldn't reach here
      throw new WeatherAPIError('Exceeded retries while fetching data');
    };

    try {
      // Validate input
      if (!input.city || input.city.trim().length === 0) {
        throw new InvalidInputError(input.city ?? '');
      }

      // 1. Geocode city to get latitude and longitude (cached)
      const normalizedCity = input.city.trim().toLowerCase();
      const geoCacheKey = `geocode:${normalizedCity}`;

      let geoData: any = cache.get<any>(geoCacheKey);
      if (!geoData) {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input.city)}&count=1&language=en&format=json`;
        const geoResponse = await fetchWithRetry(geoUrl, {}, 2);
        geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new LocationNotFoundError(input.city);
        }

        // Cache geocoding results for the same TTL as weather data to avoid repeated lookups
        cache.set(geoCacheKey, geoData, DEFAULT_WEATHER_TTL_MS);
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Fetch weather data using coordinates (cached)
      const weatherCacheKey = `weather:${latitude}:${longitude}`;
      const cachedWeather = cache.get<any>(weatherCacheKey);
      if (cachedWeather) {
        // Return cached, but ensure the city string reflects the geocoded name/country
        return { ...cachedWeather, city: `${name}, ${country}` };
      }

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m,uv_index&wind_speed_unit=kmh&timeformat=unixtime&timezone=auto`;

      const weatherResponse = await fetchWithRetry(weatherUrl, {}, 2);
      const weatherApiData = await weatherResponse.json();

      const {
        temperature_2m: temperature,
        apparent_temperature: apparentTemperature,
        relative_humidity_2m: humidity,
        weather_code,
        wind_speed_10m: windSpeed,
        uv_index: uvIndex,
        is_day: isDay,
      } = weatherApiData.current;

      const weatherInfo = wmoCodeMap[weather_code] || {
        condition: 'Sunny',
        description: 'Clear skies and bright sunshine.',
      };

      const result = {
        city: `${name}, ${country}`,
        temperature: Math.round(temperature),
        apparentTemperature: Math.round(apparentTemperature),
        humidity,
        windSpeed: Math.round(windSpeed),
        uvIndex: Math.round(uvIndex || 0),
        isDay: isDay || 1,
        condition: weatherInfo.condition,
        description: weatherInfo.description,
      };

      // Cache the processed weather data
      try {
        cache.set(weatherCacheKey, result, DEFAULT_WEATHER_TTL_MS);
      } catch (cacheErr) {
        console.warn('Failed to cache weather data:', cacheErr);
      }

      return result;
    } catch (error: any) {
      // Re-throw known error types for upstream handling
      if (error instanceof LocationNotFoundError) throw error;
      if (error instanceof NetworkTimeoutError) throw error;
      if (error instanceof APIQuotaExceededError) throw error;
      if (error instanceof InvalidInputError) throw error;

      // API related errors
      if (error instanceof WeatherAPIError) {
        console.error('Weather API error:', error.message);
        throw error;
      }

      // Unknown/unexpected error
      console.error('Unexpected error fetching weather:', error?.message || error);
      throw new WeatherAPIError(`Unable to fetch weather data: ${error?.message || String(error)}`);
    }
  }
);
