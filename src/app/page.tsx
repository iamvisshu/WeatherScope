"use client";

import { useState, useEffect } from "react";
import { LocationSelector } from "@/components/location-selector";
import { WeatherDisplay } from "@/components/weather-display";
import type { WeatherData } from "@/lib/weather-data";
import { getAdaptiveTheme, getRealtimeWeather, type ColorTheme } from "@/app/actions";
import { WeatherSkeleton } from "@/components/weather-skeleton";
import { Sun, Heart } from "lucide-react";

export default function Home() {
  const [city, setCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [colorTheme, setColorTheme] = useState<ColorTheme | null>(
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

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden">
      {/* Subtle adaptive ambient glow that respects dark/light theme */}
      {colorTheme && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-10 transition-opacity duration-1000 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 15%, ${colorTheme.primaryColor}, transparent 65%)`
          }}
        />
      )}

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-6">
        <header className="text-center w-full">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 dark:from-amber-300 dark:via-yellow-300 dark:to-orange-400 bg-clip-text text-transparent drop-shadow-sm">
              WeatherScope
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Your window to the world's weather
            </p>
          </div>
        </header>

        {isClient && <LocationSelector onCitySelect={setCity} disabled={isLoading} />}

        <div className="min-h-[360px] flex items-center justify-center">
          {isLoading ? (
            <WeatherSkeleton />
          ) : weatherData ? (
            <WeatherDisplay weatherData={weatherData} />
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400 space-y-4 py-12">
              <Sun className="mx-auto h-16 w-16 text-amber-500/70 dark:text-amber-400/60" />
              <p className="text-base font-medium">Select a location to see the current weather.</p>
            </div>
          )}
        </div>
      </div>
      <footer className="relative z-10 text-center text-sm text-slate-600 dark:text-slate-400 mt-8 font-medium">
        © 2026 Created With <Heart className="inline-block h-4 w-4 text-red-500 fill-red-500 mx-0.5" /> By{" "}
        <a
          href="https://github.com/iamvisshu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 underline decoration-slate-300 dark:decoration-slate-600 transition-colors"
        >
          @iamvisshu
        </a>
      </footer>
    </main>
  );
}
