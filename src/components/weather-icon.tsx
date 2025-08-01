import { Sun, Cloud, CloudRain, Snowflake, Cloudy } from "lucide-react";
import type { WeatherCondition } from "@/lib/weather-data";

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
}

export function WeatherIcon({ condition, className }: WeatherIconProps) {
  const iconProps = {
    className,
    "aria-label": `${condition} icon`,
  };

  switch (condition) {
    case "Sunny":
      return <Sun {...iconProps} />;
    case "Cloudy":
      return <Cloud {...iconProps} />;
    case "Partly Cloudy":
        return <Cloudy {...iconProps} />;
    case "Rainy":
      return <CloudRain {...iconProps} />;
    case "Snowy":
      return <Snowflake {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
}
