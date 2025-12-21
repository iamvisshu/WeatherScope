import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WeatherAlert } from "@/lib/weather-data";
import { AlertTriangle, Info, Wind, ThermometerSun, Umbrella } from "lucide-react";

interface WeatherAlertsProps {
    alerts: WeatherAlert[];
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
    if (!alerts || alerts.length === 0) return null;

    return (
        <div className="space-y-3 w-full mb-6">
            {alerts.map((alert, index) => {
                let Icon = AlertTriangle;
                let variant: "default" | "destructive" = "default";
                let className = "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";

                if (alert.severity === 'extreme' || alert.severity === 'high') {
                    variant = "destructive";
                    className = ""; // Use default destructive style
                }

                if (alert.type === 'wind') Icon = Wind;
                if (alert.type === 'temperature') Icon = ThermometerSun;
                if (alert.type === 'precipitation' || alert.type === 'storm') Icon = Umbrella;

                return (
                    <Alert key={index} variant={variant} className={variant === 'default' ? className : ''}>
                        <Icon className="h-4 w-4" />
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>
                            {alert.description}
                        </AlertDescription>
                    </Alert>
                );
            })}
        </div>
    );
}
