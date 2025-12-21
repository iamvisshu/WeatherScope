import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { WeatherData } from "@/lib/weather-data";
import { WeatherIcon } from "./weather-icon";
import { Droplets, Thermometer, Wind, Sun, Moon, CloudSun, CalendarDays } from "lucide-react";
import { TemperatureGauge } from './temperature-gauge';
import { UVIndexIndicator } from './uv-index-indicator';
import { WindIndicator } from './wind-indicator';
import { WeatherAnimations } from './weather-animations';
import { HumidityIndicator } from './humidity-indicator';
import { FeelsLike } from './feels-like';
import { WeatherAlerts } from './weather-alerts';
import { ForecastCard } from './forecast-card';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

// Helper function to get UV Index color and label
function getUVIndexInfo(uvIndex: number): { color: string; label: string; bgColor: string } {
  if (uvIndex <= 2) return { color: "text-green-600", label: "Low", bgColor: "bg-green-100 dark:bg-green-900/30" };
  if (uvIndex <= 5) return { color: "text-yellow-600", label: "Moderate", bgColor: "bg-yellow-100 dark:bg-yellow-900/30" };
  if (uvIndex <= 7) return { color: "text-orange-600", label: "High", bgColor: "bg-orange-100 dark:bg-orange-900/30" };
  if (uvIndex <= 10) return { color: "text-red-600", label: "Very High", bgColor: "bg-red-100 dark:bg-red-900/30" };
  return { color: "text-purple-600", label: "Extreme", bgColor: "bg-purple-100 dark:bg-purple-900/30" };
}

export function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  const {
    city,
    condition,
    description,
    temperature,
    apparentTemperature,
    humidity,
    windSpeed,
    uvIndex,
    isDay,
    forecast,
    alerts
  } = weatherData;

  const uvInfo = getUVIndexInfo(uvIndex);
  const isDaytime = isDay === 1;

  return (
    <Card className={`w-full max-w-2xl transition-all duration-500 shadow-xl animate-in fade-in zoom-in-95 
      ${isDaytime
        ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800'
        : 'bg-gradient-to-br from-indigo-950 to-purple-950 border-purple-800 text-white'
      }`}
    >
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          {isDaytime ? (
            <Sun className="w-6 h-6 text-yellow-500 animate-pulse" />
          ) : (
            <Moon className="w-6 h-6 text-blue-300" />
          )}
          <Badge variant="outline" className={isDaytime ? "border-yellow-500 text-yellow-700 dark:text-yellow-300" : "border-blue-300 text-blue-200"}>
            {isDaytime ? "Daytime" : "Nighttime"}
          </Badge>
        </div>
        <WeatherIcon condition={condition} className="w-24 h-24 mx-auto text-primary drop-shadow-lg" />
        <CardTitle className={`text-4xl font-bold mt-4 ${isDaytime ? 'text-gray-800 dark:text-gray-100' : 'text-white'}`}>
          {city}
        </CardTitle>
        <CardDescription className={`text-xl font-medium ${isDaytime ? 'text-gray-600 dark:text-gray-300' : 'text-blue-200'}`}>
          {condition}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Alerts Section */}
        {alerts && alerts.length > 0 && (
          <WeatherAlerts alerts={alerts} />
        )}

        {/* Description */}
        <p className={`text-center italic text-base px-4 ${isDaytime ? 'text-gray-600 dark:text-gray-300' : 'text-blue-100'}`}>
          "{description}"
        </p>

        {/* Main Temperature Display */}
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <div className="flex items-baseline gap-2">
            <span className={`text-6xl md:text-7xl font-bold ${isDaytime ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
              {temperature}°
            </span>
            <span className={`text-2xl ${isDaytime ? 'text-gray-600 dark:text-gray-400' : 'text-blue-200'}`}>C</span>
          </div>
          <div className="flex items-center gap-2">
            <CloudSun className={`w-4 h-4 ${isDaytime ? 'text-gray-500' : 'text-blue-300'}`} />
            {/* Feels-like display with tooltip and accessibility */}
            <FeelsLike value={apparentTemperature} unit="C" />
          </div>
        </div>

        {/* Weather Visualizations */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className={`flex flex-col items-center p-4 rounded-lg transition-all hover:scale-105 ${isDaytime ? 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm' : 'bg-white/10 backdrop-blur-sm'}`}>
            <TemperatureGauge value={temperature} />
          </div>

          <div className={`flex flex-col items-center p-4 rounded-lg transition-all hover:scale-105 ${isDaytime ? 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm' : 'bg-white/10 backdrop-blur-sm'}`}>
            <UVIndexIndicator uv={uvIndex} />
          </div>

          <div className={`flex flex-col items-center p-4 rounded-lg transition-all hover:scale-105 ${isDaytime ? 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm' : 'bg-white/10 backdrop-blur-sm'}`}>
            <WindIndicator speed={windSpeed} />
          </div>

          <div className={`flex flex-col items-center p-4 rounded-lg transition-all hover:scale-105 ${isDaytime ? 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm' : 'bg-white/10 backdrop-blur-sm'}`}>
            <HumidityIndicator humidity={humidity} />
          </div>
        </div>

        {/* 7-Day Forecast */}
        {forecast && forecast.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className={`w-5 h-5 ${isDaytime ? 'text-gray-600' : 'text-blue-200'}`} />
              <h3 className={`font-semibold ${isDaytime ? 'text-gray-700 dark:text-gray-200' : 'text-blue-100'}`}>
                7-Day Forecast
              </h3>
            </div>
            <ScrollArea className="w-full whitespace-nowrap rounded-lg">
              <div className="flex w-max space-x-4 pb-4">
                {forecast.map((day, i) => (
                  <ForecastCard key={i} day={day} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}

        {/* Additional Info */}
        <div className={`text-center text-xs pt-2 border-t ${isDaytime
          ? 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
          : 'border-blue-800 text-blue-300'
          }`}>
          Real-time weather data • Updated now
        </div>
      </CardContent>
    </Card>
  );
}
