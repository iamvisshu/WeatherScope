import { WeatherData, WeatherAlert } from './weather-data';

/**
 * Generates weather alerts based on current conditions and forecast.
 */
export function generateAlerts(data: Partial<WeatherData>): WeatherAlert[] {
    const alerts: WeatherAlert[] = [];
    const { temperature, windSpeed, uvIndex, condition } = data;

    // Extreme Heat
    if (temperature && temperature > 35) {
        alerts.push({
            title: "Extreme Heat",
            description: `Current temperature is ${temperature}°C. Stay hydrated and avoid direct sun.`,
            severity: temperature > 40 ? "extreme" : "high",
            type: "temperature",
        });
    }

    // Freezing
    if (temperature && temperature < 0) {
        alerts.push({
            title: "Freezing Conditions",
            description: `Temperatures are freezing (${temperature}°C). Watch for ice on roads.`,
            severity: temperature < -10 ? "extreme" : "moderate",
            type: "temperature",
        });
    }

    // UV Index
    if (uvIndex && uvIndex >= 8) {
        alerts.push({
            title: "Very High UV",
            description: "UV Index is very high. Protection needed for all outdoor activities.",
            severity: uvIndex >= 11 ? "extreme" : "high",
            type: "uv",
        });
    } else if (uvIndex && uvIndex >= 6) {
        alerts.push({
            title: "High UV",
            description: "UV Index is high. Wear sun protection.",
            severity: "moderate",
            type: "uv",
        });
    }

    // High Wind
    if (windSpeed && windSpeed > 50) {
        alerts.push({
            title: "High Winds",
            description: `Wind speeds reaching ${windSpeed} km/h. Secure loose objects.`,
            severity: windSpeed > 80 ? "extreme" : "high",
            type: "wind",
        });
    }

    // Storms (based on condition string)
    if (condition && (condition.includes("Thunderstorm") || condition.includes("Heavy rain"))) {
        alerts.push({
            title: "Storm Warning",
            description: "Stormy conditions detected. Stay indoors if possible.",
            severity: "high",
            type: "storm",
        });
    }

    return alerts;
}
