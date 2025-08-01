import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { WeatherData } from "@/lib/weather-data";
import { WeatherIcon } from "./weather-icon";
import { Droplets, Thermometer, Wind } from "lucide-react";

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

export function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  const { city, condition, description, temperature, humidity, windSpeed } = weatherData;

  return (
    <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-border/50 shadow-lg animate-in fade-in zoom-in-95 duration-500">
      <CardHeader className="text-center">
        <WeatherIcon condition={condition} className="w-20 h-20 mx-auto text-primary" />
        <CardTitle className="text-3xl font-bold text-card-foreground mt-4">{city}</CardTitle>
        <CardDescription className="text-lg text-accent-foreground">{condition}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-muted-foreground italic">
          "{description}"
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center space-y-1">
            <Thermometer className="w-6 h-6 text-accent" />
            <span className="font-bold text-xl text-card-foreground">{temperature}°C</span>
            <span className="text-xs text-muted-foreground">Temperature</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Droplets className="w-6 h-6 text-accent" />
            <span className="font-bold text-xl text-card-foreground">{humidity}%</span>
            <span className="text-xs text-muted-foreground">Humidity</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Wind className="w-6 h-6 text-accent" />
            <span className="font-bold text-xl text-card-foreground">{windSpeed} km/h</span>
            <span className="text-xs text-muted-foreground">Wind Speed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
