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
        <Card className="min-w-[120px] shadow-sm shrink-0 transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
            <CardContent className="p-4 flex flex-col items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {dayName}
                </span>
                <WeatherIcon condition={day.condition} className="w-8 h-8 my-1" />

                <div className="flex gap-2 text-sm items-baseline">
                    <span className="text-slate-900 dark:text-white font-bold">{day.tempMax}°</span>
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">{day.tempMin}°</span>
                </div>

                {day.precipitation > 0 && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                        <Droplets className="w-3 h-3" />
                        <span>{day.precipitation}mm</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
