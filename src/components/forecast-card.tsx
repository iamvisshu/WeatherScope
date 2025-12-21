import { Card, CardContent } from "@/components/ui/card";
import { WeatherIcon } from "./weather-icon";
import { ForecastDay } from "@/lib/weather-data";
import { MapPin, Droplets } from "lucide-react";

interface ForecastCardProps {
    day: ForecastDay;
    isDaytime?: boolean;
}

export function ForecastCard({ day, isDaytime = true }: ForecastCardProps) {
    const dateObj = new Date(day.date);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

    return (
        <Card className={`min-w-[120px] shadow-sm shrink-0 transition-colors ${isDaytime
            ? 'bg-white border text-slate-900 border-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100'
            : 'bg-white/10 text-white border border-white/20 dark:bg-black/60 dark:border-white/10'
            }`}>
            <CardContent className="p-4 flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {dayName}
                </span>
                <WeatherIcon condition={day.condition} className="w-8 h-8 my-1" />

                <div className="flex gap-2 text-sm font-bold">
                    <span className="text-gray-900 dark:text-white">{day.tempMax}°</span>
                    <span className="text-gray-500 dark:text-gray-400">{day.tempMin}°</span>
                </div>

                {day.precipitation > 0 && (
                    <div className="flex items-center gap-1 text-xs font-medium text-blue-500">
                        <Droplets className="w-3 h-3" />
                        <span>{day.precipitation}mm</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
