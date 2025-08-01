"use client";

import { useState, useEffect, useMemo } from "react";
import type { CSSProperties } from 'react';
import { LocationSelector } from "@/components/location-selector";
import { WeatherDisplay } from "@/components/weather-display";
import type { WeatherData } from "@/lib/weather-data";
import { getAdaptiveTheme, getRealtimeWeather } from "@/app/actions";
import { hexToHsl } from "@/lib/utils";
import type { AdaptColorThemeOutput } from "@/ai/flows/adapt-color-theme";
import { LoadingAnimation } from "@/components/loading-animation";
import { Sun, Heart } from "lucide-react";

export default function Home() {
  const [city, setCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [colorTheme, setColorTheme] = useState<AdaptColorThemeOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (city) {
      const fetchWeatherAndTheme = async () => {
        setIsLoading(true);
        setWeatherData(null); // Clear previous weather data
        try {
          const weather = await getRealtimeWeather(city);
          setWeatherData(weather);

          const theme = await getAdaptiveTheme(weather);
          setColorTheme(theme);
        } catch (error) {
          console.error("Failed to fetch weather or theme:", error);
          // Handle error (e.g., show a toast notification)
        } finally {
          setIsLoading(false);
        }
      };
      fetchWeatherAndTheme();
    }
  }, [city]);

  const dynamicStyles = useMemo(() => {
    if (!colorTheme) return {};
    return {
      '--background': hexToHsl(colorTheme.backgroundColor),
      '--foreground': hexToHsl(colorTheme.primaryColor), // Using primary as foreground for contrast
      '--card': `hsl(${hexToHsl(colorTheme.backgroundColor)} / 0.6)`,
      '--card-foreground': hexToHsl(colorTheme.primaryColor),
      '--primary': hexToHsl(colorTheme.primaryColor),
      '--primary-foreground': hexToHsl(colorTheme.backgroundColor),
      '--accent': hexToHsl(colorTheme.accentColor),
      '--accent-foreground': hexToHsl(colorTheme.primaryColor),
      '--border': `hsl(${hexToHsl(colorTheme.accentColor)} / 0.5)`,
      '--input': `hsl(${hexToHsl(colorTheme.accentColor)} / 0.5)`,
      '--ring': hexToHsl(colorTheme.accentColor),
    } as CSSProperties;
  }, [colorTheme]);

  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-background transition-all duration-1000 ease-in-out"
      style={dynamicStyles}
    >
      <div className="w-full max-w-md mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary tracking-tight">
            WeatherScope
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Your window to the world's weather
          </p>
        </header>

        {isClient && <LocationSelector onCitySelect={setCity} disabled={isLoading} />}

        <div className="min-h-[360px] flex items-center justify-center">
          {isLoading ? (
            <LoadingAnimation />
          ) : weatherData ? (
            <WeatherDisplay weatherData={weatherData} />
          ) : (
            <div className="text-center text-accent-foreground/80 space-y-4">
              <Sun className="mx-auto h-16 w-16 opacity-50" />
              <p>Select a location to see the current weather.</p>
            </div>
          )}
        </div>
      </div>
       <footer className="text-center text-sm text-muted-foreground mt-8">
        © 2025 Created With <Heart className="inline-block h-4 w-4 text-destructive fill-destructive" /> By <a href="https://github.com/iamvisshu" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@iamvisshu</a>
      </footer>
    </main>
  );
}
