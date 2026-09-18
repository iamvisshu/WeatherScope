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

    <Card className={`w-full max-w-6xl transition-all duration-500 shadow-xl animate-in fade-in zoom-in-95 
      ${isDaytime
        ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 border-blue-200 dark:border-slate-700'
        : 'bg-gradient-to-br from-slate-100 to-indigo-100 dark:from-slate-900 dark:to-indigo-950 border-slate-200 dark:border-indigo-900'
      }`}
    >
      <CardContent className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          {/* Left Column: Main Weather Info */}
          <div className="flex flex-col items-center lg:items-center justify-center space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className={
                    isDaytime
                      ? "border-amber-500/50 text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 font-semibold"
                      : "border-indigo-400/50 text-indigo-800 dark:text-indigo-300 bg-indigo-100/60 dark:bg-indigo-950/40 font-semibold"
                  }
                >
                  {isDaytime ? "DayTime" : "NightTime"}
                </Badge>
              </div>
              <WeatherIcon condition={condition} className="w-32 h-32 md:w-40 md:h-40 mx-auto text-amber-500 dark:text-amber-400 drop-shadow-2xl" />
              <CardTitle className="text-4xl md:text-5xl font-bold mt-6 text-slate-900 dark:text-white">
                {city}
              </CardTitle>
              <CardDescription className="text-xl md:text-2xl font-semibold mt-2 text-slate-700 dark:text-slate-200">
                {condition}
              </CardDescription>
              <p className="text-center italic text-base mt-2 text-slate-600 dark:text-slate-300 font-medium">
                "{description}"
              </p>
            </div>

            {/* Main Temperature */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-start gap-1">
                <span className="text-8xl md:text-9xl font-bold tracking-tighter text-slate-900 dark:text-white">
                  {temperature}
                </span>
                <span className="text-3xl mt-4 text-slate-700 dark:text-slate-300 font-semibold">°C</span>
              </div>
              <div className="flex items-center gap-2 rounded-full px-4 py-1.5 shadow-sm bg-white/90 text-slate-800 dark:bg-slate-800/90 dark:text-slate-100 border border-slate-200 dark:border-slate-700">
                <FeelsLike value={apparentTemperature} unit="C" />
              </div>
            </div>
          </div>

          {/* Right Column: Visualizations & Detail Metrics */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Alerts - Prominent at top of right col */}
            {alerts && alerts.length > 0 && (
              <WeatherAlerts alerts={alerts} />
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.02] aspect-square shadow-sm bg-white text-slate-900 border border-slate-200/80 dark:bg-slate-900/90 dark:text-slate-100 dark:border-slate-800">
                <TemperatureGauge value={temperature} />
              </div>

              <div className="flex flex-col items-center justify-center p-4 rounded-xl transition-all hover:scale-[1.02] aspect-square shadow-sm bg-white text-slate-900 border border-slate-200/80 dark:bg-slate-900/90 dark:text-slate-100 dark:border-slate-800">
                <UVIndexIndicator uv={uvIndex} />
              </div>

              <div className="flex flex-col items-center justify-center p-4 rounded-xl transition-all hover:scale-[1.02] aspect-square shadow-sm bg-white text-slate-900 border border-slate-200/80 dark:bg-slate-900/90 dark:text-slate-100 dark:border-slate-800">
                <WindIndicator speed={windSpeed} />
              </div>

              <div className="flex flex-col items-center justify-center p-4 rounded-xl transition-all hover:scale-[1.02] aspect-square shadow-sm bg-white text-slate-900 border border-slate-200/80 dark:bg-slate-900/90 dark:text-slate-100 dark:border-slate-800">
                <HumidityIndicator humidity={humidity} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: 7-Day Forecast */}
        {forecast && forecast.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  7-Day Forecast
                </h3>
              </div>
            </div>

            <ScrollArea className="w-full whitespace-nowrap rounded-xl pb-4">
              <div className="flex w-max space-x-4 min-w-full justify-between">
                {forecast.map((day, i) => (
                  <ForecastCard key={i} day={day} isDaytime={isDaytime} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="pt-2" />
            </ScrollArea>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center text-xs mt-8 text-slate-600 dark:text-slate-400 font-medium">
          Real-time weather data • Updated now
        </div>
      </CardContent>
    </Card>
  );
}
