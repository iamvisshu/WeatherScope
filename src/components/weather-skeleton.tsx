import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WeatherSkeleton() {
    return (
        <Card className="w-full max-w-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-xl border-white/20">
            <CardHeader className="text-center pb-4 flex flex-col items-center">
                {/* Day/Night Badge */}
                <Skeleton className="h-6 w-24 rounded-full mb-4" />

                {/* Icon */}
                <Skeleton className="h-24 w-24 rounded-full mb-4" />

                {/* City Name */}
                <Skeleton className="h-10 w-48 rounded-lg mb-2" />

                {/* Condition */}
                <Skeleton className="h-6 w-32 rounded-lg" />
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Description */}
                <Skeleton className="h-4 w-3/4 mx-auto" />

                {/* Temperature */}
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                    <Skeleton className="h-20 w-32 rounded-lg" />
                    <Skeleton className="h-6 w-40 rounded-lg" />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                </div>

                {/* Forecast */}
                <div className="mt-8">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="flex gap-4 overflow-hidden">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-32 w-[120px] shrink-0 rounded-lg" />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <Skeleton className="h-3 w-48 mx-auto mt-4" />
            </CardContent>
        </Card>
    );
}
